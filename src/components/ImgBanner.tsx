import React, { useContext } from 'react';
import { getStrapiMedia } from "../pages/api/media";
import { MediaBanner } from "../types";
import { MediaQueryContext } from "../context/MediaQueryContext";
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';


type Props = {
  src: MediaBanner,
  aspectRatioH: number,
  aspectRatioW: number,
};

function ImgBanner({ src, aspectRatioH, aspectRatioW }: Props) {

  const { media, title, smallText } = src;

  const imgBannerSrc = getStrapiMedia(media);
  const isDesktopMedia = useContext(MediaQueryContext);

  return (

    <div className={`relative flex items-center justify-center bg-black -z-20
     ${isDesktopMedia
        ? 'h-[70vh]'
        : 'h-[40vh]'
      }`}>
      {title ? (
        <ReactMarkdown className='absolute top-[10%] left-[10%] text-white text-5xl z-10 font-garamond uppercase'>
          {title}
        </ReactMarkdown>
      ) : null}
      {smallText ? (
        <ReactMarkdown className='absolute bottom-[25%] right-[5%] text-white text-xl z-10 font-garamond uppercase'>
          {smallText}
        </ReactMarkdown>
      ) : null}
      <div className={
        `absolute inset-x-0 bottom-0 object-cover w-full h-full -z-10
        ${isDesktopMedia
          ? 'top-[-80px]'
          : 'top-[-50px]'
        }`}>
        <Image
          alt="imgBanner"
          src={imgBannerSrc}
          height={aspectRatioH}
          width={aspectRatioW}
          layout='fill'
          quality={100}
          objectFit='cover'
        />
      </div>
    </div>



  )
}

export default ImgBanner

