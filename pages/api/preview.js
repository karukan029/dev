import fetch from 'node-fetch';

export default async (req, res) => {
  if (!res.query.slug) {
    return res.status(404).end();
  }
  // draftKeyが下書きであることを示す
  const content = await fetch(
    `hhttps://kazu013.microcms.io/api/v1/blog/${req.query.slug}?fields=id&draftKey=${req.query.draftKey}`,
    {headers:{'X-API-KEY':process.env.apiKey||''}}
  )
  .then(res => res.json()).catch(error => null);

  if (!content){
    return res.status(401).json({ message: 'Invalid slug' });
  }

  //res.setPreviewData()に渡した引数がgetStaticPropsの引数であるcontextから受け取れる
  res.setPreviewData({
    slug: content.id,
    draftKey: req.query.draftKey,
  });
  // 本来の記事のパスにリダイレクト
  res.writeHead(307,{ Location: `/${content.id}` });
  res.end('Preview mode enabled');
}