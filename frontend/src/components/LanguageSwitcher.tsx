import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { getStrapiMedia } from "../pages/api/media";
import { useRouter } from 'next/router';
import useOnClickOutside from "../hooks/useOnClickOutside";
import { Lang } from '../types';

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
    <div id='lang' className="relative mr-8">
      <div className="flex items-center justify-center w-[35px] h-[35px] rounded-full bg-[#d2a200]">
        <button onClick={() => setOpenSwitcher(!openSwitcher)} ref={buttonRef}>
          {langs.map((lang: Lang) => {
            return lang.attributes.slug === locale ? (
              <img key={lang.attributes.slug} src={getStrapiMedia(lang.attributes.icon)} alt="logo" />
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
                <img className="" src={getStrapiMedia(lang.attributes.icon)} alt="logo" />
              </a>
            </Link>
          ) : (null);
        })}
      </div>
    </div>
  )
}

export default LanguageSwitcher



