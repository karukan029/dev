/* eslint-disable consistent-return */
import { NextApiRequest, NextApiResponse } from 'next';

/** utils */
import { client } from 'src/utils/api';
import { toStringId } from 'src/utils/toStringId';

const preview = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  // draftKeyが下書きであることを示す
  const id = toStringId(req.query.id);

  const draftKey = toStringId(req.query.draftKey);
  // eslint-disable-next-line no-underscore-dangle
  const post = await client.v1.blog._id(id).$get({
    query: {
      fields: 'title,image,category,body,publishedAt',
      draftKey,
    },
  });

  if (!post) {
    return res.status(401).json({ message: 'Invalid contentId' });
  }

  // res.setPreviewData()に渡した引数がgetStaticPropsの引数であるcontextから受け取れる
  res.setPreviewData({ ...post, draftKey });
  // 本来の記事のパスにリダイレクト
  res.writeHead(307, { Location: `/blog/${post.id}` });
  res.end();
};

// // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// const preview = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (!req.query.id) {
//     return res.status(404).end();
//   }
//   // draftKeyが下書きであることを示す
//   const content = await fetch(
//     // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
//     `${process.env.END_POINT}/blog/${req.query.id}?draftKey=${req.query.draftKey}`,
//     { headers: { 'X-API-KEY': process.env.API_KEY || '' } },
//   )
//     .then((response) => response.json())
//     .catch((error) => error);

//   if (!content) {
//     return res.status(401).json({ message: 'Invalid slug' });
//   }
//   // res.setPreviewData()に渡した引数がgetStaticPropsの引数であるcontextから受け取れる
//   res.setPreviewData({
//     slug: content.id,
//     draftKey: req.query.draftKey,
//   });
//   // 本来の記事のパスにリダイレクト
//   res.writeHead(307, { Location: `/blog/${content.id}` });
//   res.end('Preview mode enabled');
// };

export default preview;
