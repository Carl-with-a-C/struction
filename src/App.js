import { React, useState, useEffect } from "react";
import { getUser, getProjectDetails } from "./utils/api";
import SiteMap from "./components/SiteMap";
import "leaflet/dist/leaflet.css";
import "./App.css";
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

  const [projectDetails, setProjectDetails] = useState();
  const [currentMarkers, setCurrentMarkers] = useState([]);
  const [arrLocationForButton, setArrLocationForButton] = useState();
  const [currLocation, setCurrLocation] = useState("ground floor");
  const [isLoaded, setIsLoaded] = useState(false);

  const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } =
    useProSidebar();

  useEffect(() => {
    //no authentication - no problem
    getUser("test_user").then((user) => {
      setUser(user);
      setIsLoaded(true);
    });
  }, [arrLocationForButton]);

  const changeLocation = (e) => {
    setCurrLocation(e.target.innerText);
    setCurrentMarkers(projectDetails.project[1]);
    console.log(projectDetails.project[1]);
  };
  const accessProjectDetails = (projectName) => {
    getProjectDetails(projectName).then((res) => {
      setProjectDetails(res);

      //deleting old stuff
      setCurrLocation("");
      setCurrentMarkers("");
      //creating new submenu for buttons
      setArrLocationForButton(
        res.project[0].props.locations.map((item) => {
          return Object.keys(item);
        })
      );
    });
  };
  if (isLoaded === false) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="App">
      <header className="App-header">
        {projectDetails ? (
          <p>
            Welcome {user.key}, you are on{" "}
            {projectDetails.project[0].collection}/{currLocation}
          </p>
        ) : (
          <p>Welcome {user.key}, choose your project</p>
        )}
      </header>

      <Sidebar>
        <Menu>
          <SubMenu label="Menu">
            <SubMenu label="Projects">
              {user.props.projects.map((project) => {
                return (
                  <MenuItem
                    onClick={() => accessProjectDetails(project)}
                    key={project}
                  >
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
