import { existsSync, readdirSync } from "node:fs";
import { isAbsolute, resolve } from "node:path";
import type { MarkdownEntry } from "../content/markdown";
import { getMarkdownEntries } from "../content/markdown";

const hostCwd = process.env.BLOG_RUNTIME_CWD ?? process.cwd();

const resolveDir = (dir: string): string =>
	isAbsolute(dir) ? dir : resolve(hostCwd, dir);

export type LintSeverity = "error" | "warning" | "info";

export type LintResult = {
	severity: LintSeverity;
	rule: string;
	message: string;
	file?: string;
};

const requiredFrontmatterFields = [
	"title",
	"category",
	"status",
	"created",
	"updated",
];

/**
 * Lint the research wiki for common issues.
 */
export const lintWiki = (wikiDir: string, rawDir?: string): LintResult[] => {
	const results: LintResult[] = [];
	const entries = getMarkdownEntries(wikiDir);
	const slugSet = new Set(entries.map((e) => e.slug));

	for (const entry of entries) {
		// Check required frontmatter fields
		for (const field of requiredFrontmatterFields) {
			const value = entry[field as keyof MarkdownEntry];
			if (value === undefined || value === "") {
				results.push({
					severity: "warning",
					rule: "missing-frontmatter",
					message: `Missing required frontmatter field: ${field}`,
					file: entry.filename,
				});
			}
		}

		// Check for broken related links
		if (entry.related) {
			for (const rel of entry.related) {
				if (!slugSet.has(rel)) {
					results.push({
						severity: "error",
						rule: "broken-link",
						message: `Related article not found: ${rel}`,
						file: entry.filename,
					});
				}
			}
		}

		// Check backlink symmetry
		if (entry.related) {
			for (const rel of entry.related) {
				const target = entries.find((e) => e.slug === rel);
				if (target && !target.related?.includes(entry.slug)) {
					results.push({
						severity: "info",
						rule: "missing-backlink",
						message: `${entry.slug} links to ${rel}, but ${rel} does not link back`,
						file: entry.filename,
					});
				}
			}
		}
	}

	// Check for orphan articles (not linked from any other article)
	for (const entry of entries) {
		const isLinked = entries.some(
			(other) =>
				other.slug !== entry.slug && other.related?.includes(entry.slug),
		);
		if (!isLinked && entries.length > 1) {
			results.push({
				severity: "info",
				rule: "orphan-article",
				message: `Article is not referenced by any other article`,
				file: entry.filename,
			});
		}
	}

	// Check raw sources with no corresponding wiki article
	if (rawDir) {
		const resolvedRawDir = resolveDir(rawDir);
		if (existsSync(resolvedRawDir)) {
			const rawItems = readdirSync(resolvedRawDir, { withFileTypes: true });
			const rawDirs = rawItems
				.filter((item) => item.isDirectory())
				.map((item) => item.name);

			const allSources = new Set(entries.flatMap((e) => e.sources ?? []));

			for (const rawDirName of rawDirs) {
				const sourceRef = `raw/${rawDirName}`;
				if (!allSources.has(sourceRef)) {
					results.push({
						severity: "warning",
						rule: "unlinked-source",
						message: `Raw source directory has no corresponding wiki article: ${rawDirName}`,
						file: rawDirName,
					});
				}
			}
		}
	}

	// Check for stale drafts (articles with status "draft" and old updated date)
	const thirtyDaysAgo = new Date();
	thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
	const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().slice(0, 10);

	for (const entry of entries) {
		if (
			entry.status === "draft" &&
			entry.updated &&
			entry.updated < thirtyDaysAgoStr
		) {
			results.push({
				severity: "info",
				rule: "stale-draft",
				message: `Draft article not updated in 30+ days (last: ${entry.updated})`,
				file: entry.filename,
			});
		}
	}

	return results;
};
