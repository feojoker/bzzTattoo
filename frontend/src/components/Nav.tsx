import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { getStrapiMedia } from "../pages/api/media";
import { Navs, Global } from "../types";


type Props = {
  leftNavs: Navs[],
  rightNavs: Navs[],
  logo: Global
}

const Nav = ({ leftNavs, rightNavs, logo }: Props) => {
  const logoLink = getStrapiMedia(logo.attributes.favicon)
  const [scrolled, setScrolled] = useState(false);

  const onScroll: EventListener = useCallback((event: Event) => {
    const win: Window = window;
    const { scrollY } = win;
    if (scrollY >= 10) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  }, []);

  useEffect(() => {
    const win: Window = window;
    //add eventlistener to window
    win.addEventListener("scroll", onScroll);
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`flex justify-between items-center md:block w-full h-[80px] sticky top-0 ${scrolled ? 'bg-black' : ''}`}>
      <div className="flex flex-row justify-center py-3 container mx-auto">
        <ul className="basis-2/4 flex items-center justify-end space-x-8 space-y-0">
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
        <div className="flex items-center justify-center basis-[200px] w-[200px]">
          <div className={`relative transition-all ease ${scrolled ? 'w-[80px]' : 'w-[200px]'}`}>
            <Link href='/'>
              <a>
                <img className="absolute top-[-35px] left-0" src={logoLink} alt="logo" />
              </a>
            </Link>
          </div>
        </div>
        <ul className="basis-2/4 flex items-center justify-start space-x-8 space-y-0">
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
      </div>
    </nav >
  )
};

export default Nav;