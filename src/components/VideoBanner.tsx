import React, { useContext } from 'react';
import { getStrapiMedia } from "../pages/api/media";
import { shareMedia } from "../types";
import { MediaQueryContext } from "../context/MediaQueryContext";


type Props = {
  src: shareMedia,
};

function VideoBanner({ src }: Props) {

  const videoBannerSrc = getStrapiMedia(src);
  const isDesktopMedia = useContext(MediaQueryContext);

  return (
    <div className={`relative flex items-center justify-center w-full bg-black -z-20
     ${isDesktopMedia
        ? 'h-screen'
        : 'h-[40vh]'
      }`}>
      <div className={`absolute inset-x-0 bottom-0 opacity-60 bg-black w-full h-full 
      ${isDesktopMedia
          ? 'top-[-80px]'
          : 'top-[-50px]'
        }`}></div>
      <video className={
        `absolute inset-x-0 bottom-0 object-cover w-full h-full -z-10
        ${isDesktopMedia
          ? 'top-[-80px]'
          : 'top-[-50px]'
        }`}
        loop autoPlay muted>
        <source
          src={videoBannerSrc}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default VideoBanner



