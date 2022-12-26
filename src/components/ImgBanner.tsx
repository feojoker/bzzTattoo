import { getStrapiMedia } from "../pages/api/media";
import { MediaBanner } from "../types";
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

type Props = {
  src: MediaBanner,
};

function ImgBanner({ src }: Props) {

  const { media, title, smallText } = src;
  const imgBannerSrc = getStrapiMedia(media);

  return (
    <div className="relative font-garamond uppercase -z-20 h-[60vh] md:h-[80vh]">
      {title ? (
        <ReactMarkdown className='
        absolute text-white z-10
        top-[35%] left-[5%] text-2xl 
        md:top-[20%] md:left-[10%] md:text-5xl
        '>
          {title}
        </ReactMarkdown>
      ) : null}
      {smallText ? (
        <ReactMarkdown className='
        absolute text-white z-10
         bottom-[10%] right-[5%] text-xs
         md:bottom-[5%] md:right-[10%] md:text-base
         '>
          {smallText}
        </ReactMarkdown>
      ) : null}
      <Image
        alt="imgBanner"
        src={imgBannerSrc}
        layout='fill'
        quality={100}
        objectFit='cover'
        priority
      />
    </div>
  )
}

export default ImgBanner


