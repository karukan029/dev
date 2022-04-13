// _パスにidが指定されるため、_id@stringに作成(@以降は、型を指定)
import { GetContentQuery } from 'src/types/api';
import { BlogResponse } from 'src/types/blog';

export type Methods = {
  get: {
    query?: GetContentQuery;
    resBody: BlogResponse;
  };
};
