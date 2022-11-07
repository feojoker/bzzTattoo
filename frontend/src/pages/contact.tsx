
import React from 'react';
import MapWithForm from '../components/MapWithForm';
import Layout from '../layouts/Layout';
import { GlobalData, Lang, Navs } from '../types';
import { fetchAPI } from './api/api';

type Props = {
  leftNavs: Navs[],
  rightNavs: Navs[],
  globalLogo: GlobalData,
  langs: Lang[],
  // locale: string
}


const Contact = ({ leftNavs, rightNavs, globalLogo, langs }: Props) => {
  return (
    <Layout rightNavs={rightNavs} leftNavs={leftNavs} globalLogo={globalLogo} langs={langs} >
      <div className='h-[100px]'></div>
      <MapWithForm />
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
