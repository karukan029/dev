import build from "@hono/vite-build/cloudflare-workers";
import adapter from "@hono/vite-dev-server/cloudflare";
import ssg from "@hono/vite-ssg";
import tailwindcss from "@tailwindcss/vite";
import honox from "honox/vite";
import { defineConfig } from "vite";

const entry = "./app/server.ts";

export default defineConfig({
	plugins: [
		honox({
			devServer: { adapter },
			client: { input: ["/app/client.ts", "/app/style.css"] },
		}),
		ssg({ entry }),
		tailwindcss(),
		build(),
	],
	server: {
		port: 3000,
	},
	ssr: {
		external: [
			"rehype-sanitize",
			"rehype-stringify",
			"remark-parse",
			"remark-rehype",
			"unified",
		],
	},
});
