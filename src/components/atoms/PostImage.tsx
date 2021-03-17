import React, { FC } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

type Props = {
  src: string;
  width: string;
  height: string;
  className?: string;
};

const PostImage: FC<Props> = (props) => {
  return (
    <ImageWrap className={props.className}>
      <Image src={props.src} width={props.width} height={props.height} />
    </ImageWrap>
  );
};

const ImageWrap = styled.div`
  display: inline-block;
`;

export default PostImage;
