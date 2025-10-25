import createClient from "openapi-fetch";
import type { Variables } from "../../app/global";
import type { paths } from "./schema";

export const apiClient = (env: Variables) => {
	const { CMS_URL, READ_API_KEY } = env;

	if (!CMS_URL || !READ_API_KEY) {
		throw new Error("Missing required environment variables");
	}

	return createClient<paths>({
		baseUrl: CMS_URL,
		headers: {
			"X-API-KEY": READ_API_KEY,
		},
	});
};
