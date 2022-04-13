import aspida from '@aspida/fetch';
import api from 'src/api/$api';

// microCMSからコンテンツを取得するクライアントを定義
const fetchConfig: Required<Parameters<typeof aspida>>[1] = {
  baseURL: process.env.END_POINT,
  throwHttpErrors: true,
  headers: {
    'X-API-KEY': process.env.API_KEY,
  },
};

export const client = api(aspida(fetch, fetchConfig));
