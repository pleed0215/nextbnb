import "../styles/globals.css";
import type { AppProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";
import { ColorMode, ThemeProvider } from "styled-components";
import { useState } from "react";
import { darkTheme, lightTheme } from "../styles/theme";
import Header from "../components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<ColorMode>("light");
  return (
    <>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyle />
        <Header />
        <Component {...pageProps} />
        <div id="root-modal" />
      </ThemeProvider>
    </>
  );
}
export default MyApp;
