import React, { useContext } from 'react';
import { getStrapiMedia } from "../pages/api/media";
import { shareMedia } from "../types";
import { MediaQueryContext } from "../context/MediaQueryContext";
import Image from 'next/image';


type Props = {
  src: shareMedia,
};

function ImgBanner({ src }: Props) {

  const imgBannerSrc = getStrapiMedia(src);
  const isDesktopMedia = useContext(MediaQueryContext);

  return (
    <div className={`relative flex items-center justify-center w-full bg-black -z-20
     ${isDesktopMedia
        ? 'h-[80vh]'
        : 'h-[40vh]'
      }`}>
      {/* <div className={`absolute inset-x-0 bottom-0 opacity-60 bg-black w-full h-full 
      ${isDesktopMedia
          ? 'top-[-80px]'
          : 'top-[-50px]'
        }`}></div> */}
      <div className={`absolute inset-x-0 bottom-0 object-cover w-full h-full -z-10
          ${isDesktopMedia
          ? 'top-[-80px]'
          : 'top-[-50px]'
        }`}>
        <Image
          alt="imgBanner"
          src={imgBannerSrc}
          height={9}
          width={16}
          layout='responsive'
          quality={100}
          objectFit='cover'
        />
      </div>
    </div>
  )
}

export default ImgBanner


