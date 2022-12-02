import React, { useContext } from "react";
import Link from "next/link";
import { getStrapiMedia } from "../pages/api/media";
import { Navs } from "../types";
import LanguageSwitcher from './LanguageSwitcher';
import { useOnScroll } from '../hooks/useOnScroll'
import { GlobalDataContext } from "../context/GlobalDataContext";
import Image from "next/image";


const Nav = () => {
  const { global, leftNavs, rightNavs, langs } = useContext(GlobalDataContext);

  const logoSrc = getStrapiMedia(global.attributes.logo)

  const scrolled = useOnScroll()

  return (
    <nav className={`flex justify-between items-center w-full h-[80px] fixed top-0 font-modernist text-3xl uppercase z-50 ${scrolled ? 'bg-black' : 'bg-transparent'}`}>
      <div className="flex flex-row justify-center py-3 container mx-auto opacity-100">
        <ul className="basis-2/4 flex items-center justify-end space-x-8 space-y-0">
          {leftNavs.map((category: Navs) => {
            return (
              <li key={category.id}>
                <Link href={`${category.attributes.link}`} prefetch={false}>
                  <a className="whitespace-nowrap opacity-70 hover:opacity-100 group text-primary transition-all duration-300 ease-in-out">
                    <span className="bg-left-bottom bg-gradient-to-r from-primary to-primary bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                      {category.attributes.name}
                    </span>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center justify-center basis-[250px]">
          <div className={`relative transition-all ease 
          ${scrolled ?
              'w-[70px] h-[70px]' :
              'w-[150px] h-[150px] pt-[40px] mx-[50px]'
            }
            `}>
            <Link href='/' prefetch={false}>
              <a className="opacity-70 hover:opacity-100">
                <div className="absolute left-0 right-0 w-full h-full">
                  <Image
                    alt="logo"
                    src={logoSrc}
                    layout='fill'
                    quality={100}
                    objectFit='cover'
                  />
                </div>
              </a>
            </Link>
          </div>
        </div>
        <div className="basis-2/4 flex items-center  justify-between">
          <ul className="flex items-center justify-start space-x-8 space-y-0">
            {rightNavs.map((category: Navs) => {
              return (
                <li key={category.id}>
                  <Link href={`${category.attributes.link}`} prefetch={false}>
                    <a className="whitespace-nowrap opacity-70 hover:opacity-100 group text-primary transition-all duration-300 ease-in-out">
                      <span className="bg-left-bottom bg-gradient-to-r from-primary to-primary bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                        {category.attributes.name}
                      </span>
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
          <LanguageSwitcher langs={langs} />
        </div>
      </div >
    </nav >

  )
};

export default Nav;