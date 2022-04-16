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
import { SitedataResponse } from 'src/types/sitedata';
import { BlogResponse } from 'src/types/blog';

type StaticProps = {
  sitedata: SitedataResponse;
  blog: BlogResponse;
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const BlogId: NextPage<PageProps> = (props) => (
  <PostTemplate sitedata={props.sitedata} blog={props.blog} />
);

export default BlogId;

// 静的生成のためのパスを指定します
export const getStaticPaths: GetStaticPaths = () => ({
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
  // サイトデータ
  const sitedata = await client.v1.sitedata.$get({
    query: { fields: 'title' },
  });

  // 記事データ
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
    const blog = await client.v1.blog._id(id).$get({
      query: {
        fields: 'title,image,category,body,publishedAt',
        ...draftKey,
      },
    });
    return {
      props: { sitedata, blog },
    };
  } catch (e) {
    // 404 ページを戻す(Next10以降)
    return { notFound: true };
  }
};
