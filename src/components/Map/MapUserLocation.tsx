import React, { Dispatch } from 'react';
import Image from "next/image";

type LatLngLiteral = google.maps.LatLngLiteral;

type Props = {
  location: LatLngLiteral | undefined,
  setLocation: Dispatch<LatLngLiteral | undefined>,
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
      <Image src="/directions.png" alt="directions" width={40} height={40} unoptimized />
    </button>
  );
}

export default MapUserLocation


