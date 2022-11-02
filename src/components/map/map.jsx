import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";

import styled from "styled-components";

const Container = styled.div``;

const Row = styled.div``;

const Card = styled.div``;

const MapWrapper = withScriptjs(
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
    ></GoogleMap>
  ))
);
const Map = ({ mapHeight, MW = MapWrapper }) => {
  return (
    <>
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow border-0">
              <MW
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBGv53NEoMm3uPyA9U45ibSl3pOlqkHWN8&libraries=places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={
                  <div
                    style={{ height: `600px` }}
                    className="map-canvas"
                    id="map-canvas"
                  />
                }
                mapElement={
                  <div style={{ height: `100%`, borderRadius: "inherit" }} />
                }
              />
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};
export default Map;
