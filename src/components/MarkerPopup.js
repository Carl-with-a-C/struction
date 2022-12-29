import React from "react";
import { Popup } from "react-leaflet";

const MarkerPopup = ({ marker }) => {
  return (
    <Popup>
      <div className="popup-text">
        <div>id: {marker.id}</div>
        <div>Required service: {marker.service}</div>
        <div>Photos:{marker.photos}</div>
        <div>Photos after:{marker.photos_after}</div>
       {/* <div>
          Measuremenets:{" "}
          {marker.measurements.map((number) => {
            return number + " ";
          })} 
        </div>  */}
        <div>Completed by: {marker.completedBy}</div>
      </div>
    </Popup>
  );
};

export default MarkerPopup;
