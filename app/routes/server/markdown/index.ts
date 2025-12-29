import { Hono } from "hono";
import { renderMarkdownBySlug } from "../../../../lib/content/markdown";

const app = new Hono();

app.get("/:path/:nest_path?", async (c) => {
	const path = c.req.param("path");
	if (!path) {
		return c.json({ error: "Path parameter is required" }, 400);
	}

	const nest_path = c.req.param("nest_path");

	const rendered = await renderMarkdownBySlug(
		`${path}${nest_path ? `/${nest_path}` : ""}`,
	);

	if (!rendered) {
		return c.json({ error: "Markdown file not found" }, 404);
	}

	return c.json({
		slug: rendered.slug,
		filename: rendered.filename,
		contents: rendered.html,
		filePath: rendered.filePath,
	});
});

export default app;
