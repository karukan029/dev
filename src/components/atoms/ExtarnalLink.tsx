import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
  href?: string;
  height?: string;
  className?: string;
};

const ExtarnalLinkIcon: FC<Props> = (props) => {
  return (
    <Link
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
      height={props.height}
    >
      {props.children}
    </Link>
  );
};

const Link = styled.a`
  display: inline-block;
  height: ${(props: Props) => props.height};
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

export default ExtarnalLinkIcon;
