import Link from 'next/link';
import Image from 'next/image';
import { NotFound } from "@projectTypes/pages";
import { LogoContext } from '../context/LogoContext';
import { useContext } from 'react';
import { getCloudinaryMedia } from '../pages/api/media';


function NotFoundComponent({ data }: { data: NotFound }) {
  const logo = useContext(LogoContext);
  const { title, description, buttonText } = data.attributes;

  return (
    <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-center px-5 text-gray-700">
      <div className="max-w-md">
        <p className="text-5xl font-dark font-bold">404</p>
        <h1 className="text-2xl md:text-3xl font-light leading-normal mb-4">
          {title}

        </h1>
        <h2 className="mb-8 text-lg font-garamond">{description}</h2>
        <Link href="/">
          <a className="font-garamond text-primary hover:text-white border border-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-lg px-5 py-2.5 text-center">{buttonText}</a>
        </Link>
      </div>
      <div className="md:ml-20 md:mt-0">
        <Image
          alt="Logo showing on 404"
          src={getCloudinaryMedia(logo)}
          height={200}
          width={200}
          priority
        />
      </div>
    </div>
  )
}

export default NotFoundComponent



