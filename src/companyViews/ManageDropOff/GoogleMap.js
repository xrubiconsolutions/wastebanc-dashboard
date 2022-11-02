import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Circle,
} from "react-google-maps";

export const MapWrapper = withScriptjs(
  withGoogleMap((props) => {
    return (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: 6.5244, lng: 3.3792 }}
        defaultOptions={{
          scrollwheel: false,
          styles: [
            {
              featureType: "administrative",
              elementType: "labels.text.fill",
              stylers: [{ color: "#444444" }],
            },
            {
              featureType: "landscape",
              elementType: "all",
              stylers: [{ color: "#f2f2f2" }],
            },
            {
              featureType: "poi",
              elementType: "all",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "road",
              elementType: "all",
              stylers: [{ saturation: -100 }, { lightness: 45 }],
            },
            {
              featureType: "road.highway",
              elementType: "all",
              stylers: [{ visibility: "simplified" }],
            },
            {
              featureType: "road.arterial",
              elementType: "labels.icon",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "transit",
              elementType: "all",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "water",
              elementType: "all",
              stylers: [{ color: "#5e72e4" }, { visibility: "on" }],
            },
          ],
        }}
      >
        {props?.dropOffLocation &&
          props?.dropOffLocation.map((coord) => (
            <Circle
              center={{
                lat: Number(parseFloat(coord?.location?.lat)),
                lng: Number(parseFloat(coord?.location?.long)),
              }}
              radius={3600}
              options={{
                fillOpacity: 0.1,
                strokeWidth: 1,
                strokeOpacity: 0.2,
                fillColor: "#c72d2d",
              }}
            />
          ))}
      </GoogleMap>
    );
  })
);
