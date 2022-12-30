
import { fetchAPI } from './api/api';
import Seo from '../components/Seo';
import NotFoundComponent from '../components/NotFoundComponent';
import { NotFound } from "../types/pages";


const Custom404Page = ({ notFound }: { notFound: NotFound }) => {

  const { title, description, buttonText } = notFound.attributes;

  const seo = {
    metaTitle: title,
    metaDescription: description,
  };

  return (
    <div className="fullHeight w-screen flex items-center">
      <Seo seo={seo} />
      <NotFoundComponent data={notFound} />
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
