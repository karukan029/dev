import { ContentResponse, ListContentsResponse } from './api';

export type CategoryListResponse = ListContentsResponse<CategoryResponse>;

export type CategoryResponse = ContentResponse<{
  name?: string;
}>;
