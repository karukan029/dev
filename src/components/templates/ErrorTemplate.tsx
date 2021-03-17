import React, { FC } from 'react';
import Link from 'next/link';
import HeaderMenu from 'components/organisms/HeaderMenu';

const ErrorTemplate: FC = () => {
  return (
    <main>
      <p>ページがありません。</p>
      <Link href="/">トップページへ戻る</Link>
    </main>
  );
};

export default ErrorTemplate;
