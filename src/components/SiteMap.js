import React from "react";
import {
  MapContainer,
  ImageOverlay,
  LayersControl,
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";
import { useState, useEffect } from "react";
import PostMarker from "./postMarker";
import "leaflet/dist/leaflet.css";
import SiteMarkers from "./SiteMarkers";
import L, { latLng } from "leaflet";
import pinIcon from "../assets/DefaultPin.svg";
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  SubMenu,
} from "react-pro-sidebar";

const SiteMap = ({
  projectDetails,
  currFloor,
  floorImage,
  setNewMarkers,
  newmarkers,
  user,
}) => {
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
  }, [floorImage, newmarkers]);

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
          currFloor={currFloor}
          newmarkers={newmarkers}
        />
        <PostMarker
          currFloor={currFloor}
          setNewMarkers={setNewMarkers}
          projectName={projectDetails.project[0].collection}
          user={user}
        />
      </MapContainer>
    </main>
  ) : null;
};

export default SiteMap;
