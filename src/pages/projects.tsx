
import { fetchAPI } from './api/api';
import Layout from '../layouts/Layout';
import ImgBanner from '../components/ImgBanner';
import { ProjectsPage } from '../types/pages';
import { InstagramFeedType } from '../types';
import Seo from '../components/Seo';
import InstagramFeed from '../components/InstagramFeed';
import { fetchInstagram } from './api/instagram';

type Props = {
  instagramFeed: InstagramFeedType,
  projects: ProjectsPage,
}

const Projects = ({ instagramFeed, projects }: Props) => {
  const images = instagramFeed.data;

  const { mediaBanner, seo } = projects.attributes;

  return (
    <Layout>
      <Seo />
      <ImgBanner src={mediaBanner} />
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
