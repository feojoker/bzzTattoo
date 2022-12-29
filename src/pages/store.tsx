import { fetchAPI } from './api/api';
import { NotFound } from "../types/pages";
import Seo from '../components/Seo';
import Link from 'next/link';
import Logo from '../../public/logo.svg';


const Store = ({ store }: { store: NotFound }) => {

  const { title, description, buttonText } = store.attributes;


  const seo = {
    metaTitle: title,
    metaDescription: description,
  };

  return (
    <div className="fullHeight w-screen flex items-center">
      <Seo seo={seo} />
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-center px-5 text-gray-700">
        <div className="max-w-md">
          <div className="text-5xl font-dark font-bold">404</div>
          <p className="text-2xl md:text-3xl font-light leading-normal">{title}</p>
          <p className="mb-8">{description}</p>

          <Link href="/">
            <a className="text-primary hover:text-white border border-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center font-regular">{buttonText}</a>
          </Link>
        </div>
        <div className="max-w-[200px] md:ml-20 md:mt-0">
          <Logo className="h-[200px] w-[200px]" />
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps({ locale }: { locale: string }) {

  const storeRes = await fetchAPI<NotFound>("/store-page", {
    populate: "*",
    locale: locale
  });

  return {
    props: {
      store: storeRes,
    },
  };
}

export default Store;
