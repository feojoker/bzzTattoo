import { PhotoAndText } from '../types';
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
      <h1 className='text-7xl text-right tracking-widest whitespace-pre-wrap'>
        <strong>
          {title}
        </strong>
      </h1>
      <h2 className='text-5xl font-garamond font-bold self-end ml-auto italic lg:ml-0 lg:non-italic'>
        {subTitle}
      </h2>
      <div className='relative h-[400px] sm:h-[500px] md:h-[600px]'>
        <Image
          className='absolute inset-0 h-full object-cover'
          alt="Image near from text"
          src={imgSrc}
          height={1000}
          width={1000}
          quality={100}
        />
      </div>
      <div className='text-2xl font-garamond whitespace-pre-line pl-10 border-l-2 border-primary'>
        {longText}
      </div>
    </div>
  )
}

export default PhotoAndText



