import createClient from "openapi-fetch";
import type { paths } from "./schema";

export const apiClient = () => {
	const CMS_URL = process.env.CMS_URL;
	const READ_API_KEY = process.env.READ_API_KEY;

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
