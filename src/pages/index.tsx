import React from 'react';
import { fetchAPI } from './api/api';
import Layout from "../layouts/Layout";
import Seo from "../components/Seo";
import { BriefInfo } from "../types";
import { HomePage } from "../types/pages";
import VideoBanner from "../components/VideoBanner";
import BriefInfoWithLink from '../components/BriefInfoWithLink';

type Props = {
  homepage: HomePage,
  briefAbout: BriefInfo
}

const Home = ({ homepage, briefAbout }: Props) => {

  const { seo, mediaBanner } = homepage.attributes;

  return (
    <Layout>
      <Seo seo={seo} />
      <VideoBanner src={mediaBanner} />
      <BriefInfoWithLink data={briefAbout} />
    </Layout>
  )
};

export async function getStaticProps({ locale }: { locale: string }) {

  // Run API calls in parallel
  const [homepageRes, briefAboutRes] = await Promise.all([
    fetchAPI<HomePage>("/homepage", {
      populate: {
        seo: { populate: "*" },
        mediaBanner: { populate: { media: "*" } },
      },
    }),
    fetchAPI<BriefInfo>("/brief-about", { populate: "*", locale: locale }),
  ]);

  return {
    props: {
      homepage: homepageRes,
      briefAbout: briefAboutRes,
    },
    revalidate: 1,
  };
}

export default Home