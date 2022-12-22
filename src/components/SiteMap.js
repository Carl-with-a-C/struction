import React from "react";
import { MapContainer, ImageOverlay, LayersControl } from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import testMarkerData from "../DB/testData/testMarkerData.json";
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

  //Takes Floor data from testMarkerData -WILL CHANGE TO API DATA!!!

  //CURRENTLY - LOGIC SET FOR 2 FLOORS - NEED TO CREATE SOLUTION FOR MULTIPLE FLOORS

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
          //HARDCODED - needs to come from API
          url={floorImage}
          bounds={bounds}
        >
          {/* <button
            className="floorButton"
            onClick={() => {
              handleFloorBtnClick();
            }}
          >
            {currentFloor === 0
              ? `${currentFloorName} >`
              : `< ${currentFloorName}`}
          </button> */}

          {/* { <Sidebar className="floorButton">
            <Menu>
              { <SubMenu label="Select Floor">
                {floors.map((floor) => {
                  return (
                    <MenuItem
                      key={floor.floorURL}
                      label={floor.floorName}
                      value={floor}
                      onClick={(e) => {
                        handleFloorBtnClick(floor);
                      }}
                    >
                      {floor.floorName}
                    </MenuItem>
                  );
                })}
              </SubMenu> }
            </Menu>
          </Sidebar> } */}
        </ImageOverlay>
        <SiteMarkers markersData={testMarkerData} />
      </MapContainer>
    </main>
  ) : null;
};

export default SiteMap;
