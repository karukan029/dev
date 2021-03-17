import React, { FC } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import PostImage from 'components/atoms/PostImage';
import PostListItemTitle from 'components/atoms/PostListItemTitle';
import CategoryLabel from 'components/atoms/CategoryLabel';
import UpdateDateTimeLabel from 'components/atoms/UpdateDateTimeLabel';
import { media } from 'libs/style-utlis';

type Props = {
  id: string;
  title: string;
  src: string;
  category: string;
  datetime: string;
};

const PostListItem: FC<Props> = (props) => {
  return (
    <Link href={`/blog/${props.id}`}>
      <ATug>
        <Grid>
          <GridItemImage src={props.src} width={'120'} height={'120'} />
          <GridItemTitle>{props.title}</GridItemTitle>
          <GridItemCategory>{props.category}</GridItemCategory>
          <GridItemDatetime>{props.datetime}</GridItemDatetime>
        </Grid>
      </ATug>
    </Link>
  );
};

const ATug = styled.a`
  text-decoration: none;
  cursor: pointer;
`;

const Grid = styled.div`
  display: Grid;
  ${media.handheld360`
    grid-template-rows: 72px 40px;
    grid-template-columns: 120px 80px 1fr;
    grid-template-areas:
      'img title title'
      'img category datetime';
  `}
  grid-template-rows: 120px 40px;
  grid-template-columns: 112px 1fr;
  grid-template-areas:
    'img title'
    'category datetime';
  grid-gap: 8px;
  width: 100%;
  background-color: #fff;
  transition: all ease-in-out 0.3s;
  ${ATug}:hover & {
    box-shadow: 4px 4px 8px gray;
  }
`;

export const GridItemImage = styled(PostImage)`
  grid-area: img;
`;

export const GridItemTitle = styled(PostListItemTitle)`
  grid-area: title;
  padding-top: 8px;
  margin-right: 16px;
`;

export const GridItemCategory = styled(CategoryLabel)`
  grid-area: category;
  margin-left: 16px;
  align-self: center;
  ${media.handheld360`
    margin-left: 0px;
  `}
`;

export const GridItemDatetime = styled(UpdateDateTimeLabel)`
  grid-area: datetime;
  align-self: center;
  justify-self: end;
  margin-right: 16px;
`;

export default PostListItem;
