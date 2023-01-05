import { fetchAPI } from './api/api';
import Layout from "../layouts/Layout";
import Seo from "../components/Seo";
import { BriefInfo, InstagramFeedType } from "../types";
import { HomePage } from "../types/pages";

import BriefInfoWithLink from '../components/BriefInfoWithLink';
import FolowInstagram from '../components/FollowInstagram';
import { fetchInstagram } from './api/instagram';
import VideoBanner from '../components/VideoBanner';

type Props = {
  homepage: HomePage,
  briefAbout: BriefInfo,
  instagramFeed: InstagramFeedType,
}

const Home = ({ homepage, briefAbout, instagramFeed }: Props) => {
  const { seo, bannerText } = homepage.attributes;
  const images = instagramFeed.data;
  const scrollAnchor = 'home';

  const videoSrc = '/video/homepageVideo.mp4'

  return (
    <Layout>
      <Seo seo={seo} />
      <VideoBanner srcVideo={videoSrc} srcText={bannerText} scrollAnchor={scrollAnchor} />
      <BriefInfoWithLink data={briefAbout} scrollAnchor={scrollAnchor} />
      <FolowInstagram images={images} />
    </Layout>
  )
};

export async function getStaticProps({ locale }: { locale: string }) {

  // Run API calls in parallel
  const [homepageRes, briefAboutRes] = await Promise.all([
    fetchAPI<HomePage>("/homepage", {
      populate: {
        seo: { populate: "*" },
        bannerText: { populate: "*" },
      },
      locale: locale
    }),
    fetchAPI<BriefInfo>("/brief-about", { populate: "*", locale: locale }),
  ]);

  const instagramFeed = await fetchInstagram();

  return {
    props: {
      homepage: homepageRes,
      briefAbout: briefAboutRes,
      instagramFeed,
    },
  };
}

export default Home