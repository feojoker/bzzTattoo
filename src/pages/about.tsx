
import { fetchAPI } from './api/api';
import Layout from '../layouts/Layout';
import { AboutPage } from '../types/pages';
import VideoBanner from '../components/VideoBanner';
import Seo from '../components/Seo';
import PhotoAndText from '../components/PhotoAndText';

const About = ({ about }: { about: AboutPage }) => {
  const { bannerText, aboutDetail, seo } = about.attributes;
  const scrollAnchor = 'about';
  const videoSrc = '/video/aboutVideo.mp4'
  return (
    <Layout>
      <Seo seo={seo} />
      <VideoBanner srcVideo={videoSrc} srcText={bannerText} scrollAnchor={scrollAnchor} />
      <PhotoAndText data={aboutDetail} scrollAnchor={scrollAnchor} />
    </Layout>
  )
}

export async function getStaticProps({ locale }: { locale: string }) {

  const aboutRes = await fetchAPI<AboutPage>("/about-page", {
    populate: {
      bannerText: { populate: "*" },
      seo: { populate: "*" },
      aboutDetail: { populate: "*" }
    },
    locale: locale
  });

  return {
    props: {
      about: aboutRes,
    },
  };
}

export default About;
