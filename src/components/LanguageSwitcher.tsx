import { useRef, useState } from 'react'
import Link from 'next/link'
import { getCloudinaryMedia } from "../pages/api/media";
import { useRouter } from 'next/router';
import useOnClickOutside from "../hooks/useOnClickOutside";
import { Lang } from '@projectTypes/components';
import { CldImage } from 'next-cloudinary';

type Props = {
  langs: Lang[],
}

function LanguageSwitcher({ langs }: Props) {

  const [openSwitcher, setOpenSwitcher] = useState(false);
  const { locale, asPath } = useRouter();

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);


  useOnClickOutside([dropdownRef, buttonRef], () => {
    setOpenSwitcher(false)
  })


  return (
    <div id='lang' className="relative ml-8">
      <div className={`flex items-center justify-center w-[35px] h-[35px] rounded-full bg-primary hover:opacity-100 ${openSwitcher ? 'opacity-100' : 'opacity-70'}`}>
        <button onClick={() => setOpenSwitcher(!openSwitcher)} ref={buttonRef} className="flex items-center">
          {langs.map((lang: Lang) => {
            return lang.attributes.slug === locale && (
              <CldImage
                key={lang.attributes.slug}
                width="25"
                height="25"
                src={getCloudinaryMedia(lang.attributes.icon)}
                format='svg'
                alt={`Switch to ${lang.attributes.name} language`}
                quality={100}
                priority
              />
            );
          })}
        </button>
      </div>
      <div className={`absolute rounded-xl shadow-lg w-[180px] right-[-18px] top-[60px] px-6 py-2 bg-black ${openSwitcher ? 'block' : 'hidden'}`} ref={dropdownRef}>
        {langs.map((lang: Lang) => {
          return lang.attributes.slug !== locale && (
            <Link href={`${asPath}`} locale={lang.attributes.slug} key={lang.attributes.slug}>
              <a onClick={() => setOpenSwitcher(!openSwitcher)}
                className="flex items-center justify-between whitespace-nowrap group transition-all duration-300 ease-in-out"
              >
                <span className="bg-left-bottom bg-gradient-to-r from-primary to-primary bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">{lang.attributes.name}</span>
                <CldImage
                  key={lang.attributes.slug}
                  width="25"
                  height="25"
                  src={getCloudinaryMedia(lang.attributes.icon)}
                  format='svg'
                  alt={`Switch to ${lang.attributes.name} language`}
                  quality={100}
                  priority
                />
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  )
}

export default LanguageSwitcher



