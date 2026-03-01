import { spawn } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageRoot = join(__dirname, "..");
const projectRoot = process.cwd();

const command = process.argv[2];

// Use binaries from the runtime package's node_modules
const viteBin = join(packageRoot, "node_modules", ".bin", "vite");
const wranglerBin = join(packageRoot, "node_modules", ".bin", "wrangler");
const viteConfig = join(packageRoot, "vite.config.ts");
const wranglerConfig = join(projectRoot, "wrangler.jsonc");
const VITE_ARGS = ["--config", viteConfig];

const DEV_PORT = process.env.BLOG_RUNTIME_PORT ?? "3000";

const makeEnv = (): NodeJS.ProcessEnv => ({
	...process.env,
	BLOG_RUNTIME_CWD: projectRoot,
	PATH: `${join(packageRoot, "node_modules", ".bin")}:${process.env.PATH}`,
});

const run = (cmd: string, cmdArgs: string[] = []): Promise<void> =>
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

const runViteBuild = async (): Promise<void> => {
	await run(viteBin, [...VITE_ARGS, "build", "--mode", "client"]);
	await run(viteBin, [...VITE_ARGS, "build"]);
	await run("rm", ["-rf", join(projectRoot, "dist")]);
	await run("cp", ["-r", join(packageRoot, "dist"), join(projectRoot, "dist")]);
};

const runSequence = async (): Promise<void> => {
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
		await runViteBuild();
		await run(wranglerBin, ["deploy", "--config", wranglerConfig]);
		return;
	}

	console.error(
		`Unknown command: ${command}\nAvailable commands: dev, build, preview, deploy`,
	);
	process.exit(1);
};

runSequence().catch((err: Error) => {
	console.error(err.message);
	process.exit(1);
});
