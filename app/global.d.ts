// Environment variables are accessed via process.env
// Thanks to nodejs_compat_populate_process_env flag in wrangler.jsonc

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			/**
			 * CMS API endpoint URL
			 * @example "http://localhost:5173"
			 */
			CMS_URL: string;
			/**
			 * API key for CMS read access
			 */
			READ_API_KEY: string;
		}
	}
}

export {};
