#!/usr/bin/env node
import { spawn } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageRoot = join(__dirname, "..");
const projectRoot = process.cwd();

const args = process.argv.slice(2);
const command = args[0];

// Use binaries from the runtime package's node_modules
const viteBin = join(packageRoot, "node_modules", ".bin", "vite");
const wranglerBin = join(packageRoot, "node_modules", ".bin", "wrangler");
const viteConfig = join(packageRoot, "vite.config.ts");
const wranglerConfig = join(packageRoot, "wrangler.jsonc");
const VITE_ARGS = ["--config", viteConfig];

const DEV_PORT = process.env.BLOG_RUNTIME_PORT ?? "3000";

const makeEnv = () => ({
	...process.env,
	BLOG_RUNTIME_CWD: projectRoot,
	PATH: `${join(packageRoot, "node_modules", ".bin")}:${process.env.PATH}`,
});

const run = (cmd, cmdArgs = []) =>
	new Promise((resolve, reject) => {
		const child = spawn(cmd, cmdArgs, {
			stdio: "inherit",
			shell: false,
			cwd: packageRoot,
			env: makeEnv(),
		});

		child.on("exit", (code) => {
			if (code === 0) {
				resolve(undefined);
				return;
			}
			reject(new Error(`${cmd} exited with code ${code}`));
		});
	});

const runViteBuild = async () => {
	await run(viteBin, [...VITE_ARGS, "build", "--mode", "client"]);
	await run(viteBin, [...VITE_ARGS, "build"]);
};

const runSequence = async () => {
	if (command === "dev") {
		await run(viteBin, [...VITE_ARGS, "--port", DEV_PORT]);
		return;
	}

	if (command === "build") {
		await runViteBuild();
		return;
	}

	if (command === "preview") {
		await runViteBuild();
		await run(wranglerBin, ["dev", "--config", wranglerConfig]);
		return;
	}

	if (command === "deploy") {
		await run("vite", ["build"]);
		await run(wranglerBin, ["deploy", "--config", wranglerConfig]);
		return;
	}

	console.error(
		`Unknown command: ${command}\nAvailable commands: dev, build, preview, deploy`,
	);
	process.exit(1);
};

runSequence().catch((err) => {
	console.error(err.message);
	process.exit(1);
});
