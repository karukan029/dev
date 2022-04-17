import React, { FC } from 'react';
import styled from 'styled-components';
import media from 'src/libs/style-utlis';

/** component */
import { HeaderMenu, FooterMenu } from 'src/components/organisms';

/** types */
import { SitedataResponse } from 'src/types/sitedata';

type Props = {
  sitedata: SitedataResponse;
  className?: string;
  twitterUrl?: string;
  githubUrl?: string;
};

const PageWrapper: FC<Props> = (props) => (
  <>
    <HeaderMenu
      home={props.sitedata.title}
      items={[{ text: 'POST', href: '/#post' }]}
    />
    <Wrapper className={props.className}>{props.children}</Wrapper>
    <FooterMenu
      home={props.sitedata.title}
      twitterUrl={process.env.NEXT_PUBLIC_TWITTER_URL}
      githubUrl={process.env.NEXT_PUBLIC_GITHUB_URL}
      zennUrl={process.env.NEXT_PUBLIC_ZENN_URL}
    />
  </>
);

const Wrapper = styled.div`
  max-width: 1140px;
  min-height: calc(100vh - 256px);
  padding: 0 16px;
  margin: 32px auto 48px;
  ${media.handheld426`
    min-height: calc(100vh - 440px);
    padding: 0 36px;
    margin: 64px auto 96px;
  `}
`;

export default PageWrapper;
