import { useContext } from "react";
import { GlobalDataContext } from "../../context/GlobalDataContext";
import { getStrapiMedia } from "../../pages/api/media";
import Image from "next/image";

export const SvgLoader = () => {
  const { logo } = useContext(GlobalDataContext);
  const logoHref = getStrapiMedia(logo);

  return (
    <div className="flex flex-col items-center justify-center" style={{ width: '100px' }}>
      <img className="mb-4" src={logoHref} alt="logo" />
      <Image src="/circles.svg" height={30} width={30} />
    </div>
  );
}

