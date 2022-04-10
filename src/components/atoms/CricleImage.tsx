import React, { FC } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

type Props = {
  src: string;
  diameter?: string;
  className?: string;
};

const CricleImage: FC<Props> = (props) => (
  <ImageWrap src={props.src} width={props.diameter} height={props.diameter} />
);

const ImageWrap = styled(Image)`
  display: inline-block;
  border-radius: 50%;
  background-size: cover;
  width: ${(props: Props) => props.diameter};
`;

export default CricleImage;
