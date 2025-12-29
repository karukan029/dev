import { createRoute } from "honox/factory";
import { renderMarkdownBySlug } from "../../../lib/content/markdown";

export default createRoute(async (c) => {
  // Render markdown directly for SSG
  const rendered = await renderMarkdownBySlug(c.req.param("slug"));

  if (!rendered) {
    return c.notFound();
  }

  return c.render(
    <article class="container mx-auto py-8 px-4">
      <div class="prose prose-lg mx-auto">
        <div
          dangerouslySetInnerHTML={{
            __html: rendered.html,
          }}
        />
      </div>
    </article>
  );
});
