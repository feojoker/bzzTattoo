import React, { useContext } from 'react';
import { getStrapiMedia } from "../pages/api/media";
import { MediaBanner } from "../types";
import { MediaQueryContext } from "../context/MediaQueryContext";
import ReactMarkdown from "react-markdown";


function VideoBanner({ src }: { src: MediaBanner }) {

  const { media, title, smallText } = src;

  const videoBannerSrc = getStrapiMedia(media);
  const isDesktopMedia = useContext(MediaQueryContext);

  return (
    <div className={`relative flex items-center justify-center w-full bg-black -z-20
     ${isDesktopMedia
        ? 'h-screen'
        : 'h-[40vh]'
      }`}>
      {title ? (
        <ReactMarkdown className='absolute top-[10%] left-[10%] text-white text-5xl z-10 font-garamond'>
          {title}
        </ReactMarkdown>
      ) : null}
      {smallText ? (
        <ReactMarkdown className='absolute bottom-[15%] right-[5%] text-white text-m z-10'>
          {smallText}
        </ReactMarkdown>
      ) : null}
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



