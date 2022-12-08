import { PhotoAndText } from '../types';
import ReactMarkdown from "react-markdown";
import Image from 'next/image';
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
      className='container mx-auto grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-16 md:gap-y-8'>
      <h1 className='text-7xl text-right tracking-widest mr-auto md:mx-auto'>
        <ReactMarkdown>
          {title}
        </ReactMarkdown>
      </h1>
      <p className='text-5xl font-garamond font-bold self-end ml-auto italic md:ml-0 md:non-italic'>
        {subTitle}
      </p>
      <Image
        alt="img"
        src={imgSrc}
        height={1}
        width={1}
        layout='responsive'
        quality={100}
        objectFit='cover'
      />
      <div className='text-2xl font-garamond whitespace-pre-line pl-10 border-l-2 border-primary'>
        <ReactMarkdown>
          {longText}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default PhotoAndText



