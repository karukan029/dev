import devConfig from "@dev-config";
import { Hono } from "hono";
import { renderMarkdownFromDir } from "../../../../lib/content/markdown";

const researchDir =
	devConfig.sections?.research?.dir ?? "contents/research/wiki";

const app = new Hono();

app.get("/:slug", async (c) => {
	const slug = c.req.param("slug");
	if (!slug) {
		return c.json({ error: "Slug parameter is required" }, 400);
	}

	const rendered = await renderMarkdownFromDir(researchDir, slug);

	if (!rendered) {
		return c.json({ error: "Research article not found" }, 404);
	}

	return c.json({
		slug: rendered.slug,
		filename: rendered.filename,
		contents: rendered.html,
		filePath: rendered.filePath,
		frontmatter: rendered.frontmatter,
	});
});

export default app;
