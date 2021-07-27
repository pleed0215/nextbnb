import { createGlobalStyle, css } from "styled-components";
import reset from "styled-reset";

const globalStyles = css`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    color: ${(props) => props.theme.palette};
    font-family: Noto Sans, Noto Sans KR;
  }
`;

const GlobalStyle = createGlobalStyle`
    ${globalStyles};
`;

export default GlobalStyle;
