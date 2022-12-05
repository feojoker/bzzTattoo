import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { getStrapiMedia } from "../pages/api/media";
import { Navs } from "../types";
import { useOnScroll } from "../hooks/useOnScroll";
import { GlobalDataContext } from "../context/GlobalDataContext";
import BurgerButton from "./Buttons/BurgerButton";
import Image from "next/image";
import MobileLanguageSwitcher from "./MobileLanguageSwitcher";

const MobileNav = () => {
  const { global, leftNavs, rightNavs, langs } = useContext(GlobalDataContext);

  const logoSrc = getStrapiMedia(global.attributes.logo);

  const scrolled = useOnScroll();
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
      <div className={`fixed flex justify-between items-center w-full h-[80px] top-0  shadow-secondary z-50  ${scrolled && 'bg-black shadow'}`}>
        <div className={`relative transition-all ease 
          ${scrolled ?
            'w-[70px] h-[70px]' :
            'w-[100px] h-[100px] mt-[40px] ml-[20px]'
          }`}>
          <Link href='/'>
            <a className="opacity-70 hover:opacity-100">
              <Image
                alt="logo"
                src={logoSrc}
                layout='fill'
                quality={100}
                objectFit='cover'
              />
            </a>
          </Link>
        </div>
        <div onClick={() => setMenuOpen(!menuOpen)}
          className={`fixed inset-0 z-20 bg-[rgba(255,255,255,.8)] transition-opacity ${menuOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}></div>
      </div>
      <div className={`nav-container fixed z-50 bg-black top-0 right-0 transition-all w-[calc(100%-80px)] max-w-[310px]  h-full ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className={`absolute right-full p-[12px] ${menuOpen && 'bg-primary'}`}>
          <BurgerButton isOpen={menuOpen} setIsOpen={setMenuOpen} />
        </div>
        <nav className="font-modernist uppercase text-4xl px-4">
          <MobileLanguageSwitcher langs={langs} />
          <ul>
            {leftNavs.map((category: Navs) => {
              return (
                <li key={category.id} className="mb-2">
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
                <li key={category.id} className="mb-2">
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