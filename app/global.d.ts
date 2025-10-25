import type {} from "hono";

export type Variables = {
	CMS_URL?: string;
	READ_API_KEY?: string;
};

declare module "hono" {
	interface Env {
		Variables: Variables;
		Bindings: Record<string, never>;
	}
}
