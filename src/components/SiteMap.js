import React from "react";
import { MapContainer, ImageOverlay, LayersControl } from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import SiteMarkers from "./SiteMarkers";
import L, { latLng } from "leaflet";
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  SubMenu,
} from "react-pro-sidebar";

const SiteMap = ({ projectDetails, currFloor, floorImage }) => {
  const [bounds, setBounds] = useState([
    [0, 2600],
    [1740, 0],
  ]);
  useEffect(() => {
    const img = new Image();
    img.src = floorImage;
    //Commented out, works wrong
    //Picture gets resized differently on every upload, resulting in marker coordinates being wrong

    // img.onload = () => {
    //   setBounds([
    //     [0, img.width],
    //     [img.height, 0],
    //   ]);
    // };
    img.onerror = (err) => {
      console.log("img error");
      console.log(err);
    };
  }, [floorImage]);
  //Bounds need to be dynamically adjusted to size of image - TASK 1
  return floorImage ? (
    <main className="siteMap">
      <MapContainer
        zoomControl={false}
        className="map"
        crs={L.CRS.Simple}
        bounds={bounds}
        maxBounds={bounds}
        maxBoundsViscosity={0.95}
        zoom={0}
        minZoom={-3}
        maxZoom={1}
      >
        <ImageOverlay url={floorImage} bounds={bounds}></ImageOverlay>
        <SiteMarkers
          projectName={projectDetails.project[0].collection}
          markersData={projectDetails.project[1]}
          currFloor={currFloor}
        />
      </MapContainer>
    </main>
  ) : null;
};

export default SiteMap;
