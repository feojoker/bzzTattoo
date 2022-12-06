import React, { useContext } from 'react';
import { getStrapiMedia } from "../pages/api/media";
import { MediaBanner } from "../types";
import { MediaQueryContext } from "../context/MediaQueryContext";
import ReactMarkdown from "react-markdown";
import DoubleDown from '../../public/doubleDown.svg';
import { Link as ScrollLink } from 'react-scroll';

type Props = {
  src: MediaBanner,
  scrollAnchor: string,
}

function VideoBanner({ src, scrollAnchor }: Props) {

  const { media, title, smallText } = src;

  const videoBannerSrc = getStrapiMedia(media);
  const isDesktopMedia = useContext(MediaQueryContext);


  return (
    <div className={`
    relative w-full bg-black mb-12 z-1
     ${isDesktopMedia
        ? 'videoBannerHeight'
        : 'h-[40vh]'
      }`}>
      {title ? (
        <ReactMarkdown className='absolute top-[20%] left-[10%] text-white text-5xl z-20 font-garamond'>
          {title}
        </ReactMarkdown>
      ) : null}
      {smallText ? (
        <ReactMarkdown className='absolute bottom-[7%] right-[10%] text-white text-m z-20'>
          {smallText}
        </ReactMarkdown>
      ) : null}
      <div className="absolute inset-0 opacity-60 bg-black w-full h-full z-10"></div>
      <video
        className="absolute inset-0 bottom-0 object-cover w-full h-full z-5"
        loop autoPlay muted>
        <source
          src={videoBannerSrc}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <ScrollLink to={scrollAnchor} spy={true} smooth={true} offset={-100} duration={500} >
        <DoubleDown className="animate-bounce absolute text-white text-center inset-x-0 mx-auto bottom-[5%] z-20 border hover:bg-primary hover:border-primary focus:ring-2 focus:outline-none focus:ring-primary rounded-full" />
      </ScrollLink>
    </div>
  )
}

export default VideoBanner



