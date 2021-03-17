import React, { FC } from 'react';
import MetaHead from 'components/MetaHead';
import PostList from 'components/organisms/PostList';
import PageWrapper from 'components/layouts/PageWrapper';
import HeaderMenu from 'components/organisms/HeaderMenu';
import FooterMenu from 'components/organisms/FooterMenu';

type Props = {
  title: string;
  headerItems: [
    {
      text: string;
      href: string;
    },
  ];
  blog: any;
};

const HomeTemplate: FC<Props> = (props) => {
  return (
    <>
      <MetaHead title={props.title} />
      {/* <HeaderMenu home={props.title} items={props.headerItems} /> */}
      <PageWrapper>
        <main>
          <h1>Welcome to Next.js!</h1>
          <PostList blog={props.blog}></PostList>
        </main>
      </PageWrapper>
      <FooterMenu
        home={props.title}
        twitterUrl={process.env.NEXT_PUBLIC_TWITTER_URL}
        githubUrl={process.env.NEXT_PUBLIC_GITHUB_URL}
      />
    </>
  );
};

export default HomeTemplate;
