import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";

export const MapWrapper = withScriptjs(
  withGoogleMap((props) => {
    // console.log(props);
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
        {props.schedulesLocation &&
          props.schedulesLocation
            .filter((s) => s?.completionStatus !== "missed")

            .filter((s) => s?.completionStatus !== "cancelled")
            .map((schedule) => (
              <Marker
                icon={
                  schedule?.completionStatus === "completed"
                    ? "/assets/images/green_map_marker_icon.svg"
                    : "/assets/images/red_map_marker_icon.svg"
                }
                position={{
                  lat: Number(schedule?.lat),
                  lng: Number(schedule?.long),
                }}
                onClick={() => {
                  props.openInfo(true, schedule?._id);
                }}
                key={schedule?._id}
              >
                {props.isOpen && props.markerId === schedule?._id ? (
                  <InfoWindow onCloseClick={() => props.openInfo(false)}>
                    <div>
                      <h4>Pick Up Request</h4>
                      <h5 style={{ color: "#008001" }}>Client Name</h5>
                      <h5>{schedule?.scheduleCreator}</h5>
                      <h5 style={{ color: "#008001" }}>Phone Number</h5>
                      <h5>{schedule?.phone}</h5>
                      <h5 style={{ color: "#008001" }}>Category</h5>
                      <h5>{schedule.Category}</h5>
                      <h5 style={{ color: "#008001" }}>
                        {schedule?.completionStatus === "completed"
                          ? "Quantity"
                          : "Number Of Bags"}
                      </h5>
                      <h5>
                        {schedule?.quantity}
                        {schedule?.completionStatus === "completed"
                          ? "KG"
                          : " Bags"}
                      </h5>
                      <h5 style={{ color: "#008001" }}>Address</h5>
                      <h5>{schedule.address}</h5>
                      <h5 style={{ color: "#008001" }}>Status</h5>
                      <h5>
                        {schedule?.completionStatus === "completed"
                          ? "Completed"
                          : [
                              schedule?.completionStatus === "missed"
                                ? "Missed"
                                : schedule?.completionStatus === "cancelled"
                                ? "Cancelled"
                                : "Pending",
                            ]}
                      </h5>
                      <h5 style={{ color: "#008001" }}>Call On Arrival</h5>
                      <h5>{schedule.phone}</h5>

                      <h5 style={{ color: "#008001" }}>Date</h5>
                      <h5>{schedule.pickUpDate.slice(0, 10)}</h5>
                    </div>
                  </InfoWindow>
                ) : (
                  ""
                )}
              </Marker>
            ))}
      </GoogleMap>
    );
  })
);
