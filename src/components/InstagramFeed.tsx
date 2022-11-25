import React from 'react';

function InstagramFeed({ images }: { images: any }) {

  const filteredLastImages = images.filter((image: any) => image.media_type !== "VIDEO").slice(0, 16)


  return filteredLastImages && (
    <div className='bg-secondary'>
      <div className='grid grid-cols-4 gap-6 mx-auto py-6 max-w-6xl'>
        {filteredLastImages.map((image: any) => (
          <a key={image.id} href={image.permalink} target='_blank'>
            <img className='object-cover aspect-square brightness-75 hover:filter-none transition duration-150' src={image.media_url} alt={image.caption} />
          </a>
        )
        )}
      </div>
    </div>
  )
}

export default InstagramFeed



