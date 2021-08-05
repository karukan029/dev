import React, { FC } from 'react';
import styled from 'styled-components';
import { media } from 'libs/style-utlis';

type Props = {
  className?: string;
};

const FotterBar: FC<Props> = (props) => {
  return <Footer className={props.className}>{props.children}</Footer>;
};

const Footer = styled.footer`
  width: 100%;
  height: 112px;
  padding: 0 24px;
  background-color: #fff;
  ${media.handheld426`
    height: 200px;
    padding: 0 32px;
  `}
`;

export default FotterBar;
