import "./App.css";
import { React, useState, useEffect } from "react";
import { getUser, getProjectDetails } from "./utils/api";
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
  const [projectDetails, setProjectDetails] = useState();
  const [arrFloorsForButton, setArrFloorsForButton] = useState();
  const [currFloor, setCurrFloor] = useState("ground floor");
  const [isLoaded, setIsLoaded] = useState(false);
  const [floorImage, setFloorImage] = useState();

  const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } =
    useProSidebar();

  useEffect(() => {
    getUser("test_user").then((user) => {
      setUser(user);
      setIsLoaded(true);
    });
  }, [arrFloorsForButton]);

  const changeLocation = (floorObject) => {
    // e.preventDefault();
    ///FLOOROBJECT = {FLOORnAME : URL}

    console.log(currFloor);
    setCurrFloor(Object.keys(floorObject)[0]);
    console.log(floorObject);
    setFloorImage(floorObject[currFloor]);

    // setFloorImage(projectDetails.project[0].props.locations[0][currFloor]);
    // console.log(projectDetails.project[0].props.locations[0][currFloor]);

    // //floors
    // console.log(projectDetails.project[0].props.locations);
    // //markers
    // console.log(projectDetails.project[1]);
  };
  const accessProjectDetails = (projectName) => {
    getProjectDetails(projectName).then((res) => {
      setProjectDetails(res);

      //deleting old stuff
      setCurrFloor("");
      //Getting a set of images for floors from projectDetails

      setArrFloorsForButton(
        res.project[0].props.locations.map((floorObject) => {
          // console.log(floorObject);
          return floorObject;
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
            {projectDetails.project[0].collection}/{currFloor}
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
        {arrFloorsForButton ? (
          <Menu>
            <SubMenu label="Locations">
              {arrFloorsForButton.map((floorObject) => {
                return (
                  //FLOOROBJECT = {FLOORnAME : URL}
                  <MenuItem
                    key={Object.keys(floorObject)[0]}
                    onClick={() => changeLocation(floorObject)}
                  >
                    {Object.keys(floorObject)[0]}
                  </MenuItem>
                );
              })}
            </SubMenu>
          </Menu>
        ) : null}
      </Sidebar>
      <SiteMap
        projectDetails={projectDetails}
        currFloor={currFloor}
        floorImage={floorImage}
      />
    </div>
  );
}

export default App;
