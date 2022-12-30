import Circles from "../../../public/circles.svg";
import Image from 'next/future/image';


export const ImgLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="mb-4">
        <Image
          alt="logoLoader"
          src="/logo.png"
          height={150}
          width={150}
          quality={100}
        />
      </div>
      <Circles />
    </div>
  );
}

