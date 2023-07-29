import { getCloudinaryMedia } from "../pages/api/media";
import { MediaBanner } from "@projectTypes/components";
import Image from 'next/image';

type Props = {
  src: MediaBanner,
};

function ImgBanner({ src }: Props) {

  const { media, title, smallText } = src;

  return (
    <div className="relative font-garamond uppercase -z-20 h-[60vh] md:h-[80vh]">
      {title ? (
        <p className='
        absolute text-white z-10 whitespace-pre-wrap
        top-[35%] left-[5%] text-2xl 
        md:top-[20%] md:left-[10%] md:text-5xl
        '>
          {title}
        </p>
      ) : null}
      {smallText ? (
        <p className='
         absolute text-white z-10 whitespace-pre-wrap
         bottom-[10%] right-[5%] text-xs
         md:bottom-[5%] md:right-[10%] md:text-base
         '>
          {smallText}
        </p>
      ) : null}
      <Image
        className='absolute inset-0 object-cover h-full'
        alt="Large image banner on top of the page"
        src={getCloudinaryMedia(media)}
        quality={100}
        layout="fill"
        objectFit='cover'
        priority
      />
    </div>
  )
}

export default ImgBanner


