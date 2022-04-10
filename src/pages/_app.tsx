import { AppProps } from 'next/app';
import 'modern-css-reset/dist/reset.min.css';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'src/styles/globals';
import { theme } from 'src/styles/theme';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Component {...pageProps} />
  </ThemeProvider>
);

export default MyApp;
