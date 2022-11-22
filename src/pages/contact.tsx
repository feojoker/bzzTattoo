
import React, { useContext } from 'react';
import { GlobalData, Lang, Navs } from '../types';
import { fetchAPI } from './api/api';
import Layout from '../layouts/Layout';
import FormEmail from '../components/FormEmail';
import GoogleMaps from '../components/Map';
import ImgBanner from '../components/ImgBanner';
import { MediaQueryContext } from '../context/MediaQueryContext';
import { ContactPage } from '../types/pages';

const Contact = ({ contact }: { contact: ContactPage }) => {
  const isDesktopMedia = useContext(MediaQueryContext);

  const formData = contact.attributes.formEmail;

  return (
    <Layout >
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

  const contactRes = await fetchAPI<ContactPage>("/contact-page", {
    populate: "*",
    locale: locale
  });

  return {
    props: {
      contact: contactRes,
    },
    revalidate: 1,
  };
}

export default Contact;
