import React, { FC } from 'react';
import { GetStaticProps } from 'next';
import HomeTemplate from 'components/templates/HomeTemplate';

type Props = {
  blog: any;
};

const Home: FC<Props> = ({ blog }) => {
  return <HomeTemplate title="Create Next App" blog={blog} />;
};

export const getStaticProps: GetStaticProps = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };
  const data = await fetch(`${process.env.END_POINT}/blog`, key)
    .then((res) => res.json())
    .catch(() => null);
  return {
    props: {
      blog: data.contents,
    },
  };
};

export default Home;
