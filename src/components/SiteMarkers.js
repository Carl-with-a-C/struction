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

const SiteMarkers = ({ markersData, currFloor }) => {
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
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const cords = marker.getLatLng();
          let patch1 = markerRef.current.options.value;
          patch1.locationOnDrawing[0] = Math.floor(cords.lat).toString();
          patch1.locationOnDrawing[1] = Math.floor(cords.lng).toString();
          let markerid = markerRef.current.options.value.id;
          const patch = { [markerid]: patch1 };
          patchMarker(markerid, patch);
        }
      },
    }),
    []
  );
  useEffect(() => {
    const returnedPins = markersData.map((marker) => {
      if (marker.location === currFloor)
        return (
          <Marker
            key={marker.number}
            position={marker.locationOnDrawing}
            icon={icon}
            ref={markerRef}
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
  }, [currFloor]);

  return <Fragment>{pins}</Fragment>;
};

export default SiteMarkers;
