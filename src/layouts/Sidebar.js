import "../css/Sidebar.css";
import { useContext } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import MailIcon from "@mui/icons-material/Mail";
import { Divider } from "@mui/material";
import { AppbarContext } from "../component/Layout.js";
import { sidebarItems } from "../component/constants/constant";
import { NavLink } from "react-router-dom";

function Sidebar(props) {
  const { window } = props;

  const { handleDrawerToggle, mobileOpen, drawerWidth } =
    useContext(AppbarContext);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <div style={{}}>
      <Toolbar />
      <Divider />
      <List>
        {sidebarItems.map((item, index) => (
          <ListItem
            key={item.label}
            disablePadding
            sx={{
              "& .active": {
                background:
                  "linear-gradient(45deg, #95c7ec 0%, #207cca 51%, #1e5799 100%)",
                color: "white",
              },
            }}
          >
            <ListItemButton component={NavLink} to={item.href}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className="sidebar-container">
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </div>
  );
}

export default Sidebar;