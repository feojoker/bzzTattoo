import React from 'react';
import type { NextPage } from 'next';
import Nav from '../components/Nav';
import { fetchAPI } from './api/api';
import { ApiLeftNavLeftNav, ApiRightNavRightNav, ApiGlobalGlobal } from './api/schemas';

const Home: NextPage = ({ leftNavs, rightNavs, logo }: any) => {
  return (
    <>
      <Nav rightNavs={rightNavs} leftNavs={leftNavs} logo={logo} />
      <div style={{ height: '1300px' }}>

      </div>
    </>
  )
};

export async function getStaticProps() {
  // Run API calls in parallel
  const leftNavsRes = await fetchAPI<ApiLeftNavLeftNav>("/left-navs", { populate: "*" });
  const rightNavsRes = await fetchAPI<ApiRightNavRightNav>("/right-navs", { populate: "*" });
  const logo = await fetchAPI<ApiGlobalGlobal>("/global", {
    populate: {
      favicon: "*",
    },
  });

  return {
    props: {
      leftNavs: leftNavsRes,
      rightNavs: rightNavsRes,
      logo: logo
    },
  };
}

export default Home