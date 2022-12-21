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

export const postMarker = (projectName, newPinBody, user) => {
  ///api/markers/:project_name'
  const markerBody = {};
  return beStructionApi.post("/markers/" + projectName, markerBody).then();
};

export const deleteMarker = (projectName, markerId) => {
  //: '/api/:project_name/:marker_id'
  return beStructionApi.delete(`/${projectName}/${markerId}`);
};

export const patchMarker = (projectName, markerId) => {
  const patchBody = {};
  return beStructionApi.patch(`/${projectName}/${markerId}`, patchBody).then();
};
