import React, { FC } from 'react';
import styled from 'styled-components';
import media from 'src/libs/style-utlis';

type Props = {
  className?: string;
};

const MenuItemText: FC<Props> = (props) => (
  <LinkItem className={props.className}>{props.children}</LinkItem>
);

const LinkItem = styled.span`
  font-size: 16px;
  font-weight: bold;
  letter-spacing: ${(props) => props.theme.letterSpacing};
  line-height: ${(props) => props.theme.lineHeight};
  ${media.handheld426`
    font-size: 20px;
  `}
`;

export default MenuItemText;
