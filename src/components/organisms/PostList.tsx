import React, { FC } from 'react';
import styled from 'styled-components';
import PostListItem from 'components/molecules/PostListItem';
import PostListHeading from 'components/molecules/PostListHeading';
import { formatDate } from 'libs/format-date';
import { media } from 'libs/style-utlis';

type Props = {
  blog: any;
};

const PostList: FC<Props> = (props) => {
  return (
    <>
      <PostListHeading id="post">POST</PostListHeading>

      <ListWrap>
        {props.blog.map((contents) => (
          <li key={contents.id}>
            <PostListItem
              id={contents.id}
              title={contents.title}
              src={contents?.image?.url ?? '/twitter_zmem8eXI_400x400.jpg'}
              category={contents?.category?.name ?? 'その他'}
              datetime={formatDate(contents.updatedAt)}
            />
          </li>
        ))}
      </ListWrap>
    </>
  );
};

const ListWrap = styled.ul`
  display: grid;
  grid-gap: 24px;
  ${media.handheld426`
    grid-template-columns: repeat(auto-fill, minmax(328px, 1fr));
  `}
`;

export default PostList;
