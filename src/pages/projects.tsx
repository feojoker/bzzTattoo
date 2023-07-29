
import { fetchAPI } from './api/api';
import { fetchInstagram } from './api/instagram';
import { CloudinaryInstagramImageType } from '@projectTypes/components';
import { ProjectsPage } from '@projectTypes/pages';
import Layout from '@layouts/Layout';
import ImgBanner from '@components/ImgBanner';
import Seo from '@components/Seo';
import InstagramFeed from '@components/InstagramFeed';

type Props = {
  instagramFeed: CloudinaryInstagramImageType[],
  projects: ProjectsPage,
}

const Projects = ({ instagramFeed, projects }: Props) => {
  const { title, subtitle, mediaBanner, seo } = projects.attributes;
  return (
    <Layout>
      <Seo seo={seo} />
      <ImgBanner src={mediaBanner} />
      <InstagramFeed title={title} subtitle={subtitle} images={instagramFeed} />
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
  };
}

export default Projects;
