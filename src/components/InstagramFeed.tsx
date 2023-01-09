import Image from 'next/future/image';
import { InstagramPostType } from '../types';
import blurDataUrlShimmer from '../helpers/blurDataUrlShimmer';
import { getExternalLoader } from '../helpers/imageLoaders';


type Props = {
  title: string,
  subtitle: string,
  images: InstagramPostType[]
}

function InstagramFeed({ title, subtitle, images }: Props) {
  const filteredLastImages = images.filter((image: InstagramPostType) => image.media_type !== "VIDEO").slice(0, 16);

  return filteredLastImages && (
    <div className='bg-secondary '>
      <div className='container mx-auto'>
        <div className='hidden'>
          <h1 className='text-7xl tracking-widest whitespace-pre-wrap px-5 md:px-0'>
            {title}
          </h1>
          <h2 className='text-2xl font-garamond lg:ml-8'>{subtitle}</h2>
        </div>
        <div className='grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-6 mx-auto py-6 max-w-6xl'>
          {filteredLastImages.map((image: InstagramPostType) => (
            <a key={image.id} href={image.permalink} target="_blank" rel="noreferrer">
              <div className='brightness-75 hover:filter-none transition duration-150'>
                <Image
                  className="aspect-square object-cover"
                  loader={getExternalLoader}
                  src={image.media_url}
                  alt={image.caption}
                  height={400}
                  width={400}
                  quality={100}
                  placeholder="blur"
                  blurDataURL={`data:image/svg+xml;base64,${blurDataUrlShimmer(300, 300)}`}
                  unoptimized
                />
              </div>
            </a>
          )
          )}
        </div>
      </div>
    </div>
  )
}

export default InstagramFeed



