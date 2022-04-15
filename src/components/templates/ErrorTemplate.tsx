import React, { FC } from 'react';
import Link from 'next/link';

/** component */
import { PageWrapper } from 'src/components/layouts';

/** type */
import { SitedataResponse } from 'src/types/sitedata';

type Props = {
  sitedata: SitedataResponse;
};

const ErrorTemplate: FC<Props> = ({ sitedata }) => (
  <PageWrapper sitedata={sitedata}>
    <main>
      <p>ページがありません。</p>
      <Link href="/">トップページへ戻る</Link>
    </main>
  </PageWrapper>
);

export default ErrorTemplate;
