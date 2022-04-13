import { GetListContentsQuery } from 'src/types/api';
import { CategoryListResponse } from 'src/types/category';

export type Methods = {
  get: {
    query?: GetListContentsQuery;
    resBody: CategoryListResponse;
  };
};
