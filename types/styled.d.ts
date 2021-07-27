import "styled-components";
// 참고: https://flowkater.io/frontend/setup-styled-components/
declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      primary: string;
      secondary: string;
      border: string;
      link: string;
      button: string;
      error?: string;
      warning?: string;
      info?: string;
      success?: string;
      like?: string;
    };
    background: {
      primary: string;
      secondary: string;
      avatar: string;
      button: string;
    };
    palette: {
      cardinal: string;
      davidson_orange: string;
      tawny: string;
      amaranth: string;
      orange: string;
      main_pink: string;
      bittersweet: string;
      black: string;
      charcoal: string;
      snow: string;
      gray_48: string;
      gray_71: string;
      gray_76: string;
      gray_80: string;
      gray_85: string;
      gray_aa: string;
      gray_bb: string;
      gray_b0: string;
      gray_c4: string;
      gray_dd: string;
      gray_eb: string;
      gray_e5: string;
      gray_f7: string;
      dark_cyan: string;
      green: string;
    };
  }
  export type ColorMode = "light" | "dark";
}
