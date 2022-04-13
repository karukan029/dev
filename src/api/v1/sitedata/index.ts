import { GetContentQuery } from 'src/types/api';
import { SitedataResponse } from 'src/types/sitedata';

export type Methods = {
  get: {
    query?: GetContentQuery;
    resBody: SitedataResponse;
  };
};
