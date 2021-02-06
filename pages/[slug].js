export default function BlogId({ blog }) {
  return (
    <main className="main">
      <h1 className="title">{blog.title}</h1>
      <p className="publisedAt">{blog.publishedAt}</p>
      <p className="category">{blog.category && `${blog.category.name}`}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${blog.body}`,
        }}
      />
    </main>
  );
}

export const getStaticProps = async (context) => {
  const slug = context.params?.slug;
  const draftKey = context.previewData?.draftKey;
  const content = await fetch(
    `https://kazu013.microcms.io/api/v1/blog/${slug}${
    draftKey !== undefined ? `?draftKey=${draftKey}` : ''
    }`,
    { headers: { 'X-API-KEY': process.env.apiKey || '' } }
  )
  .then((res) => res.json());
  return {
    props: {
      content
    }
  };
};