import "../styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";
import { ColorMode, ThemeProvider } from "styled-components";
import { useEffect, useState } from "react";
import { darkTheme, lightTheme } from "../styles/theme";
import Header from "../components/Header";
import { wrapper } from "../store";
import App from "next/app";
import { cookieStringToObject } from "../lib/utils";
import axios from "../lib/api";
import { loginAPI, meAPI } from "../lib/api/auth";
import { useDispatch } from "react-redux";
import { setLoggedUser } from "../store/user";

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

MyApp.getInitialProps = wrapper.getInitialAppProps(
  (store) => async (context: AppContext) => {
    const appInitialProps = await App.getInitialProps(context);

    const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);

    // next redux wrapper 패키지 덕분에 사용 가능.
    const { isLogged } = store.getState().user;
    try {
      if (!isLogged && cookieObject.access_token) {
        axios.defaults.headers.cookie = cookieObject.access_token;

        const { data } = await meAPI();
        store.dispatch(setLoggedUser(data));
      }
    } catch (e) {
      console.log(e);
    }
    return { ...appInitialProps };
  }
);

export default wrapper.withRedux(MyApp);
