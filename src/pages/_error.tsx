// Next.js組み込みのエラーフォールバックページ
// https://nextjs.org/docs/advanced-features/custom-error-page
import { NextPage, NextPageContext } from 'next';
import Error from 'next/error';

interface Props {
  statusCode?: number;
}

// eslint-disable-next-line no-confusing-arrow
const ErrorPage: NextPage<Props> = ({ statusCode }) =>
  statusCode ? (
    <Error statusCode={statusCode} />
  ) : (
    <p>An error occurred on client</p>
  );

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  // eslint-disable-next-line no-nested-ternary
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
