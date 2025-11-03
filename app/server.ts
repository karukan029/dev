import { showRoutes } from "hono/dev";
import { createApp } from "honox/server";

export type Bindings = {
	CMS_URL: string;
	READ_API_KEY: string;
};

const app = createApp<{ Bindings: Bindings }>();

showRoutes(app);

export default app;
