import React from 'react';
import Image from 'next/image';
import blurDataUrlShimmer from '../helpers/blurDataUrlShimmer'

function InstagramFeed({ images }: { images: any }) {

  const filteredLastImages = images.filter((image: any) => image.media_type !== "VIDEO").slice(0, 16);

  return filteredLastImages && (
    <div className='bg-secondary'>
      <div className='grid grid-cols-4 gap-6 mx-auto py-6 max-w-6xl'>
        {filteredLastImages.map((image: any) => (
          <a key={image.id} href={image.permalink} target="_blank" rel="noreferrer">
            <div className='brightness-75 hover:filter-none transition duration-150'>
              <Image
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
            </div>
          </a>
        )
        )}
      </div>
    </div>
  )
}

export default InstagramFeed



