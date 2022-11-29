import React from 'react';
import { fetchAPI } from './api/api';
import Layout from "../layouts/Layout";
import Seo from "../components/Seo";
import { BriefInfo } from "../types";
import { AboutPage, ContactPage, HomePage } from "../types/pages";
import VideoBanner from "../components/VideoBanner";
import BriefInfoWithLink from '../components/BriefInfoWithLink';
import PhotoAndText from '../components/PhotoAndText';
// import GoogleMaps from '../components/Map';
import FormEmail from '../components/FormEmail';
import dynamic from 'next/dynamic';
import { Loader } from '../components/Loader';

const GoogleMaps = dynamic(() => import('../components/Map'), { loading: () => <Loader /> })

type Props = {
  homepage: HomePage,
  briefAbout: BriefInfo
  about: AboutPage,
  contact: ContactPage,
}

const Home = ({ homepage, briefAbout, about, contact }: Props) => {
  const { seo, mediaBanner } = homepage.attributes;
  const { aboutDetail } = about.attributes;
  const { formEmail } = contact.attributes;

  const scrollAnchor = 'home';

  return (
    <Layout>
      <Seo seo={seo} />
      <VideoBanner src={mediaBanner} scrollAnchor={scrollAnchor} />
      <BriefInfoWithLink data={briefAbout} scrollAnchor={scrollAnchor} />
      <div className="bg-secondary h-[600px]">
        <div className='flex items-center justify-between h-full'>
          <div className='relative flex flex-col items-center text-center w-[50vw] h-full' >
            <GoogleMaps />
          </div>
          <div className='w-[50vw] text-xl font-regular whitespace-pre-line p-8'>
            <FormEmail data={formEmail} />
          </div>
        </div>
      </div>
      <PhotoAndText data={aboutDetail} />
    </Layout>
  )
};

export async function getStaticProps({ locale }: { locale: string }) {

  // Run API calls in parallel
  const [homepageRes, briefAboutRes, aboutDetailRes, contactFormRes] = await Promise.all([
    fetchAPI<HomePage>("/homepage", {
      populate: {
        seo: { populate: "*" },
        mediaBanner: { populate: { media: "*" } },
      },
    }),
    fetchAPI<BriefInfo>("/brief-about", { populate: "*", locale: locale }),
    fetchAPI<AboutPage>("/about-page", {
      populate: {
        aboutDetail: { populate: "*" }
      },
      locale: locale
    }),
    fetchAPI<ContactPage>("/contact-page", {
      populate: {
        formEmail: "*"
      },
      locale: locale
    })
  ]);

  return {
    props: {
      homepage: homepageRes,
      briefAbout: briefAboutRes,
      about: aboutDetailRes,
      contact: contactFormRes,
    },
    revalidate: 1,
  };
}

export default Home