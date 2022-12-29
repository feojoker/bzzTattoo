import { useContext } from "react";
import { GlobalDataContext } from "../../context/GlobalDataContext";
import { getStrapiMedia } from "../../pages/api/media";
import Image from 'next/future/image';
import Circles from "../../../public/circles.svg";


export const ImgLoader = () => {
  const { global } = useContext(GlobalDataContext);
  const logoHref = getStrapiMedia(global.attributes.logo);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="mb-4">
        <Image src={logoHref} alt="logoLoader" height={150} width={150} />
      </div>
      <Circles />
    </div>
  );
}

