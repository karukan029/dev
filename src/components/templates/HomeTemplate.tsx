import React, { FC } from 'react';
import MetaHead from 'src/components/MetaHead';

/** component */
import { PostList } from 'src/components/organisms';
import { PageWrapper } from 'src/components/layouts';

/** type */
import { BlogListResponse } from 'src/types/blog';
import { SitedataResponse } from 'src/types/sitedata';

type Props = {
  title: string;
  sitedata: SitedataResponse;
  blogList: BlogListResponse;
};

const HomeTemplate: FC<Props> = (props) => (
  <>
    <PageWrapper sitedata={props.sitedata}>
      <MetaHead title={props.title} />
      <main>
        <h1>Welcome to Next.js!</h1>
        <PostList blogList={props.blogList} />
      </main>
    </PageWrapper>
  </>
);

export default HomeTemplate;
