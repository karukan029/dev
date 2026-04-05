import devConfig from "@dev-config";
import { ssgParams } from "hono/ssg";
import { createRoute } from "honox/factory";
import { getMarkdownEntries } from "../../../lib/content/markdown";

const researchDir =
	devConfig.sections?.research?.dir ?? "contents/research/wiki";

export default createRoute(
	ssgParams(async () => {
		const entries = getMarkdownEntries(researchDir);
		return entries.map((e) => ({ slug: e.slug }));
	}),
);
