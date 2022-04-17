import React, { FC, ReactNode } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import media from 'src/libs/style-utlis';
import {
  FooterBar,
  CricleImage,
  MenuItemSeparation,
  MenuItemText,
  ExtarnalLink,
} from 'src/components/atoms';
import { FooterMenuItemText } from 'src/components/molecules';

type Props = {
  home: ReactNode;
  twitterUrl?: string;
  githubUrl?: string;
  zennUrl?: string;
};

const FooterMenu: FC<Props> = (props) => (
  <Footer>
    <ContentsArea>
      <FooterMenuItemText href="/">
        <MenuItemText>{props.home}</MenuItemText>
      </FooterMenuItemText>
      <MenuItemSeparation width="2px" height="48px" />
      <LinkArea>
        <ExtarnalLink href={props.twitterUrl} height="40px">
          <CricleImage
            src="/Twitter social icons - circle - blue.png"
            diameter="40"
          />
        </ExtarnalLink>
        <ExtarnalLink href={props.githubUrl} height="40px">
          <CricleImage src="/GitHub-Mark-64px.png" diameter="40" />
        </ExtarnalLink>
        <ExtarnalLink href={props.zennUrl} height="40px">
          <Image src="/zenn_logo.png" width="168px" height="40px" />
        </ExtarnalLink>
      </LinkArea>
    </ContentsArea>
  </Footer>
);

const Footer = styled(FooterBar)`
  display: flex;
  align-items: center;
`;

const ContentsArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 16px;
  margin: 0 auto;
  ${media.handheld426`
    width: 564px;
  `}
`;

const LinkArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  width: 50%;
  height: 132px;
  ${media.handheld426`
  width: 64%;
  height: auto;
`}
`;

export default FooterMenu;
