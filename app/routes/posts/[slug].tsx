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
      {rendered.frontmatter?.title && (
        <h1 class="text-4xl font-bold mb-4">{rendered.frontmatter.title}</h1>
      )}
      {rendered.frontmatter?.description && (
        <p class="text-gray-600 mb-8">{rendered.frontmatter.description}</p>
      )}
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
