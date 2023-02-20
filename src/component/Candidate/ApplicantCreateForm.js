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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ApplicantCreateForm = () => {
  const [UploadFile, setUploadFile] = useState("");
  const [CgUserData, SetCgUserData] = useState("");
  const [jobIdData, SetjobIdData] = useState("");
  const [open, setOpen] = useState(false);
  const [msg, setmsg] = useState("");
  const [image, setImage] = useState();
  let phoneRegExp = new RegExp(/(0|91)?[6-9][0-9]{9}/);

  function handleChange(e) {
    console.log(e.target.files);
    setImage(URL.createObjectURL(e.target.files[0]));
}

  const location = [
    {
      value: 'kolkata',
      label: 'Kolkata'
    },
    {
      value: 'mumbai',
      label: 'Mumbai'
    },
    {
      value: 'delhi',
      label: 'Delhi'
    },
    {
      value: 'pune',
      label: 'Pune'
    },
    {
      value: 'chennai',
      label: 'Chennai'
    }
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
  }, []);
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

  const formik = useFormik({
    initialValues: {
      fName: "",
      lName: "",
      email: "",
      mobile: "",
      location: "",
      skill: "",
      experience: "",
      position: "",
      assign: "",
      idType: "",
      idNumber: "",
      country: "",
      state: "",
      city: "",
      status:0,
      address1: "",
      pincode: "",
      resume: "",
      photo:""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);

      //file upload done here
      const upldUrl = "http://localhost:8080/upload_files";
      const upLdData = new FormData();
      upLdData.append("files", UploadFile);
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      axios.post(upldUrl, upLdData, config).then((response) => {
        console.log(response.data);
      });
      async function postData() {
        let url = "http://localhost:8080/candidate";
        let obj = {
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
          status:values["status"],
          address: {
            country: values["country"],
            state: values["state"],
            city: values["city"],
            address1: values["address1"],
            pincode: values["pincode"],
          },
          resume: values["resume"],
          photo:values["photo"],
          isActive: true,
          ratingScale:"",
          ModeOfInterview:"",
          ProblemSolvingSkill:{
            rate:"",
            comment:"",
          },
          jobKnowledge:{
            rate:"",
            comment:"",
          },
          technicalExperience:{
            rate:"",
            comment:"",
          },
          initiative:{
            rate:"",
            comment:"",
          },
          communication:{
            rate:"",
            comment:"",
          },
          selfConfidence:{
            rate:"",
            comment:"",
          },
          flexibility:{
            rate:"",
            comment:"",
          },
          remark:"",
          strongSkills:"",
          trainingRequire:"",
          timeSlot:"",
          interviewDate:""
        };
        console.log(obj);
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(obj),
        });
        const resData = await response.json();
        console.log(resData);
        if (resData) {
          setOpen(true)
          setmsg("Candidate Successfully Registered");
          console.log(setmsg);
        }
      }
      postData();
      window.location.reload();
    },
  });

  function fileUpload(e) {
    if (e.target.files) {
      setUploadFile(e.target.files[0]);
    }
  }

  return (
    <>
      
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ my: 1 }}>
          <Typography variant="h5"  className="create_header">
            Create Applicants
          </Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item md={4} xs={12}>
            <TextField
              error={Boolean(formik.touched.fName && formik.errors.fName)}
              helperText={formik.touched.fName && formik.errors.fName}
              label="First name"
              // margin="none"
              size="small"
              name="fName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              value={formik.values.fName}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <TextField
              error={Boolean(formik.touched.lName && formik.errors.lName)}
              helperText={formik.touched.lName && formik.errors.lName}
              label="Last name"
              size="small"
              name="lName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              value={formik.values.lName}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              label="Email"
              size="small"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              value={formik.values.email}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <TextField
              error={Boolean(formik.touched.mobile && formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
              label="Mobile"
              size="small"
              name="mobile"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              value={formik.values.mobile}
              fullWidth
              className="mobValid"
              //  variant="outlined"
            />
          </Grid>
          <Grid item md={4} xs={12}>

          <FormControl
              size="small"
              sx={{ minWidth: 120, width: "100%" }}
              align="left"
            >
              <InputLabel>Location</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                label="Location"
                onChange={formik.handleChange}
                name="location"
                value={formik.values.location}
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
            {/* <TextField
              error={Boolean(formik.touched.location && formik.errors.location)}
              helperText={formik.touched.location && formik.errors.location}
              label="Location"
              size="small"
              name="location"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.location}
              fullWidth
            /> */}
          </Grid>
          <Grid item md={4} xs={12}>
            <TextField
              error={Boolean(formik.touched.skill && formik.errors.skill)}
              helperText={formik.touched.skill && formik.errors.skill}
              label="Primary Skill"
              size="small"
              name="skill"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              value={formik.values.skill}
              fullWidth
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <TextField
              label="Experience"
              size="small"
              name="experience"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.experience}
              fullWidth
              required
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl
              size="small"
              sx={{ minWidth: 120, width: "100%" }}
              align="left"
            >
              <InputLabel>Job ID</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                label="Job ID"
                onChange={formik.handleChange}
                name="position"
                value={formik.values.position}
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
            <FormControl
              size="small"
              sx={{ minWidth: 120, width: "100%" }}
              align="left"
            >
              <InputLabel>Assign To</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                label="Assign To"
                onChange={formik.handleChange}
                name="assign"
                value={formik.values.assign}
              >
                <MenuItem value={0} disabled>
                  Select Interviewer
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
            <TextField
              label="ID Type"
              size="small"
              name="idType"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.idType}
              fullWidth
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <TextField
              label="ID Number"
              size="small"
              name="idNumber"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.idNumber}
              fullWidth
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <TextField
              label="Country"
              size="small"
              name="country"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.country}
              fullWidth
            />
          </Grid>

          <Grid item md={4} xs={12}>
            <TextField
              label="State"
              size="small"
              name="state"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.state}
              fullWidth
            />
          </Grid>

          <Grid item md={4} xs={12}>
            <TextField
              label="City"
              size="small"
              name="city"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
              fullWidth
            />
          </Grid>

          <Grid item md={4} xs={12}>
            <TextField
              label="Address1"
              size="small"
              name="address1"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address1}
              fullWidth
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <TextField
              label="Pincode"
              size="small"
              name="pincode"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.pincode}
              fullWidth
            />
          </Grid>
          <Grid item md={4} xs={12}></Grid>
          <Grid item md={4} xs={12}></Grid>
          <Grid item md={3} xs={12}>
            <label className="file_label">Upload Your Resume *</label>
            <input
              type="file"
              placeholder="upload Resume"
              onChange={formik.handleChange}
              onBlur={(e) => fileUpload(e)}
              id="resume"
              name="resume"
              accept=".doc,.docx,application/pdf"
              //    className="resume_file"
              required
            />
          </Grid>
          
          {/* <Grid item md={8} xs={12}></Grid> */}
          <Grid item md={1} xs={12}>
          
          </Grid>
          <Grid item md={3} xs={12}>
            <label className="file_label">Upload Candidate Photo *</label>
            <input
              type="file"
              placeholder="upload photo"
              // onChange={formik.handleChange}
              onChange={handleChange}
              onBlur={(e) => fileUpload(e)}
              id="photo"
              name="photo"
              accept=".jpg,.jpeg,.png"
              required
            />
          </Grid>
          <Grid item md={3} xs={12}>
          <Card sx={{ maxWidth: 80,ml:12,justifyContent: 'center',mt:-2 }}>
        
            <CardMedia 
                className="candidateImage"
                component="img"
                height="80"
                src={image}
                // image="https://picsum.photos/1200/600"
                alt=""
            />
            </Card>
          </Grid>
          
        </Grid>

        <Box sx={{ py: 2 }} className="createForm_submit_button" >
          <Button
            className="submit-button "
            color="primary"
            disabled={formik.isSubmitting}
            // fullWidth
            size="medium"
            type="submit"
            variant="contained"
          >
            Register
          </Button>
        </Box>
      </form>
    </>
  );
};

export default ApplicantCreateForm;
