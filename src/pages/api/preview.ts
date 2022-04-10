/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import fetch from 'node-fetch';
import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const preview = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.query.id) {
    return res.status(404).end();
  }
  // draftKeyが下書きであることを示す
  const content = await fetch(
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    `${process.env.END_POINT}/blog/${req.query.id}?draftKey=${req.query.draftKey}`,
    { headers: { 'X-API-KEY': process.env.API_KEY || '' } },
  )
    .then((response) => response.json())
    .catch((error) => error);

  if (!content) {
    return res.status(401).json({ message: 'Invalid slug' });
  }
  // res.setPreviewData()に渡した引数がgetStaticPropsの引数であるcontextから受け取れる
  res.setPreviewData({
    slug: content.id,
    draftKey: req.query.draftKey,
  });
  // 本来の記事のパスにリダイレクト
  res.writeHead(307, { Location: `/blog/${content.id}` });
  res.end('Preview mode enabled');
};

export default preview;
