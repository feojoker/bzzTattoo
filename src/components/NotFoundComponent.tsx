import Link from 'next/link';
import Image from 'next/future/image';
import { NotFound } from "../types/pages";


function NotFoundComponent({ data }: { data: NotFound }) {
  const { title, description, buttonText } = data.attributes;

  return (
    <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-center px-5 text-gray-700">
      <div className="max-w-md">
        <p className="text-5xl font-dark font-bold">404</p>
        <h1 className="text-2xl md:text-3xl font-light leading-normal">{title}</h1>
        <h2 className="mb-8">{description}</h2>
        <Link href="/">
          <a className="text-primary hover:text-white border border-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center font-regular">{buttonText}</a>
        </Link>
      </div>
      <div className="md:ml-20 md:mt-0">
        <Image
          alt="logo404"
          src="/logo.png"
          height={200}
          width={200}
          quality={100}
          priority
        />
      </div>
    </div>
  )
}

export default NotFoundComponent



