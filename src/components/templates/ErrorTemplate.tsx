import React, { FC } from 'react';
import Link from 'next/link';
import PageWrapper from 'components/layouts/PageWrapper';

const ErrorTemplate: FC = (props) => {
  return (
    <PageWrapper>
      <main>
        <p>ページがありません。</p>
        <Link href="/">トップページへ戻る</Link>
      </main>
    </PageWrapper>
  );
};

export default ErrorTemplate;
