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
  const { seo, mediaBanner } = homepage.attributes;
  const images = instagramFeed.results;
  const scrollAnchor = 'home';

  console.log(instagramFeed)

  return (
    <Layout>
      <Seo seo={seo} />
      <VideoBanner src={mediaBanner} scrollAnchor={scrollAnchor} />
      <BriefInfoWithLink data={briefAbout} scrollAnchor={scrollAnchor} />
      <FolowInstagram images={images} />
    </Layout>
  )
};

export async function getServerSideProps({ locale }: { locale: string }) {

  // Run API calls in parallel
  const [homepageRes, briefAboutRes] = await Promise.all([
    fetchAPI<HomePage>("/homepage", {
      populate: {
        seo: { populate: "*" },
        mediaBanner: { populate: { media: "*", poster: "*" } },
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