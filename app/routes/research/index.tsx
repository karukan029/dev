import devConfig from "@dev-config";
import { createRoute } from "honox/factory";
import {
	getMarkdownEntries,
	type MarkdownEntry,
} from "../../../lib/content/markdown";

const researchDir =
	devConfig.sections?.research?.dir ?? "contents/research/wiki";

export default createRoute(async (c) => {
	const allEntries = getMarkdownEntries(researchDir);
	const entries = import.meta.env.PROD
		? allEntries.filter((entry) => entry.private !== true)
		: allEntries;

	if (entries.length === 0) {
		return c.render(
			<div class="py-8 text-center">
				<h1 class="text-3xl font-bold">Research</h1>
				<p class="text-gray-500 mt-4">No research articles found.</p>
			</div>,
		);
	}

	// Group entries by category
	const grouped: Record<string, MarkdownEntry[]> = {};
	for (const entry of entries) {
		const cat = entry.category ?? "uncategorized";
		if (!grouped[cat]) {
			grouped[cat] = [];
		}
		grouped[cat].push(entry);
	}

	const statusColors: Record<string, string> = {
		draft: "bg-yellow-100 text-yellow-800",
		review: "bg-blue-100 text-blue-800",
		stable: "bg-green-100 text-green-800",
	};

	return c.render(
		<div class="container mx-auto py-8 px-4 max-w-4xl">
			<h1 class="text-3xl font-bold mb-8">Research</h1>
			{Object.entries(grouped).map(([category, categoryEntries]) => (
				<div key={category} class="mb-8">
					<h2 class="text-xl font-semibold mb-4 capitalize">{category}</h2>
					<div class="space-y-3">
						{categoryEntries.map((entry) => {
							const status = entry.status ?? "draft";
							const statusClass = statusColors[status] ?? statusColors.draft;

							return (
								<div key={entry.slug} class="flex items-center gap-3">
									<a
										href={`/research/${entry.slug}`}
										class="text-blue-600 hover:underline text-lg"
									>
										{entry.title ?? entry.slug}
									</a>
									<span
										class={`px-2 py-0.5 rounded text-xs font-medium ${statusClass}`}
									>
										{status}
									</span>
									{entry.tags?.map((tag) => (
										<span
											key={tag}
											class="px-2 py-0.5 rounded text-xs bg-indigo-50 text-indigo-700"
										>
											{tag}
										</span>
									))}
								</div>
							);
						})}
					</div>
				</div>
			))}
		</div>,
	);
});
