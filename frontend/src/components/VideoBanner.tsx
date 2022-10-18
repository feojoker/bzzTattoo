import React, { useContext } from 'react'
import { useOnScroll } from '../hooks/useOnScroll';
import { getStrapiMedia } from "../pages/api/media";
import { shareMedia } from "../types";
import { MediaQueryContext } from "../context/MediaQueryContext";


type Props = {
  src: shareMedia,
}

function VideoBanner({ src }: Props) {

  const videoBannerSrc = getStrapiMedia(src)

  const scrolled = useOnScroll()
  const isDesktopMedia = useContext(MediaQueryContext);

  return (
    <div className={`relative flex items-center justify-center w-full ${isDesktopMedia ? 'h-[85vh]' : 'h-[40vh]'}`}>
      <video className={
        `absolute inset-x-0 bottom-0 object-cover w-full h-full -z-10 
        ${scrolled
          ? 'top-0'
          : isDesktopMedia
            ? 'top-[-80px]'
            : 'top-[-50px]'
        }`
      } loop autoPlay muted>
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



