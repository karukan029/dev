import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import FooterBar from 'components/atoms/FooterBar';
import FooterMenuItem from 'components/molecules/FooterMenuItem';
import CricleImage from 'components/atoms/CricleImage';

type Props = {
  home: ReactNode;
  twitterUrl?: string;
  githubUrl?: string;
};

const FooterMenu: FC<Props> = (props) => {
  return (
    <Footer>
      <FooterMenuItem href="/">{props.home}</FooterMenuItem>
      {!props?.twitterUrl ?? (
        <FooterMenuItem href={props.twitterUrl}>
          <CricleImage src="/Twitter social icons - circle - blue.png" />
        </FooterMenuItem>
      )}
      {!props?.githubUrl ?? (
        <FooterMenuItem href={props.githubUrl}>
          <CricleImage src="/GitHub-Mark-64px.png" />
        </FooterMenuItem>
      )}
    </Footer>
  );
};

const Footer = styled(FooterBar)``;

export default FooterMenu;
