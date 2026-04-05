import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { isAbsolute, join, resolve } from "node:path";

const hostCwd = process.env.BLOG_RUNTIME_CWD ?? process.cwd();

const resolveDir = (dir: string): string =>
	isAbsolute(dir) ? dir : resolve(hostCwd, dir);

export type RawSource = {
	name: string;
	path: string;
	hasReadme: boolean;
};

export type RawSourceMetadata = {
	name: string;
	content: string;
	fields: Record<string, string>;
};

/**
 * List all raw source directories.
 */
export const listRawSources = (rawDir: string): RawSource[] => {
	const dir = resolveDir(rawDir);
	if (!existsSync(dir)) {
		return [];
	}

	const items = readdirSync(dir, { withFileTypes: true });
	return items
		.filter((item) => item.isDirectory())
		.map((item) => ({
			name: item.name,
			path: join(dir, item.name),
			hasReadme: existsSync(join(dir, item.name, "README.md")),
		}));
};

/**
 * Read metadata from a raw source's README.md.
 * Expects a simple key: value format in frontmatter.
 */
export const getRawSourceMetadata = (
	sourceDir: string,
): RawSourceMetadata | undefined => {
	const dir = resolveDir(sourceDir);
	const readmePath = join(dir, "README.md");

	if (!existsSync(readmePath)) {
		return undefined;
	}

	const content = readFileSync(readmePath, "utf8");

	// Parse simple frontmatter
	const fields: Record<string, string> = {};
	const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
	if (fmMatch) {
		for (const line of fmMatch[1].split("\n")) {
			const match = line.match(/^([^:]+):\s*(.*)$/);
			if (match) {
				fields[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, "");
			}
		}
	}

	const name = dir.split("/").pop() ?? "";

	return { name, content, fields };
};

/**
 * Build a compilation context string from all files in a raw source directory.
 * This aggregates text content suitable for passing to an LLM.
 */
export const buildCompilationContext = (sourceDir: string): string => {
	const dir = resolveDir(sourceDir);
	if (!existsSync(dir)) {
		return "";
	}

	const textExtensions = [
		".md",
		".txt",
		".json",
		".csv",
		".yaml",
		".yml",
		".toml",
	];
	const parts: string[] = [];

	const items = readdirSync(dir, { withFileTypes: true });
	for (const item of items) {
		if (item.isDirectory()) continue;

		const ext = item.name.slice(item.name.lastIndexOf(".")).toLowerCase();
		if (!textExtensions.includes(ext)) continue;

		const filePath = join(dir, item.name);
		const stat = statSync(filePath);

		// Skip files larger than 1MB
		if (stat.size > 1_000_000) continue;

		const content = readFileSync(filePath, "utf8");
		parts.push(`--- FILE: ${item.name} ---\n${content}`);
	}

	return parts.join("\n\n");
};
