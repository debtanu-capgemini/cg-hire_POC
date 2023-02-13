import { React, useState, useEffect } from "react";
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack,
  } from "@mui/material";
  
  import "../../css/globals.css";


  const ApplicantFinalProcess = () =>{

    return(
        <>
        <form>
        <Grid container>
        <Typography >You are done</Typography>
        <Box sx={{ py: 2 }}>
        <Stack direction="row" spacing={2} className="feedbackButton" >
          <Button
            className="submit-button"
            // disabled={formik.isSubmitting}
            // fullWidth
            size="medium"
            type="submit"
            variant="outlined"
            color="secondary"
          >
            Back
          </Button>
          <Button
            className="submit-button"
            variant="contained" 
            color="success"
            
            // disabled={formik.isSubmitting}
            // fullWidth
            size="medium"
            type="submit"
          >
            Save
          </Button>
          <Button
            className="submit-button"
            // disabled={formik.isSubmitting}
            // fullWidth
            size="medium"
            type="submit"
            variant="outlined"
            color="secondary"
          >
            Reset
          </Button>
          </Stack>
          </Box>
          </Grid>
        </form>
        </>
    )

  };

export default ApplicantFinalProcess;