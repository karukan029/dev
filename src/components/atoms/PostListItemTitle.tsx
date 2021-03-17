import React, { FC } from 'react';
import styled from 'styled-components';

type Props = {
  className?: string;
};

const PostListItemTitle: FC<Props> = (props) => {
  return <Title className={props.className}>{props.children}</Title>;
};

const Title = styled.h3`
  font-size: 16px;
  letter-spacing: ${(props) => props.theme.letterSpacing};
  line-height: ${(props) => props.theme.lineHeight};
  color: ${(props) => props.theme.colors.text.black};
`;

export default PostListItemTitle;
