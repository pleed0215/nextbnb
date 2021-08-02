import { createGlobalStyle, css } from "styled-components";
import reset from "styled-reset";

const globalStyles = css`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    font-family: Noto Sans, Noto Sans KR;
  }
`;

const GlobalStyle = createGlobalStyle`
    ${globalStyles};
`;

export default GlobalStyle;
