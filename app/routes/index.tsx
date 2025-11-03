import { createRoute } from "honox/factory";
import { apiClient } from "../../lib/openapi/apiClient";
import Counter from "../islands/counter";

export default createRoute(async (c) => {
  const name = c.req.query("name") ?? "Hono";

  let content = "no contents";

  try {
    // apiClient uses process.env (populated by nodejs_compat_populate_process_env)
    const test = await apiClient().GET("/api/content/detail/{id}", {
      params: {
        path: {
          id: "1",
        },
      },
    });

    if (test.error) {
      console.error("API Error:", test.error);
    } else {
      content = test.data?.content ?? "no contents";
    }
  } catch (error) {
    console.error("Failed to fetch content:", error);
  }

  return c.render(
    <div class="py-8 text-center">
      <title>{name}</title>
      <h1 class="text-3xl font-bold">Hello, {name}!</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      ></div>
      <Counter />
    </div>
  );
});

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
