import { ContentResponse, ListContentsResponse } from './api';
import { CategoryResponse } from './category';

export type BlogListResponse = ListContentsResponse<BlogResponse>;

type Image = {
  url: string;
  height: number;
  width: number;
};

export type BlogResponse = ContentResponse<{
  title?: string;
  body?: string;
  category?: ContentResponse<CategoryResponse>;
  image?: Image;
}>;
