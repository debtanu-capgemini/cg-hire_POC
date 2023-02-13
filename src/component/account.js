import { React, useState, useEffect } from "react";
import { Box, Container, Grid, Typography } from '@mui/material';
import { AccountProfile } from '../component/Profile/account-profile';
import { AccountProfileDetails } from '../component/Profile/account-profile-details';
import './account.css';

const Account = () => (
  <>
    <Box>
      <title>
        Account
      </title>
    </Box>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
        minHeight:"100vh"
      }}
    >
      <Container maxWidth="lg">
        
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <AccountProfile />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <AccountProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);



export default Account;
