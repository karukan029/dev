export type BlogRuntimeConfig = {
	/** Directory path where markdown or mdx posts are stored */
	postsDir: string;
	/** Route configuration */
	routes?: {
		/** Base path for blog posts (default: /posts) */
		postsPrefix?: string;
		/** Handle index files as directory or explicit path */
		indexBehavior?: "directory" | "explicit";
	};
};

const config: BlogRuntimeConfig = {
	postsDir: "contents/posts",
	routes: {
		postsPrefix: "/posts",
		indexBehavior: "directory",
	},
};

export default config;
