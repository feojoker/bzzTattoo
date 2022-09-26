import React from 'react';
import type { NextPage } from 'next';
import { fetchAPI } from './api/api';
import Layout from "../layouts/Layout";
import Seo from "../components/Seo";
import { Global, Homepage, Navs } from "../types";

type Props = {
  homepage: Homepage,
  rightNavs: Navs[],
  leftNavs: Navs[],
  logo: Global,
}

const Home = ({ leftNavs, rightNavs, logo, homepage }: Props) => {

  return (
    <Layout rightNavs={rightNavs} leftNavs={leftNavs} logo={logo} >
      <Seo seo={homepage.attributes.seo} />
      <div style={{ height: '1300px' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vitae felis velit. Pellentesque et sapien vel diam iaculis venenatis in eget diam. Fusce mollis erat eget dui porta porta sed et velit. Pellentesque et faucibus felis. Ut ac finibus urna. Suspendisse blandit in odio nec vestibulum. Aliquam ultricies consectetur sem eu pulvinar. Integer blandit, tortor accumsan pulvinar finibus, elit arcu imperdiet mauris, vitae volutpat arcu magna et urna. Cras a vulputate est, sit amet feugiat elit. Mauris mi ex, accumsan vitae semper non, pretium non orci. Duis aliquet, magna at congue faucibus, neque elit rhoncus dolor, non facilisis turpis enim sed ante. In nec venenatis odio. Pellentesque sagittis sed arcu ut interdum. Nulla suscipit vulputate tincidunt. Quisque non finibus sapien, ac ornare orci. Cras mollis tincidunt eros sodales pretium.

        Maecenas vel erat sem. Aenean pretium nisi lectus, non scelerisque dolor auctor et. Vivamus id nunc ullamcorper, ornare leo vel, cursus magna. Morbi sem lacus, efficitur non felis sed, posuere consectetur nisl. Integer id finibus sapien, quis feugiat dui. Aenean lacinia bibendum egestas. Sed volutpat dui vel scelerisque accumsan. In nec accumsan diam. Nulla et laoreet tortor, a imperdiet mauris. Aliquam erat volutpat. Curabitur id purus quis purus iaculis ultricies id in massa. Phasellus odio neque, efficitur vitae nisi eu, molestie aliquam diam.

        Nam venenatis, ante in pellentesque consequat, enim nunc molestie ligula, faucibus pretium purus odio sit amet felis. Nunc et efficitur arcu, sed ultricies felis. In ut laoreet diam, sit amet consectetur sem. Nunc lacus massa, varius a dolor ut, ullamcorper pharetra sapien. Curabitur feugiat et urna id gravida. Cras blandit nunc nec felis malesuada faucibus. Curabitur ullamcorper malesuada nunc, eu viverra enim luctus eu.

        Nullam et nibh volutpat, pellentesque enim sit amet, commodo velit. Proin gravida dui varius, vulputate purus ut, eleifend metus. Mauris facilisis congue lectus, non suscipit erat consequat eu. Morbi ullamcorper, quam id tristique cursus, ex erat posuere nibh, vel feugiat nisl augue id mi. In dapibus pharetra diam et dapibus. Ut hendrerit fermentum luctus. Etiam commodo ante pulvinar velit hendrerit, sit amet tincidunt sapien sollicitudin. Praesent tincidunt elit eget mollis placerat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.

        Suspendisse eget rutrum diam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer vel enim luctus, posuere odio eget, accumsan sem. Quisque id malesuada elit, gravida tristique nibh. Aliquam lectus ex, posuere vel pellentesque vitae, tincidunt sed tellus. Proin vestibulum orci in suscipit porttitor. Curabitur tellus turpis, mattis sed rhoncus quis, euismod at ipsum. Quisque id nunc nec neque semper ornare. Vivamus lacinia nisi libero, at ultricies est tempor et. Fusce eleifend ultricies ligula non ornare. Proin consectetur eu mauris sed euismod. Sed libero purus, blandit quis tincidunt vel, laoreet ac erat. Mauris sit amet sapien quis mi venenatis ultricies in bibendum erat. In ornare accumsan arcu ultricies lacinia.
      </div>
    </Layout>
  )
};

export async function getStaticProps() {
  // Run API calls in parallel

  const [leftNavsRes, rightNavsRes, logoRes, homepageRes] = await Promise.all([
    fetchAPI<Navs[]>("/left-navs", { populate: "*" }),
    fetchAPI<Navs[]>("/right-navs", { populate: "*" }),
    fetchAPI<Global>("/global", {
      populate: {
        favicon: "*",
      },
    }),
    fetchAPI<Homepage>("/homepage", {
      populate: {
        hero: "*",
        seo: { populate: "*" },
      },
    }),
  ]);

  return {
    props: {
      leftNavs: leftNavsRes,
      rightNavs: rightNavsRes,
      logo: logoRes,
      homepage: homepageRes,
    },
  };
}

export default Home