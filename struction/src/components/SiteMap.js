import React from "react";
import { MapContainer, ImageOverlay } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import testMarkerData from "../DB/testData/testMarkerData.json";
import SiteMarkers from "./SiteMarkers";
import L from "leaflet";

const SiteMap = () => {
  // const L = window["L"];
  const bounds = [
    [0, 1000],
    [1000, 0],
  ];

  const mapSW = [0, 1000];
  const mapNE = [1000, 0];

  return (
    <main className="siteMap">
      <MapContainer
        zoomControl={false}
        className="map"
        crs={L.CRS.Simple}
        bounds={bounds}
        maxBounds={bounds}
        maxBoundsViscosity={0.9}
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
