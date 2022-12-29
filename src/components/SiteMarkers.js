import { Fragment } from "react";
import { React, useState, useEffect, useMemo, useRef } from "react";
import { patchMarker } from "../utils/api.js";
import { Marker } from "react-leaflet";
import MarkerPopup from "./MarkerPopup";
import pinIcon from "../assets/DefaultPin.svg";
import L from "leaflet";

const center = {
  lat: 51.505,
  lng: -0.09,
};


const SiteMarkers = ({ newmarkers, currFloor, projectName}) => {

  const [pins, setPins] = useState([]);
  const [activePin, setActivePin] = useState(null);
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);
  const icon = L.icon({
    iconUrl: pinIcon,
    iconSize: [40, 46],
    iconAnchor: [20, 46],
  });

  const eventHandlers = useMemo(
    () => ({
      dragend(e) {
          const cords = e.target.dragging._marker._latlng;
          let patch1 = e.target.options.value;
          patch1.locationOnDrawing[0] = cords.lat;
          patch1.locationOnDrawing[1] = cords.lng;
          let markerid = e.target.options.value.id;
          const patch = { [markerid]: patch1 };

          patchMarker(projectName, markerid, patch);

        }
      
    }),
    []
  );
  useEffect(() => {
    const returnedPins = newmarkers.map((marker) => {
      if (marker.location === currFloor)
        return (
          <Marker
            key={marker.id}
            position={marker.locationOnDrawing}
            icon={icon}
            value={marker}
            eventHandlers={eventHandlers}
            draggable={true}
            autoPan={false}
          >
            <MarkerPopup marker={marker} />
          </Marker>
        );
    });

    setPins(returnedPins);
 
  }, [currFloor,newmarkers]);

  return <Fragment>{pins}</Fragment>;
};

export default SiteMarkers;
