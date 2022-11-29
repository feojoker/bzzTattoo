import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { getStrapiMedia } from "../pages/api/media";
import { useRouter } from 'next/router';
import useOnClickOutside from "../hooks/useOnClickOutside";
import { Lang } from '../types';
import Image from 'next/image';

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
            return lang.attributes.slug === locale ? (
              <Image
                alt="lang"
                key={lang.attributes.slug}
                src={getStrapiMedia(lang.attributes.icon)}
                height={25}
                width={25}
                quality={100}
              />
            ) : (null);
          })}
        </button>
      </div>
      <div className={`absolute rounded-xl shadow-lg w-[180px] right-[-18px] top-[60px] px-6 py-2 bg-black ${openSwitcher ? 'block' : 'hidden'}`} ref={dropdownRef}>
        {langs.map((lang: Lang) => {
          return lang.attributes.slug !== locale ? (
            <Link href={`${asPath}`} locale={lang.attributes.slug} key={lang.attributes.slug}>
              <a onClick={() => setOpenSwitcher(!openSwitcher)}
                className="flex items-center justify-between whitespace-nowrap"
              >
                <span>{lang.attributes.name}</span>
                <Image
                  alt="lang"
                  key={lang.attributes.slug}
                  src={getStrapiMedia(lang.attributes.icon)}
                  height={25}
                  width={25}
                  quality={100}
                />
              </a>
            </Link>
          ) : (null);
        })}
      </div>
    </div>
  )
}

export default LanguageSwitcher



