import { useContext, useEffect, useState } from "react";
import Image from 'next/image';
import Link from "next/link";
import { Navs } from "@projectTypes/components";
import LanguageSwitcher from './LanguageSwitcher';
import { GlobalDataContext } from "../context/GlobalDataContext";
import { LogoContext } from "../context/LogoContext";
import { getCloudinaryMedia } from "../pages/api/media";
import { useOnScroll } from '../hooks/useOnScroll'


const Nav = () => {
  const { leftNavs, rightNavs, langs } = useContext(GlobalDataContext);
  const logo = useContext(LogoContext);
  const [scrolledStyle, setScrolledStyle] = useState("");

  const scrolled = useOnScroll()
  useEffect(() => {
    if (scrolled) {
      setScrolledStyle("bg-black shadow")
    } else {
      setScrolledStyle("")
    }
  }, [scrolled])

  return (
    <nav className={`xl:text-3xl fixed flex justify-between items-center w-full h-[80px] top-0 font-modernist text-xl uppercase z-50 ${scrolledStyle}`}>
      <div className="container mx-auto flex flex-row justify-center py-3 px-12 opacity-100">
        <ul className="basis-2/4 flex items-center justify-end space-x-8 space-y-0">
          {leftNavs.map((category: Navs) => {
            return (
              <li key={category.id}>
                <Link href={`${category.attributes.link}`}>
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
        <div className="flex items-center justify-center basis-[170px] xl:basis-[250px]">
          <div className={`relative transition-all ease 
          ${scrolled ?
              'w-[70px] h-[70px]' :
              'w-[100px] h-[100px] mt-[30px] xl:w-[150px] xl:h-[150px] xl:mt-[80px] xl:mx-[50px]'
            }
            `}>
            <Link href='/'>
              <a className="absolute inset-0  opacity-70 hover:opacity-100">
                <span className="hidden">Link to homepage</span>
                <Image
                  alt="Logo showing on desktop nav"
                  src={getCloudinaryMedia(logo)}
                  layout='fill'
                  sizes="20vw"
                  priority
                />
              </a>
            </Link>
          </div>
        </div>
        <div className="basis-2/4 flex items-center justify-between">
          <ul className="flex items-center justify-start space-x-8 space-y-0">
            {rightNavs.map((category: Navs) => {
              return (
                <li key={category.id}>
                  <Link href={`${category.attributes.link}`}>
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