import { fetchAPI } from './api/api';
import { fetchInstagram } from './api/instagram';
import Layout from "@layouts/Layout";
import { HomePage } from "@projectTypes/pages";
import { BriefInfo, CloudinaryInstagramImageType } from "@projectTypes/components";
import Seo from "@components/Seo";
import BriefInfoWithLink from '@components/BriefInfoWithLink';
import FolowInstagram from '@components/FollowInstagram';
import VideoBanner from '@components/VideoBanner';

type Props = {
  homepage: HomePage,
  briefAbout: BriefInfo,
  instagramFeed: CloudinaryInstagramImageType[],
}

const Home = ({ homepage, briefAbout, instagramFeed }: Props) => {
  const { seo, mediaBanner } = homepage.attributes;
  const scrollAnchor = 'home';

  return (
    <Layout>
      <Seo seo={seo} />
      <VideoBanner src={mediaBanner} scrollAnchor={scrollAnchor} />
      <BriefInfoWithLink data={briefAbout} scrollAnchor={scrollAnchor} />
      <FolowInstagram images={instagramFeed} />
    </Layout>
  )
};

export async function getStaticProps({ locale }: { locale: string }) {
  const instagramFeed = await fetchInstagram();

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

  return {
    props: {
      homepage: homepageRes,
      briefAbout: briefAboutRes,
      instagramFeed,
    },
  };
}

export default Home