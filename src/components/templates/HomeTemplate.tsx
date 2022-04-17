import React, { FC } from 'react';
import MetaHead from 'src/components/MetaHead';

/** component */
import { HomeDescriptionArea } from 'src/components/molecules';
import { PostList } from 'src/components/organisms';
import { PageWrapper } from 'src/components/layouts';

/** type */
import { BlogListResponse } from 'src/types/blog';
import { SitedataResponse } from 'src/types/sitedata';

type Props = {
  sitedata: SitedataResponse;
  blogList: BlogListResponse;
};

const HomeTemplate: FC<Props> = (props) => (
  <>
    <PageWrapper sitedata={props.sitedata}>
      <MetaHead title={props.sitedata.title} />
      <main>
        <HomeDescriptionArea
          title={props.sitedata.title}
          description={props.sitedata.description}
        />
        <PostList blogList={props.blogList} />
      </main>
    </PageWrapper>
  </>
);

export default HomeTemplate;
