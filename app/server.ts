import { showRoutes } from "hono/dev";
import { createApp } from "honox/server";

import type { Env } from "hono";

export type Bindings = Env & {
	MCP_URL: string;
};

const app = createApp<Bindings>();

showRoutes(app);

export default app;
