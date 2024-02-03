import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    font-family: 'Roboto', 'sans-serif';
    background-color: #f0ebf8;
  }
`;

export default GlobalStyle;
