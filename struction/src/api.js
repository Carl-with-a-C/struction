// fs.read file for now. Will be replaced with axios when back end api is deployed.

import user from './DB/users.json';
import projectDetails from './DB/project1_details.json';
import projectMarkers from './DB/project1_markers.json';

export const getUser = () => {
    const object = JSON.parse(user)
    return object
};

