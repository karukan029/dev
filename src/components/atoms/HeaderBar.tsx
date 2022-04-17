import React, { FC } from 'react';
import styled from 'styled-components';
import media from 'src/libs/style-utlis';

type Props = {
  className?: string;
};

const HeaderBar: FC<Props> = (props) => (
  <Header className={props.className}>
    <HeaderContent>{props.children}</HeaderContent>
  </Header>
);

const Header = styled.header`
  width: 100%;
  height: 64px;
  background-color: ${(props) => props.theme.colors.primary.main};
  ${media.handheld426`
    height: 80px;
  `}
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1140px;
  padding: 0 16px;
  margin: 0 auto;
  ${media.handheld426`
  padding: 0 36px;
`}
`;

export default HeaderBar;
