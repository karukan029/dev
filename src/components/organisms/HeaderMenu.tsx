import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import HeaderBar from 'components/atoms/HeaderBar';
import HeaderMenuItem from 'components/molecules/HeaderMenuItem';

type Props = {
  home: ReactNode;
  items: [
    {
      text: string;
      href: string;
    },
  ];
};

const HeaderMenu: FC<Props> = (props) => {
  return (
    <Header>
      <HeaderMenuItem href="/">{props.home}</HeaderMenuItem>
      {props.items.map((item) => (
        <HeaderMenuItem key={item.text} href={item.href}>
          {item.text}
        </HeaderMenuItem>
      ))}
    </Header>
  );
};

const Header = styled(HeaderBar)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default HeaderMenu;
