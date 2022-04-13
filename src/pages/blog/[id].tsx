// import fetch from 'node-fetch';
import {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
  InferGetStaticPropsType,
} from 'next';

/** utils */
import { client } from 'src/utils/api';
import { toStringId } from 'src/utils/toStringId';

/** components */
import { PostTemplate } from 'src/components/templates';

/** types */
import { BlogResponse } from 'src/types/blog';

type StaticProps = {
  blogData: BlogResponse;
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const BlogId: NextPage<PageProps> = ({ blogData }) => (
  <PostTemplate blogData={blogData} />
);

export default BlogId;

// 静的生成のためのパスを指定します
export const getStaticPaths: GetStaticPaths = () =>
  // const key = {
  //   headers: { 'X-API-KEY': process.env.API_KEY },
  // };
  // const data = await fetch(`${process.env.END_POINT}/blog`, key)
  //   .then((res) => res.json())
  //   .catch(() => null);
  // // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  // const paths = data.contents.map((content) => `/blog/${content.id}`);
  // return { paths, fallback: false };
  ({
    fallback: 'blocking',
    paths: [],
  });

// 与えられた引数に`draftKey`値が存在するかチェックする
// 型ガードとは、条件ブロック内のオブジェクトの型を制限するための仕組み
// https://typescript-jp.gitbook.io/deep-dive/type-system/typeguard
// item is { draftKey: string }で型ガードを独自に定義している
// 型ガードを定義することで、オブジェクトのプロパティ参照時にundefindでない場合のみ

const isDraft = (item: any): item is { draftKey: string } =>
  // item?.draftKey && typeof item.draftKey === 'string';
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  item?.draftKey !== undefined;

// データをテンプレートに受け渡す部分の処理を記述（GetStaticPropsの引数でURLパラメータを取得）
export const getStaticProps: GetStaticProps<StaticProps> = async (context) => {
  const { params, previewData } = context;

  if (!params?.id) {
    throw new Error('Error: ID not fount');
  }

  const draftKey = isDraft(previewData)
    ? { draftKey: previewData.draftKey }
    : {};

  // 記事のIDを取得
  const id = toStringId(params.id);

  try {
    // プレビューモードのクエリパラメータを追加
    // eslint-disable-next-line no-underscore-dangle
    const blogData = await client.v1.blog._id(id).$get({
      query: {
        fields: 'title,image,category,publishedAt',
        ...draftKey,
      },
    });
    return {
      props: { blogData },
    };
  } catch (e) {
    // 404 ページを戻す(Next10以降)
    return { notFound: true };
  }
};

// export const getStaticProps: GetStaticProps = async (context) => {
//   const { params, previewData } = context;

//   const { id } = params;
//   const draftKey = isDraft(previewData) ? previewData.draftKey : '';

//   const key = {
//     headers: { 'X-API-KEY': process.env.API_KEY },
//   };

//   // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
//   const url = `${process.env.END_POINT}/blog/${id}${
//     draftKey !== undefined ? `?draftKey=${draftKey}` : ''
//   }`;
//   const data = await fetch(url, key)
//     .then((res) => res.json())
//     .catch(() => null);
//   return {
//     props: {
//       blog: data,
//     },
//   };
// };
