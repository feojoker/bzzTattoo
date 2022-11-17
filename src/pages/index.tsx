import React from 'react';
import { fetchAPI } from './api/api';
import Layout from "../layouts/Layout";
import Seo from "../components/Seo";
import { GlobalData, Homepage, Navs, Lang, BriefInfo } from "../types";
import VideoBanner from "../components/VideoBanner"
import BriefInfoWithLink from '../components/BriefInfoWithLink';

type Props = {
  homepage: Homepage,
  rightNavs: Navs[],
  leftNavs: Navs[],
  globalLogo: GlobalData,
  langs: Lang[],
  briefAbout: BriefInfo
}

const Home = ({ leftNavs, rightNavs, globalLogo, homepage, langs, briefAbout }: Props) => {

  return (
    <Layout rightNavs={rightNavs} leftNavs={leftNavs} globalLogo={globalLogo} langs={langs} >
      <Seo seo={homepage.attributes.seo} />
      <VideoBanner src={homepage.attributes.videoBanner} />
      <BriefInfoWithLink data={briefAbout} />
    </Layout>
  )
};

export async function getStaticProps({ locale }: { locale: string }) {

  // Run API calls in parallel
  const [leftNavsRes, rightNavsRes, globalLogoRes, homepageRes, langsRes, briefAboutRes] = await Promise.all([
    fetchAPI<Navs[]>(`/left-navs`, { populate: "*", locale: locale }),
    fetchAPI<Navs[]>("/right-navs", { populate: "*", locale: locale }),
    fetchAPI<GlobalData>("/global-data", {
      populate: {
        logo: "*",
      },
    }),
    fetchAPI<Homepage>("/homepage", {
      populate: {
        hero: "*",
        seo: { populate: "*" },
        videoBanner: "*"
      },
    }),
    fetchAPI<Lang[]>("/language-icons", { populate: "*" }),
    fetchAPI<BriefInfo>("/brief-about", { populate: "*", locale: locale }),
  ]);

  return {
    props: {
      leftNavs: leftNavsRes,
      rightNavs: rightNavsRes,
      globalLogo: globalLogoRes,
      homepage: homepageRes,
      langs: langsRes,
      briefAbout: briefAboutRes,
    },
    revalidate: 1,
  };
}

export default Home