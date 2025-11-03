import build from "@hono/vite-build/cloudflare-workers";
import adapter from "@hono/vite-dev-server/cloudflare";
import ssg from "@hono/vite-ssg";
import tailwindcss from "@tailwindcss/vite";
import honox from "honox/vite";
import { defineConfig, loadEnv } from "vite";

const entry = "./app/server.ts";

export default defineConfig(({ mode }) => {
	// Load env file based on mode
	const env = loadEnv(mode, process.cwd(), "");

	// Make env vars available to SSG build process
	process.env.CMS_URL = env.CMS_URL;
	process.env.READ_API_KEY = env.READ_API_KEY;

	return {
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
	};
});
