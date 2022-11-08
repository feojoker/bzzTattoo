
import React from 'react';
import App, { AppContext, AppProps } from "next/app";
import Head from "next/head";
import "../../styles/style.css";
import { fetchAPI } from "./api/api";
import { getStrapiMedia } from "./api/media";
import { GlobalData } from "../types";
import { GlobalDataProvider } from "../context/GlobalDataContext";
import { MediaQueryProvider } from "../context/MediaQueryContext";
import { Loader } from '../components/Loader';

type TProps = Pick<AppProps, "Component" | "pageProps">


const MyApp = ({ Component, pageProps }: TProps) => {
  const global: GlobalData = pageProps.global;
  const faviconHref = getStrapiMedia(global.attributes.favicon)

  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href={faviconHref}
        />
      </Head>

      <MediaQueryProvider>
        <GlobalDataProvider globalData={global}>
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
  // Fetch global site settings from Strapi
  const globalRes = await fetchAPI<GlobalData>("/global-data", {
    populate: {
      defaultSeo: {
        populate: { shareImage: { populate: "*" } }
      },
      favicon: { populate: "*" },
      logo: { populate: "*" },
    }
  });
  // Pass the data to our page via props
  return { ...appProps, pageProps: { global: globalRes } };
};

export default MyApp;