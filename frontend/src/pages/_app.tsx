
import React from 'react';
import App, { AppContext, AppProps } from "next/app";
import Head from "next/head";
import "../../styles/style.css";
import { createContext } from "react";
import { fetchAPI } from "./api/api";
import { getStrapiMedia } from "./api/media";
import { ApiGlobalGlobal } from "./api/schemas";

type TProps = Pick<AppProps, "Component" | "pageProps">

// Store Strapi Global object in context
export const GlobalContext = createContext({});

const MyApp = ({ Component, pageProps }: TProps) => {
  const { global } = pageProps;

  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href={getStrapiMedia(global.attributes.favicon)}
        />
      </Head>
      <GlobalContext.Provider value={global.attributes}>
        <Component {...pageProps} />
      </GlobalContext.Provider>
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
  const globalRes = await fetchAPI<ApiGlobalGlobal>("/global", {
    populate: {
      favicon: "*",
      defaultSeo: {
        populate: "*",
      },
    },
  });
  // Pass the data to our page via props
  return { ...appProps, pageProps: { global: globalRes } };
};

export default MyApp;