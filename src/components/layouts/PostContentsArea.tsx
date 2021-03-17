import React, { FC } from 'react';
import styled from 'styled-components';
import { media } from 'libs/style-utlis';

const PostContentsArea: FC = (props) => {
  return <ContentsArea>{props.children}</ContentsArea>;
};

const ContentsArea = styled.div`
  display: block;
  max-width: 768px;
  padding: 40px 24px;
  margin: 0 auto;
  background-color: #fff;
  ${media.handheld769`
    padding: 48px 64px;
  `}
`;

export default PostContentsArea;
