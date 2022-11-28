
import React from 'react';
import { fetchAPI } from './api/api';
import Layout from '../layouts/Layout';
import ImgBanner from '../components/ImgBanner';
import { MediaQueryContext } from '../context/MediaQueryContext';
import { ProjectsPage } from '../types/pages';
import Seo from '../components/Seo';
import ReactMarkdown from 'react-markdown';
import InstagramFeed from '../components/InstagramFeed';
import { fetchInstagram } from './api/instagram';

type Props = {
  instagramFeed: any,
  projects: ProjectsPage,
}

const Projects = ({ instagramFeed, projects }: Props) => {

  const images = instagramFeed.data;

  const { mediaBanner, seo } = projects.attributes;

  return (
    <Layout>
      <Seo />
      <ImgBanner src={mediaBanner} aspectRatioH={9} aspectRatioW={21} />
      <InstagramFeed images={images} />
    </Layout>
  )
}

export async function getStaticProps({ locale }: { locale: string }) {

  const instagramFeed = await fetchInstagram();

  const projectsRes = await fetchAPI<ProjectsPage>("/projects-page", {
    populate: {
      mediaBanner: { populate: { media: "*" } },
      seo: "*",
      buttonText: "*"
    },
    locale: locale
  });

  return {
    props: {
      instagramFeed,
      projects: projectsRes,
    },
    revalidate: 1,
  };
}

export default Projects;