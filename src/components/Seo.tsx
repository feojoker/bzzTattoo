import Head from "next/head";
import { useRouter } from "next/router";
import { useContext } from "react";
import { DefaultSeoContext } from "../context/DefaultSeoContext";
import { getStrapiMedia } from "../pages/api/media";
import { Seo } from "../types";


const Seo = ({ seo }: { seo?: Seo }) => {
  const global = useContext(DefaultSeoContext);
  const { defaultSeo, siteName } = global.attributes

  const seoWithDefaults = {
    ...defaultSeo,
    ...seo,
  };

  const fullSeo = {
    ...seoWithDefaults,
    // Add title suffix
    metaTitle: `${seoWithDefaults.metaTitle} | ${siteName}`,
    // Get full image URL
    shareImage: getStrapiMedia(seoWithDefaults.shareImage),
  };

  const { locale, asPath } = useRouter();
  const url = "https://www.bzztattoo.com" + asPath;

  return (
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
      <meta name="theme-color" content="#000000" />
      {fullSeo.metaTitle && (
        <>
          <title>{fullSeo.metaTitle}</title>
          <meta property="og:title" content={fullSeo.metaTitle} />
          <meta name="twitter:title" content={fullSeo.metaTitle} />
        </>
      )}
      {fullSeo.metaDescription && (
        <>
          <meta name="description" content={fullSeo.metaDescription} />
          <meta property="og:description" content={fullSeo.metaDescription} />
          <meta name="twitter:description" content={fullSeo.metaDescription} />
        </>
      )}
      {fullSeo.shareImage && (
        <>
          <meta property="og:image" content={fullSeo.shareImage} />
          <meta name="twitter:image" content={fullSeo.shareImage} />
          <meta name="image" content={fullSeo.shareImage} />
        </>
      )}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={locale} />
      <meta property="og:url" content={url} />
      <meta name="twitter:site" content="@bzztattoo" />

    </Head>
  );
};

export default Seo;