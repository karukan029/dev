import React, { FC } from 'react';
import styled from 'styled-components';
import SecondHeadingText from 'components/atoms/SecondHeadingText';

const PostHeading: FC = (props) => {
  return <Heading>{props.children}</Heading>;
};

const Heading = styled(SecondHeadingText)`
  width: 100%;
  background-color: ${(props) => props.theme.colors.primary.base};
  border-left: solid 4px ${(props) => props.theme.colors.primary.accent};
  padding-left: 16px;
`;

export default PostHeading;
