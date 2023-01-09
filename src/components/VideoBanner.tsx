import { getCloudinaryMedia, getStrapiMedia } from "../pages/api/media";
import { MediaBanner } from "../types";
import DoubleDown from '../../public/doubleDown.svg';
import { Link as ScrollLink } from 'react-scroll';

import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedVideo } from '@cloudinary/react';
import { quality } from "@cloudinary/transformation-builder-sdk/actions/delivery"

type Props = {
  src: MediaBanner,
  scrollAnchor: string,
}

function VideoBanner({ src, scrollAnchor }: Props) {

  const { media, title, smallText, poster } = src;
  const posterSrc = getStrapiMedia(poster);
  const videoSrc = getCloudinaryMedia(media);


  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    }
  });

  const cloudinaryVideo = cld.video(videoSrc).delivery(quality(100));


  return (
    <div className="relative font-garamond uppercase w-full mb-12 z-1 fullHeight">
      {title ? (
        <p className='
        absolute text-white z-20 whitespace-pre-wrap
        top-[25%] left-[5%] text-2xl 
        md:left-[10%] md:text-5xl
        '>
          <strong>
            {title}
          </strong>
        </p>
      ) : null}
      {smallText ? (
        <p className='
        absolute text-white z-20 whitespace-pre-wrap
        bottom-[20%] right-[5%] text-xs 
        md:bottom-[7%] md:right-[10%] md:text-sm
        '>
          {smallText}
        </p>
      ) : null}
      <div className="absolute inset-0 opacity-60 bg-black w-full h-full z-10"></div>
      <AdvancedVideo
        className="absolute inset-0 bottom-0 object-cover w-full h-full z-5"
        cldVid={cloudinaryVideo}
        autoPlay muted loop playsInline
        poster={posterSrc ? posterSrc : ''}
      />
      <ScrollLink to={scrollAnchor} spy={true} smooth={true} offset={-100} duration={500} >
        <DoubleDown className="w-[48px] h-[48px] animate-bounce absolute text-white text-center inset-x-0 mx-auto bottom-[5%] z-20 border hover:bg-primary hover:border-primary focus:ring-2 focus:outline-none focus:ring-primary rounded-full" />
      </ScrollLink>
    </div>
  )
}

export default VideoBanner

