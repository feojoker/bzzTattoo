import Circles from "../../../public/circles.svg";
import Logo from '../../../public/logo.svg';


export const ImgLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="mb-4">
        <Logo className="h-[150px] w-[150px]" />
      </div>
      <Circles />
    </div>
  );
}

