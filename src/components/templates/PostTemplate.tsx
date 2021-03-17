import React, { FC } from 'react';
import MetaHead from 'components/MetaHead';
import PostHeadingArea from 'components/molecules/PostHeadingArea';
import PageWrapper from 'components/layouts/PageWrapper';
import PostContentsArea from 'components/layouts/PostContentsArea';
import HeaderMenu from 'components/organisms/HeaderMenu';

type Props = {
  title: string;
  headerItems: [
    {
      text: string;
      href: string;
    },
  ];
  blog: any;
};

const PostTemplate: FC<Props> = (props) => {
  return (
    <>
      <MetaHead title={props.blog.title} />
      <HeaderMenu home={props.title} items={props.headerItems} />
      <PageWrapper>
        <main>
          <PostContentsArea>
            <PostHeadingArea
              title={props.blog.title}
              src={props.blog?.image?.url ?? '/twitter_zmem8eXI_400x400.jpg'}
              category={props.blog?.category?.name ?? 'その他'}
              datetime={props.blog.publishedAt}
            />
            <div
              dangerouslySetInnerHTML={{
                __html: `${props.blog.body}`,
              }}
            />
          </PostContentsArea>
        </main>
      </PageWrapper>
    </>
  );
};

export default PostTemplate;
