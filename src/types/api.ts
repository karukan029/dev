// microCMSのAPIレスポンス、クエリの型定義
// リスト形式のレスポンス用
// T(他にも使用可能な文字列あり)をジェネリクスに指定することで、型指定時に拡張できる
export type ListContentsResponse<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};

// オブジェクト形式のレスポンス用
export type ContentResponse<T> = {
  id: string;
  createAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
} & T;

// リスト形式のクエリ用
// https://document.microcms.io/content-api/get-list-contents
export type GetListContentsQuery = {
  draftKey?: string;
  limit?: number;
  orders?: string;
  q?: string;
  fields?: string;
  ids?: string;
  filters?: string;
  depth?: number;
};

// オブジェクト形式のクエリ用
// https://document.microcms.io/content-api/get-content
export type GetContentQuery = {
  draftKey?: string;
  fields?: string;
  depth?: number;
};
