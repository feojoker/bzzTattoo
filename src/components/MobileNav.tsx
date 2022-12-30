import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { Navs } from "../types";
import { useOnScroll } from "../hooks/useOnScroll";
import { GlobalDataContext } from "../context/GlobalDataContext";
import BurgerButton from "./Buttons/BurgerButton";
import MobileLanguageSwitcher from "./MobileLanguageSwitcher";
import Image from 'next/future/image';

const MobileNav = () => {
  const { leftNavs, rightNavs, langs } = useContext(GlobalDataContext);

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
        <div className={`transition-all ease 
          ${scrolled ?
            'w-[70px] h-[70px]' :
            'w-[90px] h-[90px] mt-[40px] ml-[10px]'
          }`}>
          <Link href='/'>
            <a className="opacity-70 hover:opacity-100">
              <Image
                alt="logoMobile"
                src="/logo.png"
                height={150}
                width={150}
                quality={100}
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
                  <Link href={`${category.attributes.link}`} rel="canonical">
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
                  <Link href={`${category.attributes.link}`} rel="canonical">
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