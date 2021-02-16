import React, { FC } from 'react';
import Link from 'next/link';

const Custom404: FC = () => (
  <main className="main">
    <p>ページがありません。</p>
    <Link href="/">トップページへ戻る</Link>
  </main>
);

export default Custom404;
