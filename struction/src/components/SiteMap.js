import React from "react";
import { MapContainer, ImageOverlay } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import testMarkerData from "../DB/testData/testMarkerData.json";
import SiteMarkers from "./SiteMarkers";

const SiteMap = () => {
  const L = window["L"];
  const bounds = [
    [-1000, -1000],
    [1000, 1000],
  ];

  return (
    <main className="siteMap">
      <MapContainer
        className="map"
        crs={L.CRS.Simple}
        bounds={bounds}
        zoom={0}
        minZoom={-3}
        maxZoom={1}
      >
        <ImageOverlay
          url="https://i.redd.it/zl10d502qw691.jpg"
          bounds={bounds}
        ></ImageOverlay>
        <SiteMarkers markersData={testMarkerData} />
      </MapContainer>
    </main>
  );
};

export default SiteMap;
