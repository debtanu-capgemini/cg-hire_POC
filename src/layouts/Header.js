import Button from "@mui/material/Button";

import Link from "@mui/material/Link";

import Typography from "@mui/material/Typography";

import "../css/Header.css";

import Capgemini_Logo from "../img/Capgemini_Logo.png";

import AppBar from "@mui/material/AppBar";

import Toolbar from "@mui/material/Toolbar";

import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";

import Box from "@mui/material/Box";

import Container from "@mui/material/Container";

import { AppbarContext } from "../component/Layout.js";

import { useContext } from "react";
import { Badge, Tooltip } from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

//make it resuable

function Header(props) {
  const { handleDrawerToggle } = useContext(AppbarContext);

  return (
    <AppBar position="fixed" className="appbar" sx={{ zIndex: 1251 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ display: { xs: "flex", md: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Link className="appbar-brand" href="/" sx={{ mt: 1 }}>
              <img
                src={Capgemini_Logo}
                alt="Capgemini Logo"
                style={{ width: "135px" }}
              />

              <Typography variant="body" color="common.white" component="span">
                | Hire
              </Typography>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Notifications">
              <IconButton sx={{ ml: 1 }}>
                <Badge badgeContent={4} color="primary" variant="dot">
                  <NotificationsActiveIcon fontSize="small" />
                </Badge>
              </IconButton>
            </Tooltip>

            <Link className="" href="/">
              <Button size="small">
                <Typography
                  variant="body"
                  color="common.white"
                  component="span"
                >
                  Logout
                </Typography>
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
