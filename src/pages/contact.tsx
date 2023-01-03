import { fetchAPI } from './api/api';
import Layout from '../layouts/Layout';
import FormEmail from '../components/FormEmail';
import ImgBanner from '../components/ImgBanner';
import { ContactPage } from '../types/pages';
import Seo from '../components/Seo';
import { Loader } from '../components/Loader';
import dynamic from 'next/dynamic';
const GoogleMaps = dynamic(() => import('../components/Map'), { loading: () => <Loader /> })


const Contact = ({ contact }: { contact: ContactPage }) => {

  const { formEmail, mediaBanner, seo } = contact.attributes;

  return (
    <Layout>
      <Seo seo={seo} />
      <ImgBanner src={mediaBanner} />
      <div className="bg-secondary md:h-[700px]">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between md:h-full">
          <div className="relative flex flex-col items-center text-center h-[350px] w-full md:w-[50vw] md:h-full">
            <GoogleMaps />
          </div>
          <div className="text-xl font-regular whitespace-pre-line p-8 md:w-[50vw]">
            <FormEmail data={formEmail} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps({ locale }: { locale: string }) {

  const contactRes = await fetchAPI<ContactPage>("/contact-page", {
    populate: {
      mediaBanner: { populate: { media: "*" } },
      formEmail: "*",
      seo: "*",
    },
    locale: locale,
  });

  return {
    props: {
      contact: contactRes,
    },
  };
}

export default Contact;
