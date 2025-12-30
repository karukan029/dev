import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import build from "@hono/vite-build/cloudflare-workers";
import adapter from "@hono/vite-dev-server/cloudflare";
import ssg from "@hono/vite-ssg";
import tailwindcss from "@tailwindcss/vite";
import honox from "honox/vite";
import { defineConfig, loadEnv } from "vite";

const rootDir = dirname(fileURLToPath(import.meta.url));
const callerRoot = process.env.BLOG_RUNTIME_CWD ?? process.cwd();
const entry = resolve(rootDir, "app/server.ts");
const devConfigFilenames = [
	"dev.config.ts",
	"dev.config.mts",
	"dev.config.js",
	"dev.config.mjs",
	"dev.config.cjs",
	"dev.config.json",
];
const defaultDevConfigPath = resolve(rootDir, "dev.config.ts");
const devConfigPath =
	devConfigFilenames
		.map((filename) => resolve(callerRoot, filename))
		.find((candidate) => existsSync(candidate)) ?? defaultDevConfigPath;

export default defineConfig(({ mode }) => {
	// Load env file based on mode
	const env = loadEnv(mode, callerRoot, "");

	// This setting is needed to make env vars available to SSG build process
	process.env.CMS_URL = env.CMS_URL;
	process.env.READ_API_KEY = env.READ_API_KEY;

	return {
		root: rootDir,
		envDir: callerRoot,
		resolve: {
			alias: {
				"@dev-config": devConfigPath,
			},
		},
		esbuild: {
			jsx: "automatic",
			jsxImportSource: "hono/jsx",
		},
		plugins: [
			honox({
				entry,
				devServer: { adapter },
				client: { input: ["/app/client.ts", "/app/style.css"] },
			}),
			ssg({ entry }),
			tailwindcss(),
			build(),
		],
		server: {
			port: 3000,
			fs: {
				allow: [rootDir, callerRoot],
			},
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
