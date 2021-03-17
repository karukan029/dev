import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
   font-family: "Helvetica Neue",
     Arial,
     "Hiragino Kaku Gothic ProN",
     "Hiragino Sans",
     Meiryo,
     sans-serif;
   background-color: ${(props) => props.theme.colors.primary.base};
  }

  a {
    color:  #0066c0;
    }
  ul {
    padding-inline-start: 0;
  }

  li {
    list-style-type: none;
  }
`;

export default GlobalStyle;
