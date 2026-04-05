import devConfig from "@dev-config";
import { createRoute } from "honox/factory";
import { renderMarkdownFromDir } from "../../../lib/content/markdown";

const researchDir =
	devConfig.sections?.research?.dir ?? "contents/research/wiki";

export default createRoute(async (c) => {
	const rendered = await renderMarkdownFromDir(
		researchDir,
		c.req.param("slug"),
	);

	if (!rendered) {
		return c.notFound();
	}

	if (import.meta.env.PROD && rendered.frontmatter?.private) {
		return c.notFound();
	}

	const statusColors: Record<string, string> = {
		draft: "bg-yellow-100 text-yellow-800",
		review: "bg-blue-100 text-blue-800",
		stable: "bg-green-100 text-green-800",
	};
	const status = rendered.status ?? "draft";
	const statusClass = statusColors[status] ?? statusColors.draft;

	return c.render(
		<article class="container mx-auto py-8 px-4 max-w-4xl">
			{rendered.frontmatter?.title && (
				<h1 class="text-5xl font-bold mb-4">{rendered.frontmatter.title}</h1>
			)}
			<div class="flex flex-wrap gap-2 mb-6">
				<span class={`px-2 py-1 rounded text-sm font-medium ${statusClass}`}>
					{status}
				</span>
				{rendered.category && (
					<span class="px-2 py-1 rounded text-sm bg-gray-100 text-gray-700">
						{rendered.category}
					</span>
				)}
				{rendered.tags?.map((tag) => (
					<span
						key={tag}
						class="px-2 py-1 rounded text-sm bg-indigo-50 text-indigo-700"
					>
						{tag}
					</span>
				))}
			</div>
			<div
				dangerouslySetInnerHTML={{
					__html: rendered.html,
				}}
			/>
			{rendered.related && rendered.related.length > 0 && (
				<div class="mt-8 pt-6 border-t border-gray-200">
					<h2 class="text-xl font-bold mb-3">Related Articles</h2>
					<ul class="space-y-1">
						{rendered.related.map((slug) => (
							<li key={slug}>
								<a
									href={`/research/${slug}`}
									class="text-blue-600 hover:underline"
								>
									{slug}
								</a>
							</li>
						))}
					</ul>
				</div>
			)}
			{rendered.sources && rendered.sources.length > 0 && (
				<div class="mt-6 pt-4 border-t border-gray-200">
					<h2 class="text-xl font-bold mb-3">Sources</h2>
					<ul class="space-y-1 text-gray-600">
						{rendered.sources.map((source) => (
							<li key={source}>{source}</li>
						))}
					</ul>
				</div>
			)}
		</article>,
	);
});
