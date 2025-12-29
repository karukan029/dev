import { createRoute } from "honox/factory";
import blogConfig from "../../blog.config";
import { getPostListMarkdownEntries } from "../../lib/content/markdown";
import Counter from "../islands/counter";

export default createRoute(async (c) => {
  const name = c.req.query("name") ?? "Hono";
  const entry = getPostListMarkdownEntries();

  if (entry.length === 0) {
    return c.render(
      <div class="py-8 text-center">
        <title>{name}</title>
        <h1 class="text-3xl font-bold">Hello, {name}!</h1>
        <p class="text-gray-500">
          No markdown files found under {blogConfig.postsDir}.
        </p>
        <Counter />
      </div>
    );
  }

  return c.render(
    <div class="py-8 text-center space-y-6">
      <h1>Posts</h1>
    </div>
  );
});
