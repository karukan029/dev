import { createRoute } from "honox/factory";
import blogConfig from "../../../blog.config";
import { getListMarkdownEntries } from "../../../lib/content/markdown";
import Counter from "../../islands/counter";

export default createRoute(async (c) => {
  const name = c.req.query("name") ?? "Hono";
  const entry = getListMarkdownEntries().find(
    (entry) => `/contents/${entry.slug}` === c.req.path
  );

  console.log(getListMarkdownEntries());
  console.log(c.req.path);

  if (!entry) {
    // TODO: 404 page
    return c.render(
      <div class="py-8 text-center">
        <title>{name}</title>
        <h1 class="text-3xl font-bold">Hello, {name}!</h1>
        <p class="text-gray-500">
          No markdown files found under {blogConfig.contentDir}.
        </p>
        <Counter />
      </div>
    );
  }

  const endpoint = new URL(`/server/markdown/${entry?.slug}`, c.req.url);
  const response = await fetch(endpoint);

  if (!response.ok) {
    return c.render(
      <div class="py-8 text-center">
        <title>{name}</title>
        <h1 class="text-3xl font-bold">Hello, {name}!</h1>
        <p class="text-gray-500">Failed to load {entry.filename}.</p>
        <Counter />
      </div>
    );
  }

  const rendered = (await response.json()) as {
    slug: string;
    filename: string;
    contents: string;
  };

  return c.render(
    <div class="py-8 text-center space-y-6">
      <title>{name}</title>
      <h1 class="text-3xl font-bold">Hello, {name}!</h1>
      <div class="text-sm text-gray-500">
        Rendering {rendered.filename} from {blogConfig.contentDir}
      </div>
      <div
        class="prose mx-auto text-left"
        dangerouslySetInnerHTML={{
          __html: rendered.contents,
        }}
      ></div>
      <Counter />
    </div>
  );
});
