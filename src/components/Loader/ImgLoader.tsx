import Circles from "../../../public/circles.svg";
import Image from 'next/future/image';
import { getLocalLoader } from "../../helpers/imageLoaders";


export const ImgLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="mb-4">
        <Image
          loader={getLocalLoader}
          alt="Logo showing on loader"
          src="/logo.png"
          height={150}
          width={150}
          quality={100}
          priority
        />
      </div>
      <Circles />
    </div>
  );
}

