import { useEffect, useState } from 'react';
import Image from 'next/future/image';
import blurDataUrlShimmer from '../helpers/blurDataUrlShimmer';
import { CloudinaryInstagramImageType } from '../types';
import { CldImage } from 'next-cloudinary';


function FolowInstagram({ images }: { images: CloudinaryInstagramImageType[] }) {
  const [randomImage, setRandomImage] = useState<CloudinaryInstagramImageType[]>([])

  useEffect(() => {
    const filteredRandomImages = images
      // .filter((image: InstagramPostType) => image.media_type !== "VIDEO")
      .sort(() => 0.5 - Math.random()).slice(0, 6);
    setRandomImage(filteredRandomImages)
  }, [images])

  return (
    <div>
      <p className='text-center text-sm tracking-wider font-garamond py-6 border-t border-t-primary'>FOLLOW ME ON INSTAGRAM</p>
      <div className='relative'>
        <div className='grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-0'>
          {randomImage.map((image: CloudinaryInstagramImageType) => (
            <CldImage
              width="500"
              key={image.url}
              height="500"
              src={image.url}
              alt={image.context.caption || ''}
              objectFit='cover'
              placeholder='blur'
              blurDataURL={`data:image/svg+xml;base64,${blurDataUrlShimmer(300, 300)}`}
            />
          )
          )}
        </div>
        <a
          href="https://www.instagram.com/bzz.tattoo/"
          target="_blank"
          rel='noreferrer'
          className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] mx-auto text-center text-white border border-primary bg-primary text-lg px-5 py-2.5 font-garamond uppercase animate-pulse hover:animate-none"
        >
          bzz.tattoo
        </a>
      </div>
    </div>
  )
}

export default FolowInstagram



