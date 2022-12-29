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
import PostMarker from "./postMarker"
import "leaflet/dist/leaflet.css";
import testMarkerData from "../DB/testData/testMarkerData.json";
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



const SiteMap = ({ projectDetails, currFloor, floorImage,setNewMarkers,newmarkers }) => {

 
  // const [currentFloor, setCurrentFloor] = useState(0);
  // let floorName = testMarkerData.markers[0].locations[currentFloor].floorName;
  // let floorURL = testMarkerData.markers[0].locations[currentFloor].floorURL;

  // const [floorImage, setFloorImage] = useState();
  const [bounds, setBounds] = useState([
    [0, 2600],
    [1740, 0],
  ]);
  useEffect(() => {
    const img = new Image();
    img.src = floorImage;

    img.onload = () => {
      setBounds([
        [0, img.width],
        [img.height, 0],
      ]);
    };
    img.onerror = (err) => {
      console.log("img error");
      console.log(err);
    };
  }, [floorImage]);


  const handleFloorBtnClick = (e) => {
    // For CLEAN FLOOR BUTTON TOGGLE
    // currentFloor === 0
    //   ? setCurrentFloor(currentFloor + 1)
    //   : setCurrentFloor(currentFloor - 1);
    // setFloorImage(e.floorURL);
  };

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
        <ImageOverlay
          url={floorImage}
          bounds={bounds}
        >
        </ImageOverlay>
        <SiteMarkers
          currFloor={currFloor}
          newmarkers={newmarkers}
        />
        <PostMarker currFloor={currFloor}
        setNewMarkers={setNewMarkers}/>
      </MapContainer>
    </main>
  ) : null;
};

export default SiteMap;
