import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import FooterBar from 'components/atoms/FooterBar';
import FooterMenuItemText from 'components/molecules/FooterMenuItemText';
import CricleImage from 'components/atoms/CricleImage';
import MenuItemSeparation from 'components/atoms/MenuItemSeparation';
import MenuItemText from 'components/atoms/MenuItemText';
import ExtarnalLink from 'components/atoms/ExtarnalLink';

type Props = {
  home: ReactNode;
  twitterUrl?: string;
  githubUrl?: string;
};

const FooterMenu: FC<Props> = (props) => {
  return (
    <Footer>
      <ContentsArea>
        <FooterMenuItemText href="/">
          <MenuItemText>{props.home}</MenuItemText>
        </FooterMenuItemText>
        <MenuItemSeparation width="2px" height="48px" />
        <ExtarnalLink href={props.twitterUrl} height="40px">
          <CricleImage
            src="/Twitter social icons - circle - blue.png"
            diameter="40"
          />
        </ExtarnalLink>
        <ExtarnalLink href={props.githubUrl} height="40px">
          <CricleImage src="/GitHub-Mark-64px.png" diameter="40" />
        </ExtarnalLink>
      </ContentsArea>
    </Footer>
  );
};

const Footer = styled(FooterBar)`
  display: flex;
  align-items: center;
`;

const ContentsArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 320px;
  margin: 0 auto;
`;

export default FooterMenu;
