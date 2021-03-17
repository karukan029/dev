import React, { FC } from 'react';
import styled from 'styled-components';
import { media } from 'libs/style-utlis';

type Props = {
  className?: string;
};

const MenuItemText: FC<Props> = (props) => {
  return <LinkItem className={props.className}>{props.children}</LinkItem>;
};

const LinkItem = styled.span`
  font-size: 16px;
  letter-spacing: ${(props) => props.theme.letterSpacing};
  line-height: ${(props) => props.theme.lineHeight};
  ${media.handheld426`
    font-size: 20px;
  `}
`;

export default MenuItemText;
