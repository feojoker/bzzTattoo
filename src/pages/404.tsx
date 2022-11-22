
import React, { useContext } from 'react';
import { fetchAPI } from './api/api';
import { NotFound } from "../types/pages";
import { getStrapiMedia } from './api/media';
import Seo from '../components/Seo';
import Link from 'next/link';
import { GlobalDataContext } from '../context/GlobalDataContext';


const Custom404Page = ({ notFound }: { notFound: NotFound }) => {

  const { global } = useContext(GlobalDataContext);
  const logoSrc = getStrapiMedia(global.attributes.logo)

  const seo = {
    metaTitle: notFound.attributes.title,
    metaDescription: notFound.attributes.description,
  };

  return (
    <div className="h-screen w-screen bg-black flex items-center">
      <Seo seo={seo} />
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
        <div className="max-w-md">
          <div className="text-5xl font-dark font-bold">404</div>
          <p
            className="text-2xl md:text-3xl font-light leading-normal"
          >Sorry this page is under construction. </p>
          <p className="mb-8">But dont worry, you can find plenty of other things on our homepage.</p>

          <Link href="/">
            <a className="text-primary hover:text-white border border-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center font-regular">back to homepage</a>
          </Link>
        </div>
        <div className="max-w-[200px] mt-20 md:ml-20 md:mt-0">
          <img src={logoSrc} alt="logo" />
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps({ locale }: { locale: string }) {

  const notFoundRes = await fetchAPI<NotFound>("/not-found", {
    populate: "*",
    locale: locale
  });

  return {
    props: {
      notFound: notFoundRes,
    },
  };
}

export default Custom404Page;
