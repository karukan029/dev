import React, { FC } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { MenuItemText } from 'src/components/atoms';

type Props = {
  href: string;
};

const HeaderMenuItem: FC<Props> = (props) => (
  <Link href={props.href} scroll={false}>
    <MenuItemLink>
      <MenuItemText>{props.children}</MenuItemText>
    </MenuItemLink>
  </Link>
);

const MenuItemLink = styled.a`
  display: inline-block;
  text-decoration: none;
  color: #fff;
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    width: 0;
    border-bottom: solid 2px #fff;
    bottom: 0;
    transition: all ease-out 0.3s;
  }
  &:hover {
    &::after {
      width: 100%;
    }
  }
`;

export default HeaderMenuItem;
