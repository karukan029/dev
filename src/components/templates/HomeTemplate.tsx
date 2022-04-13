import React, { FC } from 'react';
import MetaHead from 'src/components/MetaHead';
import { PostList } from 'src/components/organisms';
import { PageWrapper } from 'src/components/layouts';
import { BlogListResponse } from 'src/types/blog';

type Props = {
  title: string;
  blogList: BlogListResponse;
};

const HomeTemplate: FC<Props> = (props) => (
  <>
    <MetaHead title={props.title} />
    <PageWrapper>
      <main>
        <h1>Welcome to Next.js!</h1>
        <PostList blogList={props.blogList} />
      </main>
    </PageWrapper>
  </>
);

export default HomeTemplate;
