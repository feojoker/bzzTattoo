import { PhotoAndText } from '@projectTypes/components';
import Image from 'next/image';
import { getCloudinaryMedia, getStrapiMedia } from '../pages/api/media';


type Props = {
  data: PhotoAndText,
  scrollAnchor?: string,
}


function PhotoAndText({ data, scrollAnchor }: Props) {

  const { title, subTitle, longText, image } = data;

  return (
    <div
      id={scrollAnchor && scrollAnchor}
      className='container mx-auto grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8'
    >
      <h1 className='text-7xl text-right tracking-widest whitespace-pre-wrap'>
        {title}
      </h1>
      <h2 className='text-5xl font-garamond font-bold self-end ml-auto italic lg:ml-0 lg:non-italic'>
        {subTitle}
      </h2>
      <div className='relative h-[400px] sm:h-[500px] md:h-[600px]'>
        <Image
          alt="Image near from text"
          src={getCloudinaryMedia(image)}
          // quality={100}
          layout="fill"
          objectFit='cover'
        />
      </div>
      <div className='text-2xl font-garamond whitespace-pre-line pl-10 border-l-2 border-primary'>
        {longText}
      </div>
    </div>
  )
}

export default PhotoAndText



