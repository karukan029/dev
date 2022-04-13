// Next.jsのQueryParamsの型定義に対応するための関数
// string | string[]なので、paramsの値を参照すると、配列のプロパティを参照することになり型エラーとなる
export const toStringId = (value: string | string[]): string => {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
};
