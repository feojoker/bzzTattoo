
import React, { useEffect } from 'react';
import App, { AppContext, AppProps as NextAppProps } from "next/app";
import "../../styles/style.css";
import "../../styles/fonts.css";
import { fetchAPI } from "./api/api";
import { Footer, GlobalData, Lang, Navs } from "../types";
import { GlobalDataProvider } from "../context/GlobalDataContext";
import { MediaQueryProvider } from "../context/MediaQueryContext";
import { Loader } from '../components/Loader';

type AppProps<P = any> = {
  pageProps: P;
} & Pick<NextAppProps<P>, "Component">;

type CustomPageProps = {
  global: GlobalData,
  leftNavs: Navs[],
  rightNavs: Navs[],
  langs: Lang[],
  footer: Footer,
}

const MyApp = ({ Component, pageProps }: AppProps<CustomPageProps>) => {
  const globalData = {
    global: pageProps.global,
    leftNavs: pageProps.leftNavs,
    rightNavs: pageProps.rightNavs,
    langs: pageProps.langs,
    footer: pageProps.footer,
  }

  // Hide splash screen shen we are server side 
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loader = document.getElementById('globalLoader');
      if (loader)
        loader.style.display = 'none';
    }
  }, []);

  return (
    <>
      <MediaQueryProvider>
        <GlobalDataProvider globalData={globalData}>
          <Loader />
          <Component {...pageProps} />
        </GlobalDataProvider>
      </MediaQueryProvider>
    </>
  );
};
// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (context: AppContext) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(context);
  const locale = context.router.locale;

  // Run API calls in parallel
  const [globalRes, leftNavsRes, rightNavsRes, langRes, footerRes] = await Promise.all([
    fetchAPI<GlobalData>("/global-data", {
      populate: {
        defaultSeo: {
          populate: { shareImage: { populate: "*" } }
        },
        logo: { populate: "*" },
      }
    }),
    fetchAPI<Navs[]>(`/left-navs`, { populate: "*", locale: locale }),
    fetchAPI<Navs[]>("/right-navs", { populate: "*", locale: locale }),
    fetchAPI<Lang[]>("/language-icons", { populate: "*" }),
    fetchAPI<Footer>("/footer", { populate: "*", locale: locale })
  ]);

  return {
    ...appProps, pageProps:
    {
      global: globalRes,
      leftNavs: leftNavsRes,
      rightNavs: rightNavsRes,
      langs: langRes,
      footer: footerRes,
    }
  };
};

export default MyApp;