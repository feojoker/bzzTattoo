import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getStrapiMedia } from "../pages/api/media";
import { Navs, GlobalData } from "../types";
import { useOnScroll } from "../hooks/useOnScroll";

type Props = {
  leftNavs: Navs[],
  rightNavs: Navs[],
  globalLogo: GlobalData
}

const MobileNav = ({ leftNavs, rightNavs, globalLogo }: Props) => {
  const logoSrc = getStrapiMedia(globalLogo.attributes.logo)

  const scrolled = useOnScroll()

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [menuOpen])

  return (
    <>
      <div className={`flex justify-between z-40 items-center w-full h-[50px] sticky top-0 bg-black ${scrolled ? 'bg-black' : 'bg-transparent'}`}>
        <Link href='/'>
          <a>
            <img className="w-[50px]" src={logoSrc} alt="logo" />
          </a>
        </Link>
        <div onClick={() => setMenuOpen(!menuOpen)}
          className={`fixed inset-0 z-20 bg-[rgba(255,255,255,.8)] transition-opacity ${menuOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}></div>
      </div>
      <div className={`fixed z-50 bg-black top-0 right-0 transition-all w-[calc(100%-50px)] max-w-[310px]  h-full ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute right-full bg-primary p-[5px]">
          <button
            className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
        <nav className="px-4">
          <ul>
            {leftNavs.map((category: Navs) => {
              return (
                <li key={category.id}>
                  <Link href={`/${category.attributes.slug}`}>
                    <a className="whitespace-nowrap">{category.attributes.name}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
          <ul>
            {rightNavs.map((category: Navs) => {
              return (
                <li key={category.id}>
                  <Link href={`/${category.attributes.slug}`}>
                    <a className="whitespace-nowrap">{category.attributes.name}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default MobileNav;