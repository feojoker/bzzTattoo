import { useRouter } from "next/router";
import React, { useState } from "react";
import { SvgLoader } from "./ImgLoader";

export const Loader = () => {
  const router = useRouter();
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);

  React.useEffect(() => {
    const handleRouteChange = (url: string) => (url !== router.asPath) && setIsLoaderVisible(true)

    const handleRouteComplete = (url: string) => (url === router.asPath) && setIsLoaderVisible(false)
    // here we subscribe to router change start and complete events
    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteComplete);
    router.events.on('routeChangeError', handleRouteComplete)

    // unsubscribing to router events when component unmounts to prevent memeory leaks
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeComplete", handleRouteComplete);
      router.events.on('routeChangeError', handleRouteComplete)
    };
  }, [router]);


  return isLoaderVisible ? (
    <div className="h-[100vh] w-[100vw] fixed inset-0 flex justify-center items-center z-[9999] bg-black">
      <SvgLoader />
    </div >
  ) : null
};