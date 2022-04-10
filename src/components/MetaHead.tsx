import React, { FC } from 'react';
import Head from 'next/head';

type Props = {
  title: string;
};

const MetaHead: FC<Props> = (props) => (
  <Head>
    <title>{props.title}</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>
);

export default MetaHead;
