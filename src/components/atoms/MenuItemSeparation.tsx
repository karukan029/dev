import React, { FC } from 'react';
import styled from 'styled-components';
import media from 'src/libs/style-utlis';

type Props = {
  className?: string;
  width: string;
  height: string;
};

const MenuItemSeparation: FC<Props> = (props) => (
  <Separation width={props.width} height={props.height} />
);

const Separation = styled.div`
  width: ${(props: Props) => props.width};
  height: ${(props: Props) => props.height};
  background-color: ${(props) => props.theme.colors.primary.main};
`;

export default MenuItemSeparation;
