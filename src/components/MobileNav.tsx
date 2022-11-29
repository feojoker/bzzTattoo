import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { getStrapiMedia } from "../pages/api/media";
import { Navs } from "../types";
import { useOnScroll } from "../hooks/useOnScroll";
import { GlobalDataContext } from "../context/GlobalDataContext";
import Burger from "../../public/burger.svg"
import Close from "../../public/close.svg"

const MobileNav = () => {
  const { global, leftNavs, rightNavs, langs } = useContext(GlobalDataContext);

  const logoSrc = getStrapiMedia(global.attributes.logo);

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
      <div className={`flex justify-between items-center w-full h-[50px] fixed top-0 bg-black z-50  ${scrolled ? 'bg-black' : 'bg-transparent'}`}>
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
            {menuOpen ?
              (<Close />) :
              (<Burger />)
            }
          </button>
        </div>
        <nav className="px-4">
          <ul>
            {leftNavs.map((category: Navs) => {
              return (
                <li key={category.id}>
                  <Link href={`${category.attributes.link}`}>
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
                  <Link href={`${category.attributes.link}`}>
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