import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';

/** utils */
import { client } from 'src/utils/api';

/** component */
import { ErrorTemplate } from 'src/components/templates';

/** type */
import { SitedataResponse } from 'src/types/sitedata';

type StaticProps = {
  sitedata: SitedataResponse;
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Custom404: NextPage<PageProps> = (props) => (
  <ErrorTemplate sitedata={props.sitedata} />
);

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  // サイトデータ
  const sitedata = await client.v1.sitedata.$get({
    query: { fields: 'title' },
  });

  return { props: { sitedata } };
};

export default Custom404;
