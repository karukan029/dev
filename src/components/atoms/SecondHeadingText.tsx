import React, { FC } from 'react';
import styled from 'styled-components';

type Props = {
  className?: string;
  id?: string;
};

const SecondHeadingText: FC<Props> = (props) => {
  return (
    <Heading id={props.id} className={props.className}>
      {props.children}
    </Heading>
  );
};

const Heading = styled.h2`
  font-size: 24px;
  letter-spacing: ${(props) => props.theme.letterSpacing};
  line-height: ${(props) => props.theme.lineHeight};
`;

export default SecondHeadingText;
