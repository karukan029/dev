import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';

/** utils */
import { client } from 'src/utils/api';

/** components */
import { HomeTemplate } from 'src/components/templates';

/** types */
import { SitedataResponse } from 'src/types/sitedata';
import { BlogListResponse } from 'src/types/blog';

type StaticProps = {
  siteData: SitedataResponse;
  blogList: BlogListResponse;
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<PageProps> = (props) => (
  <HomeTemplate title={props.siteData.title} blogList={props.blogList} />
);

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const siteDataPromise = client.v1.sitedata.$get({
    query: { fields: 'title' },
  });

  const blogListPromise = client.v1.blog.$get({
    query: { fields: 'id,title,image,category,updatedAt' },
  });

  const [siteData, blogList] = await Promise.all([
    siteDataPromise,
    blogListPromise,
  ]);

  return {
    props: { siteData, blogList },
  };
};

export default Home;
