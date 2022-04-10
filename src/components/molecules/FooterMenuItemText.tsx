import React, { FC } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

type Props = {
  href?: string;
  className?: string;
};

const FotterMenuItem: FC<Props> = (props) => (
  <Link href={props.href} scroll={false}>
    <MenuItemLink>{props.children}</MenuItemLink>
  </Link>
);

const MenuItemLink = styled.a`
  display: inline-block;
  text-decoration: none;
  color: ${(props) => props.theme.colors.primary.main};
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    width: 0;
    border-bottom: solid 2px ${(props) => props.theme.colors.primary.main};
    transition: all ease-out 0.3s;
  }
  &:hover {
    &::after {
      width: 100%;
    }
  }
`;

export default FotterMenuItem;
