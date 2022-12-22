import axios from "axios";

const beStructionApi = axios.create({
  baseURL: "https://struction-backend.cyclic.app/api",
});

export const getUser = (user) => {
  return beStructionApi.get("/users/" + user).then((res) => {
    return res.data.user;
  });
};
export const getProjectDetails = (projectName) => {
  return beStructionApi.get("/projects/" + projectName).then((res) => {
    return res.data.result;
  });
};
//set new marker and response with updated object of markers:
export const postMarker = (projectName, newPinBody, user) => {
  ///api/markers/:project_name'
  const markerBody = {};
  return beStructionApi.post("/markers/" + projectName, markerBody).then();
};

export const deleteMarker = (projectName, markerId) => {
  //: '/api/:project_name/:marker_id'
  return beStructionApi.delete(`/${projectName}/${markerId}`);
};

// response with updated array of markers
// req.body
// {
// "marcin-timestamp": {
// "id": "marcin-timestamp",
// "number": "updated number",
// "location": "ground floor",
// "locationOnDrawing": ["200", "400"],
// "materialsUsed": ["collar", "mastic"],
// "measurements": ["150", "150"],
// "service": ["pipe"],
// "completedBy": "username",
// "photos": ["url to photo 1", "url to photo 2"],
// "photos_after": ["url to photo 1", "url to photo 2"]
// }}

export const patchMarker = (projectName, markerId) => {
  const patchBody = {};
  return beStructionApi.patch(`/${projectName}/${markerId}`, patchBody).then();
};
