import { createRoute } from "honox/factory";
import Counter from "../islands/counter";

export default createRoute(async (c) => {
	const name = c.req.query("name") ?? "Hono";
	const test = await fetch(`${c.env.CMS_URL}/server/markdown/hello`).then(
		(res) => res.json(),
	);
	console.log(test);

	return c.render(
		<div class="py-8 text-center">
			<title>{name}</title>
			<h1 class="text-3xl font-bold">Hello, {name}!</h1>
			<div dangerouslySetInnerHTML={{ __html: test.contents.value }}></div>
			<Counter />
		</div>,
	);
});
