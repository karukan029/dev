import devConfig from "@dev-config";
import { createRoute } from "honox/factory";
import { getPostListMarkdownEntries } from "../../lib/content/markdown";
import Counter from "../islands/counter";

export default createRoute(async (c) => {
	const name = c.req.query("name") ?? "Hono";
	const entries = import.meta.env.PROD
		? getPostListMarkdownEntries().filter((entry) => entry.private !== true)
		: getPostListMarkdownEntries();

	if (entries.length === 0) {
		return c.render(
			<div class="py-8 text-center">
				<title>{name}</title>
				<h1 class="text-3xl font-bold">Hello, {name}!</h1>
				<p class="text-gray-500">
					No markdown files found under {devConfig.postsDir}.
				</p>
				<Counter />
			</div>,
		);
	}

	return c.render(
		<div class="py-8 text-center space-y-6">
			<h1>Posts</h1>
			<div>
				{entries.map((entry) => (
					<div key={entry.slug}>
						<a
							href={`/posts/${entry.slug}`}
							class="text-blue-600 hover:underline text-xl"
						>
							{entry.title ?? entry.slug}
						</a>
					</div>
				))}
			</div>
		</div>,
	);
});
