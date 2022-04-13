import React, { FC } from 'react';

/** component */
import MetaHead from 'src/components/MetaHead';
import { PostHeadingArea } from 'src/components/molecules';
import { PageWrapper, PostContentsArea } from 'src/components/layouts';

/** type */
import { BlogResponse } from 'src/types/blog';

type Props = {
  blogData: BlogResponse;
};

const PostTemplate: FC<Props> = ({ blogData }) => (
  <>
    <MetaHead title={blogData.title} />
    <PageWrapper>
      <main>
        <PostContentsArea>
          <PostHeadingArea
            title={blogData.title}
            src={blogData?.image?.url ?? '/twitter_zmem8eXI_400x400.jpg'}
            category={blogData?.category?.name ?? 'その他'}
            datetime={blogData.publishedAt}
          />
          {/* リッチエディタ形式ならHTML、またはマークダウンで書ける
          出力されたHTMLの形式に合わせてスタイルを適用できる仕組みが必要 */}
          <div
            dangerouslySetInnerHTML={{
              __html: `${blogData.body}`,
            }}
          />
        </PostContentsArea>
      </main>
    </PageWrapper>
  </>
);

export default PostTemplate;
