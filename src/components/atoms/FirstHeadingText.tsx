import React, { FC } from 'react';
import styled from 'styled-components';
import { media } from 'libs/style-utlis';

type Props = {
  className?: string;
};

const FirstHeadingText: FC<Props> = (props) => {
  return <Heading className={props.className}>{props.children}</Heading>;
};

const Heading = styled.h1`
  font-size: 24px;
  font-weight: bold;
  letter-spacing: ${(props) => props.theme.letterSpacing};
  line-height: ${(props) => props.theme.lineHeight};

  ${media.handheld426`
    font-size: 32px;
  `}
`;

export default FirstHeadingText;
