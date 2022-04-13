import React, { FC } from 'react';
import Link from 'next/link';
import { PageWrapper } from 'src/components/layouts';

const ErrorTemplate: FC = () => (
  <PageWrapper>
    <main>
      <p>ページがありません。</p>
      <Link href="/">トップページへ戻る</Link>
    </main>
  </PageWrapper>
);

export default ErrorTemplate;
