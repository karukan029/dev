export type BlogRuntimeConfig = {
	/** Directory path where markdown or mdx posts are stored */
	contentDir: string;
};

const config: BlogRuntimeConfig = {
	contentDir: "contents",
};

export default config;
