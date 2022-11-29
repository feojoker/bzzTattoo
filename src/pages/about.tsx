
import React from 'react';
import { fetchAPI } from './api/api';
import Layout from '../layouts/Layout';
import { AboutPage } from '../types/pages';
// import VideoBanner from '../components/VideoBanner';
import Seo from '../components/Seo';
import PhotoAndText from '../components/PhotoAndText';
import { Loader } from '../components/Loader';
import dynamic from 'next/dynamic';

const VideoBanner = dynamic(() => import('../components/VideoBanner'), { loading: () => <Loader /> })

const About = ({ about }: { about: AboutPage }) => {
  const { mediaBanner, aboutDetail, seo } = about.attributes;
  const scrollAnchor = 'about';
  return (
    <Layout>
      <Seo seo={seo} />
      <VideoBanner src={mediaBanner} scrollAnchor={scrollAnchor} />
      <PhotoAndText data={aboutDetail} scrollAnchor={scrollAnchor} />
    </Layout>
  )
}

export async function getStaticProps({ locale }: { locale: string }) {

  const aboutRes = await fetchAPI<AboutPage>("/about-page", {
    populate: {
      mediaBanner: { populate: { media: "*" } },
      seo: { populate: "*" },
      aboutDetail: { populate: "*" }
    },
    locale: locale
  });

  return {
    props: {
      about: aboutRes,
    },
    revalidate: 1,
  };
}

export default About;
