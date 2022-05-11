import {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  }

  body {
    background: ${({theme}) => theme.body.background};
    min-height: 100vh;
    margin: 0;
    padding: 0;
    color: ${({theme}) => theme.body.color};

    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Change the white to any color */
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
    //font-family: 'Kaushan Script', cursive;

  }

  //input:-webkit-autofill::first-line:active,
  //input:-webkit-autofill::first-line {
  //  font-family: 'Kaushan Script', cursive;
  //}
`;
