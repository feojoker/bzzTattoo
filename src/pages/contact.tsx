
import React, { useContext } from 'react';
import { GlobalData, Lang, Navs } from '../types';
import { fetchAPI } from './api/api';
import Layout from '../layouts/Layout';
import FormEmail from '../components/FormEmail';
import GoogleMaps from '../components/Map';
import ImgBanner from '../components/ImgBanner';
import { MediaQueryContext } from '../context/MediaQueryContext';
import { ContactPage } from '../types/pages';

type Props = {
  leftNavs: Navs[],
  rightNavs: Navs[],
  globalLogo: GlobalData,
  langs: Lang[],
  contact: ContactPage
}


const Contact = ({ leftNavs, rightNavs, globalLogo, langs, contact }: Props) => {
  const isDesktopMedia = useContext(MediaQueryContext);

  const formData = contact.attributes.formEmail;

  return (
    <Layout rightNavs={rightNavs} leftNavs={leftNavs} globalLogo={globalLogo} langs={langs} >
      <ImgBanner src={contact.attributes.imageBanner} />
      <div className={`bg-black h-[600px]  
      ${isDesktopMedia
          ? 'h-[80px]'
          : 'h-[50px]'
        }
        `}></div>
      <div className="bg-secondary h-[600px]">
        <div className='flex items-center justify-between h-full'>
          <div className='relative flex flex-col items-center text-center w-[50vw] h-full' >
            <GoogleMaps />
          </div>
          <div className='w-[50vw] text-xl font-regular whitespace-pre-line p-8'>
            <FormEmail data={formData} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps({ locale }: { locale: string }) {

  // Run API calls in parallel
  const [leftNavsRes, rightNavsRes, globalLogoRes, langsRes, contactRes] = await Promise.all([
    fetchAPI<Navs[]>(`/left-navs`, { populate: "*", locale: locale }),
    fetchAPI<Navs[]>("/right-navs", { populate: "*", locale: locale }),
    fetchAPI<GlobalData>("/global-data", {
      populate: {
        logo: "*",
      },
    }),
    fetchAPI<Lang[]>("/language-icons", { populate: "*" }),
    fetchAPI<ContactPage>("/contact-page", {
      populate: "*"
    }),
  ]);

  return {
    props: {
      leftNavs: leftNavsRes,
      rightNavs: rightNavsRes,
      globalLogo: globalLogoRes,
      langs: langsRes,
      contact: contactRes,
    },
    revalidate: 1,
  };
}

export default Contact;
