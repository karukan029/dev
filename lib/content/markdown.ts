import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, isAbsolute, join, resolve } from "node:path";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import blogConfig from "../../blog.config";

const hostCwd = process.env.BLOG_RUNTIME_CWD ?? process.cwd();
const configuredDir = blogConfig.postsDir ?? "contents/posts";
const postsDirectory = isAbsolute(configuredDir)
	? configuredDir
	: resolve(hostCwd, configuredDir);
const supportedMarkdownExtensions = [".md", ".mdx"] as const;

type PostMarkdownEntry = {
	slug: string;
	filePath: string;
	filename: string;
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

		return {
			filename: item.name,
			slug,
			filePath: fullPath,
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

const renderMarkdownString = async (markdown: string) => {
	const file = await unified()
		.use(remarkParse)
		.use(remarkRehype)
		.use(rehypeSanitize)
		.use(rehypeStringify)
		.process(markdown);
	return file.toString();
};

export const renderMarkdownBySlug = async (slug: string) => {
	const entry = resolveMarkdownFileBySlug(slug);
	if (!entry) {
		return;
	}

	const markdown = readFileSync(entry.filePath, { encoding: "utf8" });
	const html = await renderMarkdownString(markdown);

	return {
		...entry,
		markdown,
		html,
	};
};
