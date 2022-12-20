import React from "react";
import { Popup } from "react-leaflet";

const MarkerPopup = ({ marker }) => {
  const { shortDescription } = marker;

  return (
    <Popup>
      <div className="popup-text">{shortDescription}</div>
    </Popup>
  );
};

export default MarkerPopup;
