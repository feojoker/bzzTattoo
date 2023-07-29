import Image from 'next/future/image';
import { CloudinaryInstagramImageType } from '@projectTypes/components';
import blurDataUrlShimmer from '../helpers/blurDataUrlShimmer';
import { getExternalLoader } from '../helpers/imageLoaders';
import { CldImage } from 'next-cloudinary';

type Props = {
  title: string,
  subtitle: string,
  // images: InstagramPostType[]
  images: CloudinaryInstagramImageType[]

}

function InstagramFeed({ title, subtitle, images }: Props) {

  return images && (
    <div className='bg-secondary '>
      <div className='container mx-auto'>
        <div className='hidden'>
          <h1 className='text-7xl tracking-widest whitespace-pre-wrap px-5 md:px-0'>
            {title}
          </h1>
          <h2 className='text-2xl font-garamond lg:ml-8'>{subtitle}</h2>
        </div>
        <div className='grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-6 mx-auto py-6 max-w-6xl'>
          {images.map((image: CloudinaryInstagramImageType) => (
            <a key={image.url} href={image.context?.link || ''} target="_blank" rel="noreferrer">
              <div className='brightness-75 hover:filter-none transition duration-150'>
                <CldImage
                  width="500"
                  height="500"
                  src={image.url}
                  alt={image.context?.caption || ''}
                  objectFit='cover'
                  placeholder='blur'
                  blurDataURL={`data:image/svg+xml;base64,${blurDataUrlShimmer(300, 300)}`}
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



