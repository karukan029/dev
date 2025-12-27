import { createRoute } from "honox/factory";
import blogConfig from "../../blog.config";
import { getListMarkdownEntries } from "../../lib/content/markdown";
import Counter from "../islands/counter";

export default createRoute(async (c) => {
  const name = c.req.query("name") ?? "Hono";
  const entry = getListMarkdownEntries().at(0);

  if (!entry) {
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

  const endpoint = new URL(`/server/markdown/${entry.slug}`, c.req.url);
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

// export default createRoute(async (c) => {
//   const name = c.req.query("name") ?? "Hono";

//   let content = "no contents";

//   try {
//     // apiClient uses process.env (populated by nodejs_compat_populate_process_env)
//     const test = await apiClient().GET("/api/content/detail/{id}", {
//       params: {
//         path: {
//           id: "1",
//         },
//       },
//     });

//     if (test.error) {
//       console.error("API Error:", test.error);
//     } else {
//       content = test.data?.content ?? "no contents";
//     }
//   } catch (error) {
//     console.error("Failed to fetch content:", error);
//   }

//   return c.render(
//     <div class="py-8 text-center">
//       <title>{name}</title>
//       <h1 class="text-3xl font-bold">Hello, {name}!</h1>
//       <div
//         dangerouslySetInnerHTML={{
//           __html: content,
//         }}
//       ></div>
//       <Counter />
//     </div>
//   );
// });

// export default createRoute(async (c) => {
// 	const name = c.req.query("name") ?? "Hono";
// 	const test = await fetch(`${c.env.CMS_URL}/server/markdown/hello`).then(
// 		(res) => res.json(),
// 	);
// 	console.log(test);

// 	return c.render(
// 		<div class="py-8 text-center">
// 			<title>{name}</title>
// 			<h1 class="text-3xl font-bold">Hello, {name}!</h1>
// 			<div dangerouslySetInnerHTML={{ __html: test.contents.value }}></div>
// 			<Counter />
// 		</div>,
// 	);
// });
