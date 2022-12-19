import './App.css';
import { React, useState, useEffect } from "react";
import { getUser } from './api'
import { Sidebar, Menu, MenuItem, useProSidebar, SubMenu } from 'react-pro-sidebar';

function App() {
  const [user, setUser] = useState({'user': 'test_user', 'projects': ['project1', 'project2']});
  const [projectDetails, setProjectDetails] = useState({
    'project': 'project1',
    'props': [{'ground floor': 'url'}, {'first floor': 'url'}]
  });

  const [markers, setMarkers] = useState([]);
  const [location, setLocation] = useState('ground floor');
  const [isLoaded, setIsLoaded] = useState(false);
 
  const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } = useProSidebar();


  
  return (
    <div className="App">
      <header className="App-header">
        <p>Welcome {user.user}, you are on {projectDetails.project}/{location}</p>

      </header>

      <Sidebar>
        <Menu>
          <SubMenu label="Menu">
            <MenuItem> Projects </MenuItem>
              <SubMenu label='Projects'>
                 <MenuItem> Project 1 </MenuItem>
                 <MenuItem> Project 2 </MenuItem>
              </SubMenu>
            <MenuItem> Manager Dashboard </MenuItem>
            <MenuItem> Offilne mode </MenuItem>
            <MenuItem> Loguot </MenuItem>
          </SubMenu>
        
        </Menu>
      </Sidebar>
    </div>
  );
}

export default App;
