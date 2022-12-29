import { Dispatch, SetStateAction } from 'react';
import Image from 'next/future/image';

type LatLngLiteral = google.maps.LatLngLiteral | undefined;

type Props = {
  location: LatLngLiteral,
  setLocation: Dispatch<SetStateAction<LatLngLiteral>>,
}

function MapUserLocation({ location, setLocation }: Props) {
  return (
    <button
      className="locate"
      onClick={() => {
        if (!location) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLocation({ lat: position.coords.latitude, lng: position.coords.longitude })
            },
            () => null
          );
        } else {
          setLocation(undefined)
        }
      }}
    >
      <Image src="/mapButtons/directions.png" alt="directions" width={40} height={40} unoptimized />
    </button>
  );
}

export default MapUserLocation


