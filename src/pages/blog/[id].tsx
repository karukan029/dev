import React, { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import fetch from 'node-fetch';
import PostTemplate from 'components/templates/PostTemplate';

type Props = {
  blog: any;
};

const BlogId: FC<Props> = ({ blog }) => (
  <PostTemplate title="Create Next App" blog={blog}></PostTemplate>
);

export default BlogId;

// 静的生成のためのパスを指定します
export const getStaticPaths: GetStaticPaths = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };
  const data = await fetch(`${process.env.END_POINT}/blog`, key)
    .then((res) => res.json())
    .catch(() => null);
  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述（GetStaticPropsの引数でURLパラメータを取得）
export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params;
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };
  let url = `${process.env.END_POINT}/blog/${id}`;
  if (context?.preview) {
    url += `?draftKey=${context.previewData?.draftKey}:''`;
  }
  const data = await fetch(url, key)
    .then((res) => res.json())
    .catch(() => null);
  return {
    props: {
      blog: data,
    },
  };
};
