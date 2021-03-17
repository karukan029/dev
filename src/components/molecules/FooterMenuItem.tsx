import React, { FC } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import MenuItemText from 'components/atoms/MenuItemText';

type Props = {
  href: string;
};

const FotterMenuItem: FC<Props> = (props) => {
  return (
    <Link href={props.href} scroll={false}>
      <MenuItemLink>
        <MenuItemText>{props.children}</MenuItemText>
      </MenuItemLink>
    </Link>
  );
};

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
    bottom: 0;
    transition: all ease-out 0.3s;
  }
  &:hover {
    &::after {
      width: 100%;
    }
  }
`;

export default FotterMenuItem;
