import { Fragment } from "react";
import { React, useState, useEffect } from "react";

import { Marker } from "react-leaflet";
import MarkerPopup from "./MarkerPopup";
import pinIcon from "../assets/DefaultPin.svg";
import L from "leaflet";

const SiteMarkers = ({ markersData, currFloor }) => {
  const [pins, setPins] = useState([]);
  const icon = L.icon({
    iconUrl: pinIcon,
    iconSize: [40, 46],
    iconAnchor: [20, 46],
  });

  useEffect(() => {
    const returnedPins = markersData.map((marker) => {
      if (marker.location === currFloor)
        return (
          <Marker
            key={marker.number}
            position={marker.locationOnDrawing}
            icon={icon}
            draggable={true}
            autoPan={true}
          >
            <MarkerPopup marker={marker} />
          </Marker>
        );
    });

    setPins(returnedPins);
  }, [currFloor]);

  return <Fragment>{pins}</Fragment>;
};

export default SiteMarkers;
