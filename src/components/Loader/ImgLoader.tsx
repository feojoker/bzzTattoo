import { useContext } from "react";
import { LogoContext } from "../../context/LogoContext";
import Image from 'next/image';
import { getCloudinaryMedia } from "../../pages/api/media";
import Circles from "../../../public/circles.svg";


export const ImgLoader = () => {
  const logo = useContext(LogoContext);
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="mb-4">
        <Image
          alt="Logo showing on loader"
          src={getCloudinaryMedia(logo)}
          height={150}
          width={150}
          priority
        />
      </div>
      <Circles />
    </div>
  );
}

