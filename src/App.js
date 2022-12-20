import "./App.css";

import { React, useState, useEffect } from "react";
import { getLocations, getMarkers, getUser } from "./api";
import SiteMap from "./components/SiteMap";
import "leaflet/dist/leaflet.css";
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  SubMenu,
} from "react-pro-sidebar";

function App() {
  const [user, setUser] = useState({
    key: "offline_user",
    props: {
      mail: "mail@gmail.com",
      role: "worker",
      password: "worker123",
      projects: ["project1", "project2"],
    },
  });

  const [projectDetails, setProjectDetails] = useState({
    project: "project1",
    props: [{ "ground floor": "url" }, { "first floor": "url" }],
  });
  //state for projects => locations => markers
  //so menu for locations only after project
  //after location markers appear
  const [markers, setMarkers] = useState([]);
  const [arrLocationForButton, setArrLocationForButton] = useState();
  const [currLocation, setCurrLocation] = useState("ground floor");
  const [isLoaded, setIsLoaded] = useState(false);

  const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } =
    useProSidebar();

  useEffect(() => {
    const userFromDb = getUser();
    setUser(userFromDb);
    setIsLoaded(true);
  }, [arrLocationForButton]);

  const changeLocation = (e) => {
    setCurrLocation(e.target.innerText);
    //same as one below
    setMarkers(getMarkers());
  };
  const getLocationsOfProject = () => {
    //logic to get specified locations by project?
    //Still not sure how it supposed to look in ready database, need example with multiple projects (2)
    setArrLocationForButton(getLocations());
  };
  if (isLoaded === false) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome {user.key}, you are on {projectDetails.project}/{currLocation}
        </p>
      </header>

      <Sidebar>
        <Menu>
          <SubMenu label="Menu">
            <SubMenu label="Projects">
              {user.props.projects.map((project) => {
                return (
                  <MenuItem onClick={getLocationsOfProject} key={project}>
                    {project}
                  </MenuItem>
                );
              })}
            </SubMenu>
            <MenuItem> Manager Dashboard </MenuItem>
            <MenuItem> Offilne mode </MenuItem>
            <MenuItem> Loguot </MenuItem>
          </SubMenu>
        </Menu>
        {arrLocationForButton ? (
          <Menu>
            <SubMenu label="Locations">
              {arrLocationForButton.map((item) => (
                <MenuItem key={item[0]} onClick={changeLocation}>
                  {item[0]}
                </MenuItem>
              ))}
            </SubMenu>
          </Menu>
        ) : null}
      </Sidebar>
      <SiteMap />
    </div>
  );
}

export default App;
