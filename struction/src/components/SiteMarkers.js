import React, { Fragment } from "react";
import { Marker } from "react-leaflet";
// marker svg to be imported
import MarkerPopup from "./MarkerPopup";
import pinIcon from "../assets/DefaultPin.svg";

const SiteMarkers = ({ markersData }) => {
  const { markers } = markersData;

  const pins = markers.map((marker) => (
    <Marker
      key={marker.number}
      position={marker.locationOnDrawing}
      iconUrl={pinIcon}
      draggable={true}
      autoPan={true}
    >
      <MarkerPopup marker={marker} />
    </Marker>
  ));

  return <Fragment>{pins}</Fragment>;
};

export default SiteMarkers;
