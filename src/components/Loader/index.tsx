import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ImgLoader } from "./ImgLoader";

export const Loader = () => {
  const router = useRouter();
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);

  useEffect(() => {
    const pathWithLocaleRelation = () => {
      let editedPath;
      const optionsPath = router.asPath === '/' ? '' : router.asPath;

      if (router.locale !== router.defaultLocale) {
        editedPath = '/' + router.locale + optionsPath;
      } else {
        editedPath = router.asPath;
      }
      return editedPath;
    }
    const handleRouteChange = (url: string) => (url !== pathWithLocaleRelation()) && setIsLoaderVisible(true);
    const handleRouteComplete = (url: string) => (url === pathWithLocaleRelation()) && setIsLoaderVisible(false);

    // here we subscribe to router change start and complete events
    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteComplete);
    router.events.on('routeChangeError', handleRouteComplete);

    // unsubscribing to router events when component unmounts to prevent memeory leaks
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeComplete", handleRouteComplete);
      router.events.on('routeChangeError', handleRouteComplete);
    };
  }, [router]);


  return isLoaderVisible ? (
    <div className="fullHeight w-screen fixed inset-0 flex justify-center items-center z-[9999] bg-black">
      <ImgLoader />
    </div >
  ) : null
};
