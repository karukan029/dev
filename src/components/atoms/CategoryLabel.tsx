import React, { FC } from 'react';
import styled from 'styled-components';

type Props = {
  className?: string;
};

const CategoryLabel: FC<Props> = (props) => (
  <Label className={props.className}>{props.children}</Label>
);

const Label = styled.div`
  display: inline-block;
  width: 80px;
  height: 24px;
  border-radius: 10px;
  font-size: 14px;
  letter-spacing: ${(props) => props.theme.letterSpacing};
  line-height: ${(props) => props.theme.lineHeight};
  text-align: center;
  color: #fff;
  background-color: ${(props) => props.theme.colors.primary.main};
`;

export default CategoryLabel;
