import Link from 'next/link';
import { getStrapiMedia } from "../pages/api/media";
import { useRouter } from 'next/router';
import { Lang } from '../types';
import Image from 'next/future/image';

type Props = {
  langs: Lang[],
}

function MobileLanguageSwitcher({ langs }: Props) {
  const { locale, asPath } = useRouter();

  return (
    <div className="grid grid-cols-3 gap-x-3 justify-items-center items-center py-[22.5px]">
      {langs.map((lang: Lang) => {
        const isActiveLang = lang.attributes.slug === locale;
        return (
          <div key={lang.attributes.slug} className="relative flex items-center justify-center w-[35px] h-[35px] rounded-full bg-primary">
            {isActiveLang && (
              <div className='absolute inset-0 opacity-80 bg-black w-full h-full z-10'>
              </div>
            )}
            <Link href={`${asPath}`} locale={lang.attributes.slug} >
              <a className="flex items-center justify-between whitespace-nowrap">
                <Image
                  alt={`Switch to ${lang.attributes.name} language`}
                  key={lang.attributes.slug}
                  src={getStrapiMedia(lang.attributes.icon)}
                  height={25}
                  width={25}
                  quality={100}
                />
              </a>
            </Link>
          </div>
        );
      })}
    </div>

  )
}

export default MobileLanguageSwitcher



