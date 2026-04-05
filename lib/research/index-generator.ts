import { existsSync, writeFileSync } from "node:fs";
import { isAbsolute, join, resolve } from "node:path";
import type { MarkdownEntry } from "../content/markdown";
import { getMarkdownEntries } from "../content/markdown";

const hostCwd = process.env.BLOG_RUNTIME_CWD ?? process.cwd();

const resolveDir = (dir: string): string =>
	isAbsolute(dir) ? dir : resolve(hostCwd, dir);

/**
 * Generate the content for _index.md from all wiki entries.
 */
export const generateIndexContent = (wikiDir: string): string => {
	const entries = getMarkdownEntries(wikiDir);

	// Group by category
	const grouped: Record<string, MarkdownEntry[]> = {};
	for (const entry of entries) {
		const cat = entry.category ?? "uncategorized";
		if (!grouped[cat]) {
			grouped[cat] = [];
		}
		grouped[cat].push(entry);
	}

	const lines: string[] = [
		"---",
		`title: "Research Wiki Index"`,
		`updated: "${new Date().toISOString().slice(0, 10)}"`,
		"---",
		"",
		"# Research Wiki",
		"",
		"## Categories",
		"",
	];

	for (const [category, catEntries] of Object.entries(grouped).sort()) {
		lines.push(`### ${category.charAt(0).toUpperCase() + category.slice(1)}`);
		lines.push("");
		for (const entry of catEntries) {
			const statusBadge = entry.status ? ` (${entry.status})` : "";
			lines.push(
				`- [${entry.title ?? entry.slug}](${entry.slug})${statusBadge}`,
			);
		}
		lines.push("");
	}

	// Recently updated section
	const sorted = [...entries]
		.filter((e) => e.updated)
		.sort((a, b) => (b.updated ?? "").localeCompare(a.updated ?? ""));
	const recent = sorted.slice(0, 10);

	if (recent.length > 0) {
		lines.push("## Recently Updated");
		lines.push("");
		lines.push("| Article | Category | Status | Updated |");
		lines.push("|---------|----------|--------|---------|");
		for (const entry of recent) {
			lines.push(
				`| [${entry.title ?? entry.slug}](${entry.slug}) | ${entry.category ?? "-"} | ${entry.status ?? "-"} | ${entry.updated ?? "-"} |`,
			);
		}
		lines.push("");
	}

	return lines.join("\n");
};

/**
 * Write the generated index to _index.md in the wiki directory.
 */
export const writeWikiIndex = (wikiDir: string): void => {
	const dir = resolveDir(wikiDir);
	if (!existsSync(dir)) {
		throw new Error(`Wiki directory does not exist: ${dir}`);
	}

	const content = generateIndexContent(wikiDir);
	const indexPath = join(dir, "_index.md");
	writeFileSync(indexPath, content, "utf8");
};
