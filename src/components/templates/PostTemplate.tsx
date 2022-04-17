import React, { FC } from 'react';
import styled from 'styled-components';

/** component */
import MetaHead from 'src/components/MetaHead';
import { PostHeadingArea } from 'src/components/molecules';
import { PageWrapper, PostContentsArea } from 'src/components/layouts';

/** type */
import { BlogResponse } from 'src/types/blog';
import { SitedataResponse } from 'src/types/sitedata';

type Props = {
  sitedata: SitedataResponse;
  blog: BlogResponse;
};

const PostTemplate: FC<Props> = ({ blog, sitedata }) => (
  <>
    <MetaHead title={blog.title} />
    <PageWrapper sitedata={sitedata}>
      <main>
        <PostContentsArea>
          <PostHeadingArea
            title={blog.title}
            src={blog?.image?.url ?? '/twitter_zmem8eXI_400x400.jpg'}
            category={blog?.category?.name ?? 'その他'}
            datetime={blog.publishedAt}
          />
          {/* リッチエディタ形式ならHTML、またはマークダウンで書ける
          出力されたHTMLの形式に合わせてスタイルを適用できる仕組みが必要 */}
          <ContentsArea
            dangerouslySetInnerHTML={{
              __html: `${blog.body}`,
            }}
          />
        </PostContentsArea>
      </main>
    </PageWrapper>
  </>
);

const ContentsArea = styled.div`
  & h2 {
    padding-left: 8px;
    background-color: ${(props) => props.theme.colors.primary.base};
    border-left: solid 4px ${(props) => props.theme.colors.primary.accent};
    font-size: 24px;
    letter-spacing: ${(props) => props.theme.letterSpacing};
    line-height: ${(props) => props.theme.lineHeight};
    margin-bottom: 16px;
  }
  & h3 {
    font-size: 16px;
  }
  /* word-break コンテンツが溢れる場合、改行するか */
  /* overflow-wrap コンテンツが溢れないように改行するか */
  & pre {
    border-radius: 0.7em;
    background-color: #1a2638;
    overflow-x: auto;
    word-break: normal;
    overflow-wrap: normal;
  }
  & pre > code {
    display: block;
    padding: 1.1rem;
  }
  & code {
    color: #fff;
  }
`;

export default PostTemplate;
