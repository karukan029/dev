import React, { FC } from 'react';
import MetaHead from 'components/MetaHead';
import PostList from 'components/organisms/PostList';
import PageWrapper from 'components/layouts/PageWrapper';

type Props = {
  title: string;
  blog: any;
};

const HomeTemplate: FC<Props> = (props) => {
  return (
    <>
      <MetaHead title={props.title} />
      <PageWrapper>
        <main>
          <h1>Welcome to Next.js!</h1>
          <PostList blog={props.blog}></PostList>
        </main>
      </PageWrapper>
    </>
  );
};

export default HomeTemplate;
