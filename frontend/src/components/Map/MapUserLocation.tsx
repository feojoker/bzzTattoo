import React, { Dispatch } from 'react'

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
      <img src="/directions.png" alt="directions" />
    </button>
  );
}

export default MapUserLocation


