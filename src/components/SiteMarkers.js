import React, { Fragment } from "react";
import { Marker } from "react-leaflet";
// marker svg to be imported
import MarkerPopup from "./MarkerPopup";
import pinIcon from "../assets/DefaultPin.svg";
import L from "leaflet";

const SiteMarkers = ({ markersData }) => {
  const { markers } = markersData;
  const icon = L.icon({ iconUrl: pinIcon });
  console.log(Marker);
  const pins = markers.map((marker) => (
    <Marker
      key={marker.number}
      position={marker.locationOnDrawing}
      icon={icon}
      draggable={true}
      autoPan={true}
    >
      <MarkerPopup marker={marker} />
    </Marker>
  ));

  return <Fragment>{pins}</Fragment>;
};

export default SiteMarkers;
