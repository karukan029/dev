import React, { FC } from 'react';
import styled from 'styled-components';
import { media } from 'libs/style-utlis';

type Props = {
  className?: string;
};

const HeaderBar: FC<Props> = (props) => {
  return <Header className={props.className}>{props.children}</Header>;
};

const Header = styled.header`
  width: 100%;
  height: 64px;
  padding: 0 16px;
  background-color: ${(props) => props.theme.colors.primary.main};
  ${media.handheld426`
    height: 80px;
    padding: 0 32px;
  `}
`;

export default HeaderBar;
