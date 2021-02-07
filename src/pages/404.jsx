import React from 'react';
import Link from 'next/link';

const Custom404 = () => (
  <main className="main">
    <p>ページがありません。</p>
    <Link href="/">トップページへ戻る</Link>
  </main>
);

export default Custom404;
