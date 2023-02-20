import { React, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
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
  Card,
  CardMedia,
} from "@mui/material";

import "../../css/globals.css";
import { NavLink } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const timeSlot = [
    {
      value: "09:00AM - 10:00AM",
      label: "09:00AM - 10:00AM",
    },
    {
      value: "10:00AM - 11:00AM",
      label: "10:00AM - 11:00AM",
    },
    {
      value: "11:00AM - 12:00PM",
      label: "11:00AM - 12:00PM",
    },
    {
      value: "12:00PM - 01:00PM",
      label: "12:00PM - 01:00PM",
    },
    {
      value: "01:00PAM - 02:00PM",
      label: "01:00PAM - 02:00PM",
    },
    {
      value: "02:00PAM - 03:00PM",
      label: "02:00PAM - 03:00PM",
    },
  ];

const AssignPanellist = (edit, Candid) => {
  const [UploadFile, setUploadFile] = useState("");
  const [CgUserData, SetCgUserData] = useState("");
  const [jobIdData, SetjobIdData] = useState("");
  const [open, setOpen] = useState(false);
  const [msg, setmsg] = useState("");
  const [editData, setEditData] = useState("");
  console.log(edit);

  useEffect(() => {
    getcgUserData();
    console.log(edit)
  }, [edit]);

  const validationSchema = Yup.object({
    interviewDate: Yup.string().required("Interview date is required"),
    assign: Yup.string().required("Panellist is required"),
    timeSlot: Yup.string().required("Time slot is required"),
  });

  async function getcgUserData() {
    let url = `http://localhost:8080/cg_user`;
    let response = await fetch(url);
    let data = await response.json();
    SetCgUserData(data.result);
  }

  const formik = useFormik({
    initialValues: {
      interviewDate: edit.interviewDate,
      assign: edit.assign,
      timeSlot: edit.timeSlot,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);

      async function putData() {
        let body = {
          id: parseInt(Candid),
          fname: edit.fName,
          lName: edit.lName,
          email: edit.email,
          mobile: edit.mobile,
          location: edit.location,
          skill: edit.skill,
          experience: edit.experience,
          position: edit.position,
          assign: values["assign"],
          idType: edit.idType,
          idNumber: edit.idNumber,
          address: {
            country: edit.address.country,
            state: edit.address.state,
            city: edit.address.city,
            address1: edit.address.address1,
            pincode: edit.address.pincode,
          },
          status: edit.status,
          isActive: true,
          ratingScale: edit.ratingScale,
          ModeOfInterview: edit.ModeOfInterview,
          ProblemSolvingSkill: {
            rate: edit.ProblemSolvingSkill.rate,
            comment: edit.ProblemSolvingSkill.comment,
          },
          jobKnowledge: {
            rate: edit.jobKnowledge.rate,
            comment: edit.jobKnowledge.comment,
          },
          technicalExperience: {
            rate: edit.technicalExperience.rate,
            comment: edit.technicalExperience.comment,
          },
          initiative: {
            rate: edit.initiative.rate,
            comment: edit.initiative.comment,
          },
          communication: {
            rate: edit.communication.rate,
            comment: edit.communication.comment,
          },
          selfConfidence: {
            rate: edit.selfConfidence.rate,
            comment: edit.selfConfidence.comment,
          },
          flexibility: {
            rate: edit.flexibility.rate,
            comment: edit.flexibility.comment,
          },
          remark: edit.remark,
          resume: edit.resume,
          photo: edit.photo,
          strongSkills: edit.strongSkills,
          trainingRequire: edit.trainingRequire,
          timeSlot: values["timeSlot"],
          interviewDate: values["interviewDate"],
        };
        let obj = {
          key: "id",
          val: parseInt(Candid),
        };
        let url = `http://localhost:8080/candidate?q=${JSON.stringify(obj)}`;
        // console.log(body,"data");
        console.log(url, "url");
        // alert(url);
        console.log(JSON.stringify(body), "body");
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        });

        const resData = await response.json();
        console.log(resData);
        if (resData) {
          setOpen(true);
          setmsg("Data Successfully Updated");
        }
      }
      putData();
    },
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    window.location.reload();
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        {console.log(edit.edit.interviewDate)}
        <Box sx={{ my: 1 }}>
          <Typography variant="h5" className="create_header">
            Assign Panellist
          </Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item md={4} xs={12}>
            <TextField
              id="date"
              className="datePicker"
              label="Select Date"
              name="interviewDate"
              type="date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={edit.edit.interviewDate}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item md={4} xs={12}>
          <Typography
                align="left"
                color="GrayText"
                className="feedbackFieldHeader"
              >
                Assign To
              </Typography>
              <FormControl
                size="small"
                sx={{ minWidth: 140, width: "100%" }}
                align="left"
              >
                {/* <InputLabel>Assign to </InputLabel> */}
                <Select
                  labelId="demo-simple-select-label"
                  // label="Assign To"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="assign"
                  value={formik.values.assign}
                  variant="filled"
                >
                  <MenuItem value={0} disabled>
                    Select Interviewe
                  </MenuItem>
                  {CgUserData.length > 0 &&
                    CgUserData.map((cguser) => (
                      <MenuItem
                        value={cguser.profile.userid}
                        key={cguser.profile.userid}
                      >
                        {cguser.profile.propername}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl
              size="small"
              sx={{ mt: 1, mb: 1, minWidth: 120, width: 150 }}
              align="left"
            >
              <InputLabel>Time Slots</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={edit.timeSlot ? edit.timeSlot : 0}
                label="Time Slots"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="timeSlot"
              >
                <MenuItem disabled value={0}>
                  Time Slots
                </MenuItem>
                {timeSlot.length > 0 &&
                  timeSlot.map((slot) => (
                    <MenuItem value={slot.value} key={slot.value}>
                      {slot.label}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Box sx={{ py: 2 }} className="createForm_submit_button">
          <Button
            className="submit-button "
            color="primary"
            disabled={formik.isSubmitting}
            // fullWidth
            size="medium"
            type="submit"
            variant="contained"
          >
            Assign
          </Button>
        </Box>
      </form>
    </>
  );
};

export default AssignPanellist;
