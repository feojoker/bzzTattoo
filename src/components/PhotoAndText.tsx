import { PhotoAndText } from '../types';
import ReactMarkdown from "react-markdown";
import Image from 'next/future/image';
import { getStrapiMedia } from '../pages/api/media';


type Props = {
  data: PhotoAndText,
  scrollAnchor?: string,
}


function PhotoAndText({ data, scrollAnchor }: Props) {

  const { title, subTitle, longText, image } = data;
  const imgSrc = getStrapiMedia(image);
  return (
    <div
      id={scrollAnchor && scrollAnchor}
      className='container mx-auto grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8'
    >
      <div className='justify-end'>
        <h1 className='text-7xl leading-9 text-right tracking-widest mr-auto lg:mx-auto whitespace-pre-wrap'>
          {title}
        </h1>
      </div>
      <p className='text-5xl font-garamond font-bold self-end ml-auto italic lg:ml-0 lg:non-italic'>
        {subTitle}
      </p>
      <div className='relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-auto'>
        <Image
          className='absolute inset-0 h-full object-cover'
          alt="img"
          src={imgSrc}
          height={1000}
          width={1000}
          quality={100}
        />
      </div>
      <div className='text-2xl font-garamond whitespace-pre-line pl-10 border-l-2 border-primary'>
        <ReactMarkdown>
          {longText}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default PhotoAndText



