import { AppProps } from 'next/app';
import React from 'react';
import GlobalStyle from '../styles/globals';
import 'modern-css-reset/dist/reset.min.css';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Component {...pageProps} />
  </ThemeProvider>
);

export default MyApp;
