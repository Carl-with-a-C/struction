// fs.read file for now. Will be replaced with axios when back end api is deployed.
import user from "./DB/users.json";
import projectDetails from "./DB/project1_details.json";
import projectMarkers from "./DB/project1_markers.json";

export const getUser = () => {
  //   const object = JSON.parse(user);
  return user;
};

export const getLocations = () => {
  const locations = projectDetails.props.locations.map(function (item) {
    return Object.keys(item);
  });
  return locations;
};
export const getMarkers = () => {
  return projectMarkers.props.markers;
};
