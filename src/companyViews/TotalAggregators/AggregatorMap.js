import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";

export const MapWrapper = withScriptjs(
  withGoogleMap((props) => (
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
      {props.collectorsLocation &&
        props.collectorsLocation.map((collect) => {
          return (
            <Marker
              icon={
                collect.collectorStatus === "accept"
                  ? "/assets/images/green_map_marker_icon.svg"
                  : "/assets/images/red_map_marker_icon.svg"
              }
              position={{ lat: Number(collect.lat), lng: Number(collect.long) }}
              onClick={() => {
                props.openInfo(true, collect?._id);
              }}
              key={collect?._id}
              // position={{ lat: Number(collect.lat), lng: Number(collect.long) }}
            >
              {props.isOpen && props.markerId === collect?._id ? (
                <InfoWindow
                  onCloseClick={() => props.openInfo(false)}
                  key={collect._id}
                >
                  <div>
                    <h4>Aggregator Information</h4>
                    <h5 style={{ color: "#008001" }}>Aggregator ID</h5>
                    <h5>{}</h5>
                    <h5 style={{ color: "#008001" }}>Name</h5>
                    <h5>{collect.fullname}</h5>
                    <h5 style={{ color: "#008001" }}>Phone Number</h5>
                    <h5>{collect.phone}</h5>
                    {/* <h5 style={{ color: "#008001" }}>Email</h5>
                    <h5>{collect.email}</h5> */}
                    <h5 style={{ color: "#008001" }}>Organisation</h5>
                    <h5>{collect?.organisation}</h5>
                    <h5 style={{ color: "#008001" }}>Verified</h5>
                    <h5>
                      {collect.verified === true ? "Accepted" : "Pending"}
                    </h5>
                  </div>
                </InfoWindow>
              ) : (
                " "
              )}
            </Marker>
          );
        })}
    </GoogleMap>
  ))
);
