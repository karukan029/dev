import React, { FC } from 'react';
import PageWrapper from 'components/layouts/PageWrapper';
import HeaderMenu from 'components/organisms/HeaderMenu';
import FooterMenu from 'components/organisms/FooterMenu';

const PageLayout: FC = (props) => {
  return (
    <>
      <HeaderMenu
        home="Create Next App"
        items={[{ text: 'POST', href: '/#post' }]}
      />
      <PageWrapper>{props.children}</PageWrapper>
      <FooterMenu
        home="Create Next App"
        twitterUrl={process.env.NEXT_PUBLIC_TWITTER_URL}
        githubUrl={process.env.NEXT_PUBLIC_GITHUB_URL}
      />
    </>
  );
};

export default PageLayout;
