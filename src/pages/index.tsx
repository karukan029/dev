import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';

/** utils */
import { client } from 'src/utils/api';

/** components */
import { HomeTemplate } from 'src/components/templates';

/** types */
import { SitedataResponse } from 'src/types/sitedata';
import { BlogListResponse } from 'src/types/blog';

type StaticProps = {
  sitedata: SitedataResponse;
  blogList: BlogListResponse;
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<PageProps> = (props) => (
  <HomeTemplate sitedata={props.sitedata} blogList={props.blogList} />
);

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const sitedataPromise = client.v1.sitedata.$get({
    query: { fields: 'title,description' },
  });

  const blogListPromise = client.v1.blog.$get({
    query: { fields: 'id,title,image,category,updatedAt' },
  });

  const [sitedata, blogList] = await Promise.all([
    sitedataPromise,
    blogListPromise,
  ]);

  return {
    props: { sitedata, blogList },
  };
};

export default Home;
