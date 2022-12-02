import Image from 'next/image';
import blurDataUrlShimmer from '../helpers/blurDataUrlShimmer';
import { InstagramPostType } from '../types';


function FolowInstagram({ images }: { images: InstagramPostType[] }) {
  const filteredRandomImages = images.filter((image: InstagramPostType) => image.media_type !== "VIDEO").sort(() => 0.5 - Math.random()).slice(0, 6);

  return (
    <div>
      <h1 className='text-center text-sm tracking-wider font-garamond py-6 border-t border-t-primary'>FOLLOW ME ON INSTAGRAM</h1>
      <div className='relative'>
        <div className='grid grid-cols-6'>
          {filteredRandomImages.map((image: InstagramPostType) => (
            <Image
              key={image.id}
              src={image.media_url}
              alt={image.caption}
              height={300}
              width={300}
              quality={100}
              objectFit='cover'
              placeholder="blur"
              priority
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



