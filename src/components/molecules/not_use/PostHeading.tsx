import React, { FC } from 'react';
import styled from 'styled-components';
import { SecondHeadingText } from 'src/components/atoms';

const PostHeading: FC = (props) => <Heading>{props.children}</Heading>;

const Heading = styled(SecondHeadingText)`
  width: 100%;
  background-color: ${(props) => props.theme.colors.primary.base};
  border-left: solid 4px ${(props) => props.theme.colors.primary.accent};
  padding-left: 16px;
`;

export default PostHeading;
