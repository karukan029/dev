import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, join, resolve } from "node:path";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import blogConfig from "../../blog.config";

const configuredDir = blogConfig.contentDir ?? "contents";
const contentDirectory = resolve(configuredDir);
const supportedMarkdownExtensions = [".md", ".mdx"] as const;

export type MarkdownEntry = {
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

export const getListMarkdownEntries = (): MarkdownEntry[] => {
	if (!existsSync(contentDirectory)) {
		return [];
	}

	return readdirSync(contentDirectory, { withFileTypes: true })
		.filter((entry) => entry.isFile())
		.map((entry) => entry.name)
		.filter((name) =>
			supportedMarkdownExtensions.some((ext) => name.endsWith(ext)),
		)
		.map((filename) => ({
			filename,
			slug: makeSlug(filename),
			filePath: join(contentDirectory, filename),
		}));
};

const resolveMarkdownFileBySlug = (slug: string) => {
	for (const ext of supportedMarkdownExtensions) {
		const filePath = join(contentDirectory, `${slug}${ext}`);
		if (existsSync(filePath)) {
			return {
				filename: basename(filePath),
				slug,
				filePath,
			};
		}
	}
	return;
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
