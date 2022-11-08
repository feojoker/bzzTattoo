import { useCallback, useMemo, useRef, useState } from "react";
import { GoogleMap, useLoadScript, MarkerF, } from "@react-google-maps/api";
import mapStyles from "./mapStyles"
import { useRouter } from "next/router";
import MapUserLocation from "./MapUserLocation";
import MapDirectionsRenderer from "./MapDirectionsRenderer";
import { SvgLoader } from "../Loader/ImgLoader";


type Map = google.maps.Map;
type MapOptions = google.maps.MapOptions;
type LatLngLiteral = google.maps.LatLngLiteral;


export default function GoogleMaps() {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;


  if (googleMapsApiKey === undefined) {
    const { locale } = useRouter();
    const iframeLink = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2978.6468384980626!2d44.79472261539639!3d41.706559079236136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440deae469306d%3A0x1c64da3de2229d59!2sPortal%20tattoos%20%26%20piercing!5e0!3m2!1sru!2sge!4v1667550795855!5m2!1s${locale}!2sge`
    return (
      <iframe src={iframeLink} width="100%" height={500} style={{ border: 0, }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    );
  }
  return <Map googleMapsApiKey={googleMapsApiKey} />;
}


type Props = {
  googleMapsApiKey: string;
};

function Map({ googleMapsApiKey }: Props) {
  const mapRef = useRef<Map>();
  const onMapLoad = useCallback((map: Map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }: LatLngLiteral) => {
    mapRef.current?.panTo({ lat, lng });
  }, []);

  const setZoom = useCallback((num: number) => {
    mapRef.current?.setZoom(num);
  }, []);


  const [userLocation, setUserLocation] = useState<LatLngLiteral | undefined>();

  const center = useMemo<LatLngLiteral>(() => ({ lat: 41.706622514946055, lng: 44.79686802535099 }), []);
  const options = useMemo<MapOptions>(
    () => ({
      styles: mapStyles,
      disableDefaultUI: true,
      zoomControl: true,
      clickableIcons: false,
    }),
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey,
  });

  if (!isLoaded) return (
    <div className="absolute inset-0 flex justify-center items-center bg-black">
      <SvgLoader />
    </div>
  );


  return (
    <>
      <MapUserLocation location={userLocation} setLocation={setUserLocation} />
      <button
        className="center"
        onClick={() => {
          panTo({
            lat: 41.706622514946055,
            lng: 44.79686802535099,
          });
          setZoom(15);
        }}
      >
        <img src="/center1.png" alt="directions" />
      </button>
      <GoogleMap
        id="map"
        zoom={15}
        center={center}
        options={options}
        mapContainerClassName="w-full h-full"
        onLoad={onMapLoad}
      >
        <MarkerF position={center} />
        {userLocation && (
          <MapDirectionsRenderer
            origin={userLocation}
            destination={center}
            travelMode={google.maps.TravelMode.DRIVING}
          />
        )
        }
      </GoogleMap>
    </>
  );
}