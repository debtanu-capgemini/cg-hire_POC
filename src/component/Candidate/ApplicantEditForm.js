import { React, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Stack from "@mui/material/Stack";
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
  Snackbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../../css/globals.css";
import { useParams } from "react-router";
import MuiAlert from "@mui/material/Alert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

const ApplicantEditForm = ({ edit, Candid }) => {
  const [UploadFile, setUploadFile] = useState("");
  const [CgUserData, SetCgUserData] = useState("");
  const [jobIdData, SetjobIdData] = useState("");
  const [open, setOpen] = useState(false);
  const [msg, setmsg] = useState("");
  const [editData, setEditData] = useState("");
  const navigate = useNavigate();
  let phoneRegExp = new RegExp(/(0|91)?[6-9][0-9]{9}/);

  const location = [
    {
      value: "kolkata",
      label: "Kolkata",
    },
    {
      value: "mumbai",
      label: "Mumbai",
    },
    {
      value: "delhi",
      label: "Delhi",
    },
    {
      value: "pune",
      label: "Pune",
    },
    {
      value: "chennai",
      label: "Chennai",
    },
  ];

  const validationSchema = Yup.object({
    fName: Yup.string().max(255).required("First name is required"),
    lName: Yup.string().max(255).required("Last name is required"),
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    mobile: Yup.string()

      .required("mobile no is required")

      .matches(phoneRegExp, "Phone number is not valid")

      .min(10, "too short")

      .max(10, "too long"),
    location: Yup.string().max(25).required("Location is required"),
    skill: Yup.string().max(25).required("Skill is required"),
  });

  useEffect(() => {
    getJobIdData();
    getcgUserData();
  }, [edit]);
  //get CG user data
  async function getJobIdData() {
    let url = `http://localhost:8080/job`;
    let response = await fetch(url);
    let data = await response.json();
    SetjobIdData(data.result, "jobdata");
  }

  // Assigned Interviewer data
  async function getcgUserData() {
    let url = `http://localhost:8080/cg_user`;
    let response = await fetch(url);
    let data = await response.json();
    SetCgUserData(data.result);
  }

  const { id } = useParams();
  // console.log(id);

  const formik = useFormik({
    initialValues: {
      fName: edit.fname,
      lName: edit.lName,
      email: edit.email,
      mobile: edit.mobile,
      location: edit.location,
      skill: edit.skill,
      experience: edit.experience,
      position: edit.position,
      assign: edit.assign,
      idType: edit.idType,
      idNumber: edit.idNumber,
      country: edit.address.country,
      state: edit.address.state,
      city: edit.address.city,
      address1: edit.address.address1,
      pincode: edit.address.pincode,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);

      async function putData() {
        let body = {
          id: parseInt(Candid),
          fname: values["fName"],
          lName: values["lName"],
          email: values["email"],
          mobile: values["mobile"],
          location: values["location"],
          skill: values["skill"],
          experience: values["experience"],
          position: values["position"],
          assign: values["assign"],
          idType: values["idType"],
          idNumber: values["idNumber"],
          address: {
            country: values["country"],
            state: values["state"],
            city: values["city"],
            address1: values["address1"],
            pincode: values["pincode"],
          },
          status:edit.status,
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
          // resume: values["resume"],
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
          setmsg("Candidate Successfully Updated");
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
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <MuiAlert variant="filled" severity="success" sx={{ width: "100%" }}>
          {msg}
        </MuiAlert>
      </Snackbar>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ my: 6 }}>
          <Typography
            variant="h5"
            component="div"
            className="feedback_header_1"
          >
            Update Applicant Data
          </Typography>
        </Box>
        <Box>
          <Grid className="feedback_header_1" container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography
                align="left"
                color="GrayText"
                className="feedbackFieldHeader"
              >
                First Name
              </Typography>
              <FormControl
                size="small"
                sx={{ minWidth: 140, width: "100%" }}
                align="left"
                className="textFieldColor"
              >
                {/* <InputLabel> Rating Scale</InputLabel> */}
                <TextField
                  error={Boolean(formik.touched.fName && formik.errors.fName)}
                  helperText={formik.touched.fName && formik.errors.fName}
                  // label="First name"
                  // margin="none"
                  size="small"
                  name="fName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  value={formik.values.fName}
                  variant="filled"
                  // color="#FFFFFF"

                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography
                align="left"
                color="GrayText"
                className="feedbackFieldHeader"
              >
                Last Name
              </Typography>
              <FormControl
                size="small"
                sx={{ minWidth: 140, width: "100%" }}
                align="left"
              >
                {/* <InputLabel> Rating Scale</InputLabel> */}
                <TextField
                  error={Boolean(formik.touched.lName && formik.errors.lName)}
                  helperText={formik.touched.lName && formik.errors.lName}
                  // label="Last name"
                  // margin="none"
                  size="small"
                  name="lName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  value={formik.values.lName}
                  variant="filled"
                  fullWidth
                />
              </FormControl>
            </Grid>

            <Grid item md={4} xs={12}>
              <Typography
                align="left"
                color="GrayText"
                className="feedbackFieldHeader"
              >
                Email
              </Typography>
              <FormControl
                size="small"
                sx={{ minWidth: 140, width: "100%" }}
                align="left"
              >
                <TextField
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  // label="Email"
                  // margin="none"
                  size="small"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  value={formik.values.email}
                  variant="filled"
                  fullWidth
                />
              </FormControl>
            </Grid>

            <Grid item md={4} xs={12}>
              <Typography
                align="left"
                color="GrayText"
                className="feedbackFieldHeader"
              >
                Mobile
              </Typography>
              <FormControl
                variant="filled"
                size="small"
                sx={{ minWidth: 140, width: "100%" }}
                align="left"
              >
                <TextField
                  error={Boolean(formik.touched.mobile && formik.errors.mobile)}
                  helperText={formik.touched.mobile && formik.errors.mobile}
                  // label="mobile"
                  size="small"
                  name="mobile"
                  type="number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  value={formik.values.mobile}
                  fullWidth
                  className="mobValid"
                  variant="filled"
                />
              </FormControl>
            </Grid>

            <Grid item md={4} xs={12}>
              <Typography
                align="left"
                color="GrayText"
                className="feedbackFieldHeader"
              >
                Location
              </Typography>
              <FormControl
                size="small"
                sx={{ minWidth: 140, width: "100%" }}
                align="left"
              >
                {/* <InputLabel>Select Location</InputLabel> */}
                <Select
                  labelId="demo-simple-select-label"
                  // label="Select Location"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="location"
                  value={formik.values.location}
                  variant="filled"
                >
                  <MenuItem value={0} disabled>
                    Select Location
                  </MenuItem>
                  {location.length > 0 &&
                    location.map((loc) => (
                      <MenuItem value={loc.value} key={loc.value}>
                        {loc.label}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item md={4} xs={12}>
              <Typography
                align="left"
                color="GrayText"
                className="feedbackFieldHeader"
              >
                Primary Skill
              </Typography>
              <FormControl
                size="small"
                sx={{ minWidth: 140, width: "100%" }}
                align="left"
              >
                <TextField
                  error={Boolean(formik.touched.skill && formik.errors.skill)}
                  helperText={formik.touched.skill && formik.errors.skill}
                  // label="Primary Skill"
                  size="small"
                  name="skill"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  value={formik.values.skill}
                  fullWidth
                  variant="filled"
                />
              </FormControl>
            </Grid>

            <Grid item md={4} xs={12}>
              <Typography
                align="left"
                color="GrayText"
                className="feedbackFieldHeader"
              >
                Experience
              </Typography>
              <FormControl
                size="small"
                sx={{ minWidth: 140, width: "100%" }}
                align="left"
              >
                <TextField
                  // label="Experience"
                  size="small"
                  name="experience"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  value={formik.values.experience}
                  fullWidth
                  variant="filled"
                />
              </FormControl>
            </Grid>

            <Grid item md={4} xs={12}>
              <Typography
                align="left"
                color="GrayText"
                className="feedbackFieldHeader"
              >
                Job Id
              </Typography>
              <FormControl
                size="small"
                sx={{ minWidth: 140, width: "100%" }}
                align="left"
              >
                {/* <InputLabel>Job Id </InputLabel> */}

                <Select
                  labelId="demo-simple-select-label"
                  // label="job id"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="position"
                  value={formik.values.position}
                  variant="filled"
                >
                  <MenuItem value={0} disabled>
                    Select Job Id
                  </MenuItem>
                  {jobIdData.length > 0 &&
                    jobIdData.map((cguser) => (
                      <MenuItem value={cguser.jobName} key={cguser.jobName}>
                        {cguser.jobId}
                        {"-" + cguser.jobName}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
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
              <Typography
                align="left"
                color="GrayText"
                className="feedbackFieldHeader"
              >
                Id Type
              </Typography>
              <FormControl
                size="small"
                sx={{ minWidth: 140, width: "100%" }}
                align="left"
              >
                <TextField
                  // label="Id Type"
                  size="small"
                  name="idType"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.idType}
                  fullWidth
                  variant="filled"
                />
              </FormControl>
            </Grid>

            <Grid item md={4} xs={12}>
              <Typography
                align="left"
                color="GrayText"
                className="feedbackFieldHeader"
              >
                Id Number
              </Typography>
              <FormControl
                size="small"
                sx={{ minWidth: 140, width: "100%" }}
                align="left"
              >
                <TextField
                  // label="Id Number"
                  size="small"
                  name="idNumber"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.idNumber}
                  fullWidth
                  variant="filled"
                />
              </FormControl>
            </Grid>

            <Grid item md={4} xs={12}>
              <Typography
                align="left"
                color="GrayText"
                className="feedbackFieldHeader"
              >
                Country
              </Typography>
              <FormControl
                size="small"
                sx={{ minWidth: 140, width: "100%" }}
                align="left"
              >
                <TextField
                  // label="Country"
                  size="small"
                  name="country"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.country}
                  fullWidth
                  variant="filled"
                />
              </FormControl>
            </Grid>

            <Grid item md={4} xs={12}>
              <Typography
                align="left"
                color="GrayText"
                className="feedbackFieldHeader"
              >
                State
              </Typography>
              <FormControl
                size="small"
                sx={{ minWidth: 140, width: "100%" }}
                align="left"
              >
                <TextField
                  // label="State"
                  size="small"
                  name="state"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.state}
                  fullWidth
                  variant="filled"
                />
              </FormControl>
            </Grid>

            <Grid item md={4} xs={12}>
              <Typography
                align="left"
                color="GrayText"
                className="feedbackFieldHeader"
              >
                city
              </Typography>
              <FormControl
                size="small"
                sx={{ minWidth: 140, width: "100%" }}
                align="left"
              >
                <TextField
                  // label="city"
                  size="small"
                  name="city"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.city}
                  fullWidth
                  variant="filled"
                />
              </FormControl>
            </Grid>

            <Grid item md={4} xs={12}>
              <Typography
                align="left"
                color="GrayText"
                className="feedbackFieldHeader"
              >
                Complete Address
              </Typography>
              <FormControl
                size="small"
                sx={{ minWidth: 140, width: "100%" }}
                align="left"
              >
                <TextField
                  // label="Complete Address"
                  size="small"
                  name="address1"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address1}
                  fullWidth
                  variant="filled"
                />
              </FormControl>
            </Grid>

            <Grid item md={4} xs={12}>
              <Typography
                align="left"
                color="GrayText"
                className="feedbackFieldHeader"
              >
                Pincode
              </Typography>
              <FormControl
                size="small"
                sx={{ minWidth: 140, width: "100%" }}
                align="left"
              >
                <TextField
                  // label="Pincode"
                  size="small"
                  name="pincode"
                  type="number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.pincode}
                  fullWidth
                  variant="filled"
                />
              </FormControl>
            </Grid>

            <Grid item md={4} xs={12}></Grid>
            <Grid item md={4} xs={12}></Grid>
          </Grid>
        </Box>

        <Box sx={{ py: 2 }}>
          <Stack direction="row" spacing={2} className="feedbackButton">
            <Box className="back-button">
              <Link to="/dashboard">
                <Button
                  component="a"
                  startIcon={<ArrowBackIcon fontSize="small" />}
                >
                  {" "}
                  Dashboard{" "}
                </Button>{" "}
              </Link>{" "}
            </Box>

            <Button
              className="submit-button"
              variant="contained"
              color="success"
              disabled={formik.isSubmitting}
              // fullWidth
              size="medium"
              type="submit"
            >
              Save
            </Button>
          </Stack>
        </Box>
      </form>
    </>
  );
};

export default ApplicantEditForm;
