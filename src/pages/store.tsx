import { fetchAPI } from './api/api';
import Seo from '../components/Seo';
import NotFoundComponent from '../components/NotFoundComponent';
import { NotFound } from "../types/pages";


const Store = ({ store }: { store: NotFound }) => {

  const { title, description } = store.attributes;

  const seo = {
    metaTitle: title,
    metaDescription: description,
  };

  return (
    <div className="fullHeight w-screen flex items-center">
      <Seo seo={seo} />
      <NotFoundComponent data={store} />
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
