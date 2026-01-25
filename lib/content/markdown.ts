import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, isAbsolute, join, resolve } from "node:path";
import devConfig from "@dev-config";
import rehypeShiki from "@shikijs/rehype";
import type { Root } from "mdast";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkFrontmatter from "remark-frontmatter";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

const hostCwd = process.env.BLOG_RUNTIME_CWD ?? process.cwd();
const configuredDir = devConfig.postsDir ?? "contents/posts";
const postsDirectory = isAbsolute(configuredDir)
	? configuredDir
	: resolve(hostCwd, configuredDir);
const supportedMarkdownExtensions = [".md", ".mdx"] as const;

type PostMarkdownEntry = {
	slug: string;
	filePath: string;
	filename: string;
	extension: string;
	title?: string;
	private?: boolean;
};

const makeSlug = (filename: string) => {
	for (const ext of supportedMarkdownExtensions) {
		if (filename.endsWith(ext)) {
			return filename.slice(0, -ext.length);
		}
	}
	return filename;
};

const isMarkdownFile = (filename: string): boolean => {
	return supportedMarkdownExtensions.some((ext) => filename.endsWith(ext));
};

// Extract frontmatter from markdown file
const extractFrontmatterFromFile = (
	filePath: string,
): Record<string, string | string[]> => {
	try {
		const content = readFileSync(filePath, "utf8");
		const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);

		if (!frontmatterMatch) {
			return {};
		}

		return parseSimpleYaml(frontmatterMatch[1]);
	} catch (error) {
		console.error(`Error reading frontmatter from ${filePath}:`, error);
		return {};
	}
};

export const getPostListMarkdownEntries = (): PostMarkdownEntry[] => {
	if (!existsSync(postsDirectory)) {
		return [];
	}

	const items = readdirSync(postsDirectory, {
		withFileTypes: true,
	});

	return items.map((item) => {
		if (item.isDirectory()) {
			throw new Error(
				"Nested directories are not supported in content directory",
			);
		}

		const fullPath = join(postsDirectory, item.name);

		if (!isMarkdownFile(item.name)) {
			throw new Error(
				`Unsupported file type found in content directory: ${item.name}`,
			);
		}

		const slug = makeSlug(item.name);

		// 拡張子を取得
		const extension =
			supportedMarkdownExtensions.find((ext) => item.name.endsWith(ext)) ?? "";

		// frontmatterを読み取る
		const frontmatter = extractFrontmatterFromFile(fullPath);

		// privateフラグの処理
		const privateValue =
			typeof frontmatter.private === "string"
				? frontmatter.private === "true"
				: undefined;

		return {
			filename: item.name,
			slug,
			filePath: fullPath,
			extension,
			title:
				typeof frontmatter.title === "string" ? frontmatter.title : undefined,
			private: privateValue,
		};
	});
};

const resolveMarkdownFileBySlug = (
	slug: string,
): PostMarkdownEntry | undefined => {
	if (!existsSync(postsDirectory)) {
		return;
	}

	const entry = getPostListMarkdownEntries().find(
		(entry) => entry.slug === slug,
	);

	if (!entry || !isMarkdownFile(entry.filename)) {
		return;
	}

	if (
		!isMarkdownFile(basename(entry.filePath)) ||
		!existsSync(entry.filePath)
	) {
		return;
	}

	return entry;
};

// Simple YAML frontmatter parser
const parseSimpleYaml = (
	yamlString: string,
): Record<string, string | string[]> => {
	const lines = yamlString.split("\n");
	const result: Record<string, string | string[]> = {};

	for (const line of lines) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith("#")) continue;

		// Match key: value or key: "value" or key: [array]
		const match = trimmed.match(/^([^:]+):\s*(.*)$/);
		if (!match) continue;

		const key = match[1].trim();
		const value = match[2].trim();

		// Remove quotes from string values
		if (
			(value.startsWith('"') && value.endsWith('"')) ||
			(value.startsWith("'") && value.endsWith("'"))
		) {
			result[key] = value.slice(1, -1);
			continue;
		}

		// Parse arrays: ["item1","item2"] or ["item1", "item2"]
		if (value.startsWith("[") && value.endsWith("]")) {
			const arrayContent = value.slice(1, -1);
			result[key] = arrayContent
				.split(",")
				.map((item) => item.trim().replace(/^["']|["']$/g, ""))
				.filter((item) => item.length > 0);
			continue;
		}

		// Plain value
		result[key] = value;
	}

	return result;
};

const renderMarkdownString = async (markdown: string) => {
	let frontmatter: Record<string, string | string[]> = {};

	const extractFrontmatter = () => (tree: Root) => {
		const yamlNode = tree.children.find(
			(node: Root["children"][number]) => node.type === "yaml",
		);
		if (!yamlNode) {
			return;
		}

		frontmatter = parseSimpleYaml(yamlNode.value) || {};
	};

	const file = await unified()
		.use(remarkParse)
		.use(remarkFrontmatter, ["yaml"])
		.use(extractFrontmatter)
		.use(remarkRehype)
		.use(rehypeSanitize)
		.use(rehypeShiki, {
			themes: {
				light: "github-dark",
			},
		})
		.use(rehypeStringify)
		.process(markdown);

	return {
		html: file.toString(),
		frontmatter,
	};
};

export const renderMarkdownBySlug = async (slug: string) => {
	const entry = resolveMarkdownFileBySlug(slug);
	if (!entry) {
		return;
	}

	const markdown = readFileSync(entry.filePath, { encoding: "utf8" });
	const { html, frontmatter } = await renderMarkdownString(markdown);

	return {
		...entry,
		markdown,
		html,
		frontmatter,
	};
};
