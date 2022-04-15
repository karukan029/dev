import React, { FC } from 'react';

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
          <div
            dangerouslySetInnerHTML={{
              __html: `${blog.body}`,
            }}
          />
        </PostContentsArea>
      </main>
    </PageWrapper>
  </>
);

export default PostTemplate;
