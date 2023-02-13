import '../css/Sidebar.css';

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function Sidebar() {
  return (
    <div className="sidebar-container">
      <div className="sidebar-items-container">
        <ul className="sidebar-items">
          <li><span className="sidebar-toggler">
              <ExpandMoreIcon />
            </span>{" "} 
            asList</li>
            
            
         
          <li><span className="sidebar-toggler">
              <ExpandMoreIcon />
            </span>{" "} Event</li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
