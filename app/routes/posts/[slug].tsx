import { createRoute } from "honox/factory";
import { renderMarkdownBySlug } from "../../../lib/content/markdown";

export default createRoute(async (c) => {
  // Render markdown directly for SSG
  const rendered = await renderMarkdownBySlug(c.req.param("slug"));

  if (!rendered) {
    return c.notFound();
  }

  if (import.meta.env.PROD && rendered.frontmatter?.private) {
    return c.notFound();
  }

  return c.render(
    <article class="container mx-auto py-8 px-4 max-w-4xl">
      {rendered.frontmatter?.title && (
        <h1 class="text-5xl font-bold mb-8">{rendered.frontmatter.title}</h1>
      )}
      {rendered.frontmatter?.description && (
        <p class="mb-7">{rendered.frontmatter.description}</p>
      )}
      <div
        dangerouslySetInnerHTML={{
          __html: rendered.html,
        }}
      />
    </article>,
  );
});
