import { DirectionsRenderer } from "@react-google-maps/api";
import { useEffect, useState } from "react";

type LatLngLiteral = google.maps.LatLngLiteral;
type TravelMode = google.maps.TravelMode;
type DirectionsResult = google.maps.DirectionsResult;

type Props = {
  origin: LatLngLiteral | null,
  destination: LatLngLiteral,
  travelMode: TravelMode,
}

export default function MapDirectionsRenderer({ origin, destination, travelMode }: Props) {
  const [directions, setDirections] = useState<DirectionsResult | undefined>();

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
          if (status === google.maps.DirectionsStatus.OK && result) {
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