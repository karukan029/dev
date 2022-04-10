import React, { FC } from 'react';
import styled from 'styled-components';

type Props = {
  className?: string;
};

const GridUpdateDateTimeLabel: FC<Props> = (props) => (
  <Label className={props.className}>{props.children}</Label>
);

const Label = styled.span`
  font-size: 14px;
  letter-spacing: ${(props) => props.theme.letterSpacing};
  line-height: ${(props) => props.theme.lineHeight};
  color: #727272;
  &::before {
    content: '';
    display: inline-block;
    position: relative;
    top: 3px;
    width: 16px;
    height: 16px;
    background-image: url('/reload_icon.svg');
  }
`;

export default GridUpdateDateTimeLabel;
