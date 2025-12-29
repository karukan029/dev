import { ssgParams } from "hono/ssg";
import { createRoute } from "honox/factory";
import { getPostListMarkdownEntries } from "../../../lib/content/markdown";

export default createRoute(
	ssgParams(async () => {
		const entries = getPostListMarkdownEntries();

		return entries.map((e) => ({ slug: e.slug }));
	}),
);
