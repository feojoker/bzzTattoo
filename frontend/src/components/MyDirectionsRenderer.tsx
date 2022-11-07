import { DirectionsRenderer } from "@react-google-maps/api";
import React from "react";
import { useEffect, useState } from "react";

export default function MyDirectionsRenderer(props) {
  const [directions, setDirections] = useState(undefined);
  const { origin, destination, travelMode } = props;

  useEffect(() => {
    const directionsService = new google.maps.DirectionsService();
    if (origin) {
      directionsService.route(
        {
          origin: new google.maps.LatLng(origin.lat, origin.lng),
          destination: new google.maps.LatLng(destination.lat, destination.lng),
          travelMode: travelMode
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    } else {
      setDirections(undefined)
    }
  }, [origin]);

  return (
    <DirectionsRenderer directions={directions} />
  );
}