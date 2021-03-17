import React, { FC } from 'react';
import styled from 'styled-components';
import SecondHeadingText from 'components/atoms/SecondHeadingText';

type Props = {
  id?: string;
};

const PostListHeading: FC<Props> = (props) => {
  return <Heading id={props.id}>{props.children}</Heading>;
};

const Heading = styled(SecondHeadingText)`
  width: 132px;
  background-color: #fff;
  border-left: solid 4px ${(props) => props.theme.colors.primary.accent};
  padding-left: 16px;
`;

export default PostListHeading;
