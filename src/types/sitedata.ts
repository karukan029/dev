import { ContentResponse } from './api';

export type SitedataResponse = ContentResponse<{
  title?: string;
  description?: string;
}>;
