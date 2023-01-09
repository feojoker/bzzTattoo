import { getCloudinaryMedia, getStrapiMedia } from "../pages/api/media";
import { MediaBanner } from "../types";
import DoubleDown from '../../public/doubleDown.svg';
import { Link as ScrollLink } from 'react-scroll';

type Props = {
  src: MediaBanner,
  scrollAnchor: string,
}

function VideoBanner({ src, scrollAnchor }: Props) {

  const { media, title, smallText, poster } = src;

  const videoBannerSrc = getStrapiMedia(media);
  const posterSrc = getStrapiMedia(poster);

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
      <video
        className="absolute inset-0 bottom-0 object-cover w-full h-full z-5"
        poster={posterSrc ? posterSrc : ''}
        loop autoPlay muted playsInline>
        <source
          src={videoBannerSrc}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <ScrollLink to={scrollAnchor} spy={true} smooth={true} offset={-100} duration={500} >
        <DoubleDown className="w-[48px] h-[48px] animate-bounce absolute text-white text-center inset-x-0 mx-auto bottom-[5%] z-20 border hover:bg-primary hover:border-primary focus:ring-2 focus:outline-none focus:ring-primary rounded-full" />
      </ScrollLink>
    </div>
  )
}

export default VideoBanner



