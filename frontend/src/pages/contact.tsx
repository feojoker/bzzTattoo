
import React from 'react';
import { GlobalData, Lang, Navs } from '../types';
import { fetchAPI } from './api/api';
import Layout from '../layouts/Layout';
import FormEmail from '../components/FormEmail';
import GoogleMaps from '../components/Map';

type Props = {
  leftNavs: Navs[],
  rightNavs: Navs[],
  globalLogo: GlobalData,
  langs: Lang[],
}


const Contact = ({ leftNavs, rightNavs, globalLogo, langs }: Props) => {
  return (
    <Layout rightNavs={rightNavs} leftNavs={leftNavs} globalLogo={globalLogo} langs={langs} >
      <div className='h-[100px]'></div>
      <div className="bg-black h-[600px]">
        <div className='flex items-center justify-between h-full'>
          <div className='relative flex flex-col items-center text-center w-[50vw] h-full' >
            <GoogleMaps />
          </div>
          <div className='w-[50vw] text-xl font-regular whitespace-pre-line p-8'>
            <FormEmail />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps({ locale }: { locale: string }) {

  // Run API calls in parallel
  const [leftNavsRes, rightNavsRes, globalLogoRes, langsRes] = await Promise.all([
    fetchAPI<Navs[]>(`/left-navs`, { populate: "*", locale: locale }),
    fetchAPI<Navs[]>("/right-navs", { populate: "*", locale: locale }),
    fetchAPI<GlobalData>("/global-data", {
      populate: {
        logo: "*",
      },
    }),
    fetchAPI<Lang[]>("/language-icons", { populate: "*" }),
  ]);

  return {
    props: {
      leftNavs: leftNavsRes,
      rightNavs: rightNavsRes,
      globalLogo: globalLogoRes,
      langs: langsRes,
    },
    revalidate: 1,
  };
}

export default Contact;
