import React, { FC } from 'react';
import styled from 'styled-components';
import { media } from 'libs/style-utlis';

type Props = {
  className?: string;
};

const PageWrapper: FC<Props> = (props) => {
  return <Wrapper className={props.className}>{props.children}</Wrapper>;
};

const Wrapper = styled.div`
  max-width: 1140px;
  padding: 0 16px;
  margin: 0 auto;
  ${media.handheld426`
    padding: 0 36px;
  `}
`;

export default PageWrapper;
