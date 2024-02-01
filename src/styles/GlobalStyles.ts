import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    background-color: #f0ebf8;

    font-family: sans-serif;
  }
`;

export default GlobalStyle;
