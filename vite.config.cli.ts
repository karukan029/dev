import { defineConfig } from "vite";

export default defineConfig({
	build: {
		lib: {
			entry: "lib/cli.ts",
			formats: ["es"],
			fileName: "cli",
		},
		outDir: "bin",
		copyPublicDir: false,
		target: "node22",
		rollupOptions: {
			external: [/^node:/],
			output: {
				banner: "#!/usr/bin/env node",
			},
		},
	},
});
