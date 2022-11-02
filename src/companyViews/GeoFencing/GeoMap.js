import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Circle,
  InfoWindow,
} from "react-google-maps";

export const MapWrapper = withScriptjs(
  withGoogleMap((props) => {
    // console.log(props, "propssss");
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
        {props.collectorsLocation &&
          props.collectorsLocation.map((collect) => (
            <Marker
              icon={
                // collect.collectorStatus === "accept"
                "https://res.cloudinary.com/adebayo/image/upload/c_scale,h_35,w_40/v1597338533/ic_local_shipping_24px_fded0v_lroumx.png"
                // : "https://res.cloudinary.com/adebayo/image/upload/c_scale,h_35,w_40/v1597338494/ic_local_shipping_24px_uv4w4b_dpnsiq.png"
              }
              onClick={() => {
                props.openInfo(true, collect?._id);
              }}
              key={collect?._id}
              position={{ lat: Number(collect.lat), lng: Number(collect.long) }}
            >
              {props.isOpen && props.markerId === collect?._id ? (
                <InfoWindow onCloseClick={() => props.openInfo(false)}>
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
          ))}
        {/* {props.paths &&
          props.paths.map((cord) => ( */}
        {props?.coords &&
          props?.coords.map((coord) => (
            <Circle
              center={{
                lat: Number(parseFloat(coord?.lat)),
                lng: Number(parseFloat(coord?.lng)),
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
