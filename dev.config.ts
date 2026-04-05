export type ContentSection = {
	/** Directory path for this content section */
	dir: string;
	/** Route prefix (e.g., /posts, /research) */
	routePrefix: string;
	/** Display name for the section */
	label?: string;
};

export type DevConfig = {
	/** Directory path where markdown or mdx posts are stored */
	postsDir: string;
	/** Route configuration */
	routes?: {
		/** Base path for blog posts (default: /posts) */
		postsPrefix?: string;
		/** Handle index files as directory or explicit path */
		indexBehavior?: "directory" | "explicit";
	};
	/** Named content sections */
	sections?: Record<string, ContentSection>;
};

const config: DevConfig = {
	postsDir: "contents/posts",
	routes: {
		postsPrefix: "/posts",
		indexBehavior: "directory",
	},
	sections: {
		posts: {
			dir: "contents/posts",
			routePrefix: "/posts",
			label: "Posts",
		},
		research: {
			dir: "contents/research/wiki",
			routePrefix: "/research",
			label: "Research",
		},
	},
};

export default config;
