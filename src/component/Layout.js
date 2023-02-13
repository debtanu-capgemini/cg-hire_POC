import { useState, createContext } from "react";

import Header from "../layouts/Header";

import Footer from "../layouts/Footer";

import Sidebar from "../layouts/Sidebar";

import Grid from "@mui/material/Grid";



export const AppbarContext = createContext();



let drawerWidth = "16.666667%";



export default function Layout(props) {

  const [token, setToken] = useState(getToken);

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {

    setMobileOpen(!mobileOpen);

    drawerWidth = "240px";

  };



  function getToken() {

    const tokenString = sessionStorage.getItem("token");

    return tokenString ? JSON.parse(tokenString) : null;

  }



  

    return (

      <div>

        <AppbarContext.Provider

          value={{ handleDrawerToggle, mobileOpen, drawerWidth }}

        >

          <div>

            <Header />

          </div>

          <div>

            <Grid className="wrapper" container>

              <Grid

                className="sidebar"

                item

                md={2}

                sx={{ display: { xs: "none", md: "block" } }}

              >

                <Sidebar />

              </Grid>

              <Grid className="content" item xs={12} md={10} sx={{ mt: 3 }}>

                {props.children}

              </Grid>

            </Grid>

            <footer className="footer-component">

              <Footer />

            </footer>

          </div>

        </AppbarContext.Provider>

      </div>

    );

  

}