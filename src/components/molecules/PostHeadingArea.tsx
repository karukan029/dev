import React, { FC } from 'react';
import styled from 'styled-components';
import FirstHeadingText from 'components/atoms/FirstHeadingText';
import CategoryLabel from 'components/atoms/CategoryLabel';
import UpdateDateTimeLabel from 'components/atoms/UpdateDateTimeLabel';
import PostImage from 'components/atoms/PostImage';
import { formatDate } from 'libs/format-date';
import { media } from 'libs/style-utlis';

type Props = {
  title: string;
  src: string;
  category: string;
  datetime: string;
};

const PostHeadingArea: FC<Props> = (props) => {
  return (
    <Grid>
      <FirstHeadingText css="grid-row: 1/2; grid-column: 1/3;">
        {props.title}
      </FirstHeadingText>
      <CategoryLabel css="grid-row: 2/3; grid-column: 1/2;">
        {props.category}
      </CategoryLabel>
      <UpdateDateTimeLabel css="grid-row: 2/3; grid-column: 2/3; justify-self: end;">
        {formatDate(props.datetime)}
      </UpdateDateTimeLabel>
      <PostImage
        src={props.src}
        width="240px"
        height="240px"
        css="grid-row: 3/4; grid-column: 1/3; justify-self: center;"
      />
    </Grid>
  );
};

const Grid = styled.div`
  display: Grid;
  grid-template-rows: 120px auto auto;
  grid-template-columns: 80px 1fr;
  row-gap: 24px;
  margin-bottom: 32px;
  ${media.handheld769`
    grid-template-rows: 160px auto auto;
    margin-bottom: 40px;
  `}
`;

export default PostHeadingArea;
