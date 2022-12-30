
import App, { AppContext, AppProps as NextAppProps } from "next/app";
import { fetchAPI } from "./api/api";
import { Footer, DefaultSeo, Lang, Navs } from "../types";
import { GlobalDataProvider } from "../context/GlobalDataContext";
import { MediaQueryProvider } from "../context/MediaQueryContext";
import { Loader } from '../components/Loader';
import "../../styles/style.css";
import "../../styles/fonts.css";
import { DefaultSeoProvider } from "../context/DefaultSeoContext";

type AppProps<P = any> = {
  pageProps: P;
} & Pick<NextAppProps<P>, "Component">;

type CustomPageProps = {
  defaultSeo: DefaultSeo,
  leftNavs: Navs[],
  rightNavs: Navs[],
  langs: Lang[],
  footer: Footer,
}

const MyApp = ({ Component, pageProps }: AppProps<CustomPageProps>) => {

  const { defaultSeo, leftNavs, rightNavs, langs, footer } = pageProps;
  const globalData = { leftNavs, rightNavs, langs, footer };
  console.log(langs)
  // const globalData = pageProps

  return (
    <>
      <MediaQueryProvider>
        <DefaultSeoProvider defaultSeo={defaultSeo}>
          <GlobalDataProvider globalData={globalData}>
            <Loader />
            <Component {...pageProps} />
          </GlobalDataProvider>
        </DefaultSeoProvider>
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
  const [defaultSeoRes, leftNavsRes, rightNavsRes, langRes, footerRes] = await Promise.all([
    fetchAPI<DefaultSeo>("/default-seo", {
      populate: {
        defaultSeo: {
          populate: { shareImage: { populate: "*" } }
        },
      },
      locale: locale
    }),
    fetchAPI<Navs[]>("/left-navs", { populate: "*", locale: locale }),
    fetchAPI<Navs[]>("/right-navs", { populate: "*", locale: locale }),
    fetchAPI<Lang[]>("/language-icons", { populate: "*" }),
    fetchAPI<Footer>("/footer", { populate: "*", locale: locale })
  ]);

  return {
    ...appProps, pageProps:
    {
      defaultSeo: defaultSeoRes,
      leftNavs: leftNavsRes,
      rightNavs: rightNavsRes,
      langs: langRes,
      footer: footerRes,
    }
  };
};

export default MyApp;

