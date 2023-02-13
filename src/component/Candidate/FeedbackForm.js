import { React, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Stack from '@mui/material/Stack';
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
import { useParams } from "react-router";
import "../../css/globals.css";


const interviewMode = [
    {
      value: 'Personal (Face to Face)',
      label: 'Personal (Face to Face)'
    },
    {
      value: 'Personal (Person is sitting in any one of Capgemini India locations and you talk over phone)',
      label: 'Personal (Person is sitting in any one of Capgemini India locations and you talk over phone)'
    },
    {
      value: 'Webcam (You being present in front of webcam )',
      label: 'Webcam (You being present in front of webcam )'
    }
  ];

  const rating = [
    {
      value: '1-Inadequate / Not Relevant',
      label: '1-Inadequate / Not Relevant'
    },
    {
        value: '2-Adequate / Reasonably Relevant',
        label: '2-Adequate / Reasonably Relevant'
      },
      {
        value: '3-Good / Relevant',
        label: '3-Good / Relevant'
      },
      {
        value: '4-Excellent / Very Relevant',
        label: '4-Excellent / Very Relevant'
      },
      {
        value: '5-Outstanding / Ideal fitment',
        label: '5-Outstanding / Ideal fitment'
      },
    ];

    const technicalEvaluation =[
        {
            value:'Good / Relevant',
            label:'Good / Relevant'
        },
        {
            value:'Inadequate / Not Relevant',
            label:'Inadequate / Not Relevant'
        },
        {
            value:'Adequate / Reasonably Relevant',
            label:'Adequate / Reasonably Relevant'
        },
    ]


const FeedbackForm = ({editData,Candid}) =>{
    const [open, setOpen] = useState(false);
    const [msg, setmsg] = useState("");
    const { id } = useParams();

    function upperCase(str) {
      const titleCase = str
        .toLowerCase()
        .split(' ')
        .map(word => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
    
      return titleCase;
    }
    // const [editData, setEditData] = useState("");
    const validationSchema = Yup.object({
        ratingScale: Yup.string().required("Rating is required"),
        ModeOfInterview: Yup.string().required("mode of Interview is required"),
      });
    
    const formik = useFormik({
        initialValues: {
            ratingScale:editData.ratingScale,
            ModeOfInterview:editData.ModeOfInterview,
            ProblemSolvingSkill:{
                rate:editData.ProblemSolvingSkill.rate,
                comment:editData.ProblemSolvingSkill.comment
            },
            jobKnowledge:{
                rate:editData.jobKnowledge.rate,
                comment:editData.jobKnowledge.comment
            },
            technicalExperience:{
                rate:editData.technicalExperience.rate,
                comment:editData.technicalExperience.comment
            },
            initiative:{
                rate:editData.initiative.rate,
                comment:editData.initiative.comment
            },
            communication:{
                rate:editData.communication.rate,
                comment:editData.communication.comment
            },
            selfConfidence:{
                rate:editData.selfConfidence.rate,
                comment:editData.selfConfidence.comment
            },
            flexibility:{
                rate:editData.flexibility.rate,
                comment:editData.flexibility.comment
            },
            remark:editData.remark,
            strongSkills:editData.strongSkills,
            trainingRequire:editData.trainingRequire
      
            // creted_by:"",
            // modify_by:""
        },

        validationSchema: validationSchema,
        onSubmit: (values) => {
           
            console.log(values,"values");

            async function putData() {

                let obj = {
                    key: "id",
                    val: parseInt(id),
                  };

                let url = `http://localhost:8080/candidate?q=${JSON.stringify(obj)}`;
            //   let ps= values.ProblemSolvingSkill;
              let body = {
                id: parseInt(id),
                fname: editData.fname,
                lName: editData.lName,
                email: editData.email,
                mobile: editData.mobile,
                location: editData.location,
                skill: editData.skill,
                experience: editData.experience,
                position: editData.position,
                assign: editData.assign,
                idType:editData.idType,
                idNumber: editData.idNumber,
                address: {
                    country: editData.address.country,
                    state:editData.address.state,
                    city: editData.address.city,
                    address1: editData.address.address1,
                    pincode: editData.address.pincode,
                },
                status:1,
                isActive: true,
                ratingScale: values["ratingScale"],
                ModeOfInterview: values["ModeOfInterview"],
                ProblemSolvingSkill:{
                    ...values.ProblemSolvingSkill
                    // rate:values.ProblemSolvingSkill.rate["rate"],
                    // comment:values["comment"]
                }, 
                jobKnowledge:{
                    ...values.jobKnowledge
                },
                technicalExperience:{
                    ...values.technicalExperience
                },
                initiative:{
                    ...values.initiative
                },
                communication:{
                    ...values.communication
                },
                selfConfidence:{
                    ...values.selfConfidence
                },
                flexibility:{
                    ...values.flexibility
                },
                remark: values["remark"],
                strongSkills:values["strongSkills"],
                trainingRequire:values["trainingRequire"],
                creted_by: values["creted_by"],
                modify_by:values["modify_by"]
              };
              console.log(obj);
              console.log(url, "url");
        
                console.log(JSON.stringify(body), "body");
                const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(body),
                });

              const resData = await response.json();
              console.log(resData,"resData");
              if (resData) {
                setOpen(true);
                setmsg("Candidate Successfully Registered");
                console.log(setmsg);
              }
            }
            putData();
            // window.location.reload();
          },
    });

    // async function getEditData() {
    //     let obj = {
    //       key: "id",
    //       val: parseInt(id),
    //     };
    //     let url = `http://localhost:8080/candidate?q=${JSON.stringify(obj)}`;
    
    //     let response = await fetch(url);
    //     let data = await response.json();
        
    //     setEditData(data.result[0]);
    //     console.log(data.result[0],"aaa");
    //   }
      useEffect(() => {
        // getEditData();
        console.log(editData,"editData");
      }, [editData]);

    return (
        <>
         <Box  sx={{
            "& .MuiFilledInput-root, .MuiFilledInput-root:hover, .MuiFilledInput-root:not(:active)":
              {
                background: "white",
              },
  
            "& .MuiSelect-select:focus": {
              background: "white",
            },
          }}>
          <form onSubmit={formik.handleSubmit}>
              <Box sx={{ mt: 6, mb:2 }}>
                  <Typography variant="h5" component="div" className="feedback_header_1">
                  Interview Assessment Workbook
                  </Typography>
                  <Typography variant="h7" component="div" className="feedback_subheader_1">
                  (For C and SC- 1st level Technical Interview)
                  </Typography>
              </Box>
              <Box>
              <Typography  className="feedback_section">
                  Candidate Details
              </Typography>
              <Grid className="feedback_header_1" container spacing={3}>
                  <Grid item md={4} xs={12}>
                  <FormControl
                  size="small"
                  sx={{ minWidth: 140, width: "100%" }}
                  align="left"
                  className="textFieldColor"
                >
                  {/* <InputLabel> Candidate Name</InputLabel> */}
                  <TextField
                    label="Candidate Name"
                    // margin="none"
                    id="outlined"
                    size="small"
                    name="fName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={upperCase(`${editData.fname} ${editData.lName}`)}
                    inputProps={
                      formik.values.fname != ""?
                       {readOnly: true} : {readOnly: false}
                    }
                    disabled
                  //   variant="filled"
                    // color="#FFFFFF"
                 
                    fullWidth
                  />
                  </FormControl>
                  <FormControl
                  size="small"
                  sx={{ minWidth: 140, width: "100%",mt:2 }}
                  align="left"
                  className="textFieldColor"
                >
                  <TextField
                    label="Skilled on Interview"
                    // margin="none"
                    id="outlined"
                    size="small"
                    name="skill"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    inputProps={
                      editData.skill != ""?
                       {readOnly: true} : {readOnly: false}
                    }
                    value={`${editData.skill}`}
                    disabled
                  //   variant="filled"
                    // color="#FFFFFF"
                 
                    fullWidth
                  />
                </FormControl>
  
                <FormControl
                  size="small"
                  sx={{ minWidth: 140, width: "100%",mt:2 }}
                  align="left"
                  className="textFieldColor"
                >
                  <TextField
                    label="Total Year of Experience"
                    // margin="none"
                    id="outlined"
                    size="small"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={`${editData.experience}`}
                    inputProps={
                      editData.experience != ""?
                       {readOnly: true} : {readOnly: false}
                    }
                    disabled
                  //   variant="filled"
                    // color="#FFFFFF"
                 
                    fullWidth
                  />
                </FormControl>
                  </Grid>
  
                  <Grid item md={4} xs={12}>
                  <FormControl
                  size="small"
                  sx={{ minWidth: 140, width: "100%" }}
                  align="left"
                  className="textFieldColor"
                >
                  {/* <InputLabel> Candidate Name</InputLabel> */}
                  <TextField
                    label=" Date of Interview "
                    type="date"
                    // margin="none"
                    id="outlined"
                    size="small"
                    name="interviewDate"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={" date"}
                    inputProps={
                      
                       {readOnly: true} 
                    }
                    disabled
                  //   variant="filled"
                    // color="#FFFFFF"
                 
                    fullWidth
                  />
                  </FormControl>
                  <FormControl
                  size="small"
                  sx={{ minWidth: 140, width: "100%",mt:2 }}
                  align="left"
                  className="textFieldColor"
                >
                  <TextField
                    label=" BU "
                    // margin="none"
                    id="outlined"
                    size="small"
                    name="skill"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={"DCX Digital"}
                    inputProps={
                      {readOnly: true}
                    }
                    disabled
                  //   variant="filled"
                    // color="#FFFFFF"
                 
                    fullWidth
                  />
                </FormControl>
  
                <FormControl
                  size="small"
                  sx={{ minWidth: 140, width: "100%",mt:2 }}
                  align="left"
                  className="textFieldColor"
                >
                  <TextField
                    label=" Interview Location "
                    // margin="none"
                    id="outlined"
                    size="small"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={upperCase(`${editData.location}`)}
                    inputProps={
                      editData.location != ""?
                       {readOnly: true} : {readOnly: false}
                    }
                    disabled
                  //   variant="filled"
                    // color="#FFFFFF"
                 
                    fullWidth
                  />
                </FormControl>
                  </Grid>
  
                  <Grid item md={4} xs={12}>
                  <Card sx={{ maxWidth: 180,ml:12,justifyContent: 'center' }}>
        
                      <CardMedia 
                          className="candidateImage"
                          component="img"
                          height="170"
                          image="https://picsum.photos/1200/600"
                          alt="Candidate Image"
                      />
                  </Card>
                  </Grid>
              </Grid>
  
              <Grid className="feedback_header_1" container spacing={3}>
                   <Grid item md={8} xs={12}>
                  {/* <Typography align="left" color="GrayText" className="feedbackFieldHeader">Mode of Interview</Typography> */}
                  <FormControl
                      variant="filled"
                      size="small"
                      sx={{ minWidth: 140, width: "100%" }}
                      align="left"
                      >
                      <InputLabel> Mode of Interview <span className="required">*</span></InputLabel>
                      <Select
                          error={Boolean(formik.touched.ModeOfInterview && formik.errors.ModeOfInterview)}
                          helperText={formik.touched.ModeOfInterview && formik.errors.ModeOfInterview}
                          labelId="demo-simple-select-label"
                          label="Mode of Interview"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name="ModeOfInterview"
                          value={formik.values.ModeOfInterview}
                          inputProps={
                              editData.ModeOfInterview != ""?
                               {readOnly: true} : {readOnly: false}
                            }
                      >
                          <MenuItem value={0} disabled>
                          Mode of Interview
                          </MenuItem>
                          {interviewMode.length > 0 &&
                          interviewMode.map((moi) => (
                              <MenuItem value={moi.value} key={moi.value}>
                              {moi.label}
                              </MenuItem>
                          ))}
                      </Select>
                      </FormControl>
                  </Grid>
            </Grid>
            </Box>
  
            <Box>
              <Typography  className="feedback_section">
                  Technical Evalution
              </Typography>
              <Grid className="feedback_header_1" container spacing={3}>
              <Grid item md={3} xs={12} >
                  <Typography align="left" color="GrayText" className="feedbackFieldHeader">Problem Solving / Analytical Ability </Typography>
                  <Typography align="left" className="subHeadingRating">(Ability to tackle a problem by using a logical, systematic, sequential approach)</Typography>
              </Grid>
              <Grid item md={3} xs={12} sx={{mt:1}} >
                  <FormControl
                      size="small"
                      variant="filled"
                      sx={{ minWidth: 140, width: "100%" }}
                      align="left"
                      >
                      <InputLabel> Rating Scale</InputLabel>
                      <Select
                          labelId="demo-simple-select-label"
                          label="Problem Solving / Analytical Ability"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name="ProblemSolvingSkill.rate"
                          value={formik.values.ProblemSolvingSkill.rate}
                          inputProps={
                              editData.ProblemSolvingSkill.rate != ""?
                               {readOnly: true} : {readOnly: false}
                            }
                      >
                          <MenuItem value={0} disabled>
                          Problem Solving / Analytical Ability
                          </MenuItem>
                          {technicalEvaluation.length > 0 &&
                          technicalEvaluation.map((e) => (
                              <MenuItem value={e.value} key={e.value}>
                              {e.label}
                              </MenuItem>
                          ))}
                      </Select>
                  </FormControl>
              </Grid>
              <Grid item md={6} xs={12}>
                 
                  <TextField
                      className="multiline"
                      id="filled-multiline-static"
                      label="Description"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      multiline
                      rows={1}
                      // defaultValue="Default Value"
                      variant="filled"
                      name="ProblemSolvingSkill.comment"
                      value={formik.values.ProblemSolvingSkill.comment}
                      inputProps={
                          editData.ProblemSolvingSkill.comment != ""?
                           {readOnly: true} : {readOnly: false}
                        }
                      fullWidth
                  />
                  
                  </Grid>
                  <Grid item md={3} xs={12} >
                  <Typography align="left" color="GrayText" className="feedbackFieldHeader">Business and Job Knowledge</Typography>
                  <Typography align="left" className="subHeadingRating">(With special reference to function for which he/she is being interviewed)</Typography>
                  </Grid>
                  <Grid item md={3} xs={12} sx={{mt:1}}>
                  <FormControl
                      variant="filled"
                      size="small"
                      sx={{ minWidth: 140, width: "100%" }}
                      align="left"
                      >
                      <InputLabel> Rating Scale</InputLabel>
                      <Select
                          labelId="demo-simple-select-label"
                          label="Business and Job Knowledge"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name="jobKnowledge.rate"
                          value={formik.values.jobKnowledge.rate}
                          inputProps={
                              editData.jobKnowledge.rate != ""?
                               {readOnly: true} : {readOnly: false}
                            }
                      >
                          <MenuItem value={0} disabled>
                          Business and Job Knowledge
                          </MenuItem>
                          {technicalEvaluation.length > 0 &&
                          technicalEvaluation.map((e) => (
                              <MenuItem value={e.value} key={e.value}>
                              {e.label}
                              </MenuItem>
                          ))}
                      </Select>
                      </FormControl>
                      </Grid>
                      <Grid item md={6} xs={12}>
                      <TextField
                          id="filled-multiline-static"
                          label="Description"
                          multiline
                          rows={1}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name="jobKnowledge.comment"
                          // defaultValue="Default Value"
                          value={formik.values.jobKnowledge.comment}
                          inputProps={
                              editData.jobKnowledge.comment != ""?
                               {readOnly: true} : {readOnly: false}
                            }
                          variant="filled"
                          fullWidth
                      />
                  </Grid>
  
  
                  <Grid item md={3} xs={12}>
                  <Typography align="left" color="GrayText" className="feedbackFieldHeader">Technical/Functional Experience & Exposure</Typography>
                  <Typography align="left" className="subHeadingRating">(Knowledge of languages, software development processes, testing / debugging practices. Using the knowledge to solve technical issues in projects
                  )</Typography>
                  </Grid>
                  <Grid item md={3} xs={12} sx={{mt:6}}>
                  <FormControl
                      variant="filled"
                      size="small"
                      sx={{ minWidth: 140, width: "100%" }}
                      align="left"
                      >
                      <InputLabel>Rating Scale</InputLabel>
                      <Select
                          labelId="demo-simple-select-label"
                          label="Technical/Functional Experience & Exposure"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name="technicalExperience.rate"
                          value={formik.values.technicalExperience.rate}
                          inputProps={
                              editData.technicalExperience.rate != ""?
                               {readOnly: true} : {readOnly: false}
                            }
                      >
                          <MenuItem value={0} disabled>
                          Technical/Functional Experience & Exposure
                          </MenuItem>
                          {technicalEvaluation.length > 0 &&
                          technicalEvaluation.map((e) => (
                              <MenuItem value={e.value} key={e.value}>
                              {e.label}
                              </MenuItem>
                          ))}
                      </Select>
                      </FormControl>
                      </Grid>
                      <Grid item md={6} xs={12} sx={{mt:5}}>
                      <TextField
                          id="filled-multiline-static"
                          label="Description"
                          multiline
                          rows={1}
                          className="multiline"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name="technicalExperience.comment"
                          // defaultValue="Default Value"
                          value={formik.values.technicalExperience.comment}
                          inputProps={
                              editData.technicalExperience.comment != ""?
                               {readOnly: true} : {readOnly: false}
                            }
                          variant="filled"
                          fullWidth
                      />
                  </Grid>
            </Grid>
            </Box>
  
            <Box>
              <Typography sx={{mt:2}}  className="feedback_section">
              Dealing with People/Self
              </Typography>
              <Grid className="feedback_header_1" container spacing={3}>
              <Grid item md={3} xs={12}>
                  <Typography align="left" color="GrayText" className="feedbackFieldHeader">Initiative</Typography>
                  <Typography  align="left" className="subHeadingRating">(Ability to propose & start  new things on his / her own without guidance & supervision)</Typography>
              </Grid>
              <Grid item md={3} xs={12} sx={{mt:1}}>
                  <FormControl
                      size="small"
                      variant="filled"
                      sx={{ minWidth: 140, width: "100%" }}
                      align="left"
                      >
                      <InputLabel> Rating Scale</InputLabel>
                      <Select
                          labelId="demo-simple-select-label"
                          label="Initiative"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name="initiative.rate"
                          value={formik.values.initiative.rate}
                          inputProps={
                              editData.initiative.rate != ""?
                               {readOnly: true} : {readOnly: false}
                            }
                      >
                          <MenuItem value={0} disabled>
                          Initiative
                          </MenuItem>
                          {technicalEvaluation.length > 0 &&
                          technicalEvaluation.map((e) => (
                              <MenuItem value={e.value} key={e.value}>
                              {e.label}
                              </MenuItem>
                          ))}
                      </Select>
                  </FormControl>
                  </Grid>
                  <Grid item md={6} xs={12}>
                  <TextField
                      className="multiline"
                      id="filled-multiline-static"
                      label="Description"
                      multiline
                      rows={1}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="initiative.comment"
                      value={ formik.values.initiative.comment}
                      inputProps={
                          editData.initiative.comment != ""?
                           {readOnly: true} : {readOnly: false}
                        }
                      // defaultValue="Default Value"
                      variant="filled"
                      fullWidth
                  />
                  </Grid>
  
                  <Grid item md={3} xs={12}>
                  <Typography align="left" color="GrayText" className="feedbackFieldHeader">Communication and Interpersonal Skills</Typography>
                  <Typography align="left" className="subHeadingRating">(Verbal, Non Verbal and Written ability to articulate ones thoughts)
                  </Typography>
                  </Grid>
                  <Grid item md={3} xs={12} sx={{mt:3}}>
                  <FormControl
                      variant="filled"
                      size="small"
                      sx={{ minWidth: 140, width: "100%" }}
                      align="left"
                      >
                      <InputLabel> Rating Scale</InputLabel>
                      <Select
                          labelId="demo-simple-select-label"
                          label="Communication and Interpersonal Skills"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name="communication.rate"
                          value={formik.values.communication.rate}
                          inputProps={
                              editData.communication.rate != ""?
                               {readOnly: true} : {readOnly: false}
                            }
                      >
                          <MenuItem value={0} disabled>
                          Communication and Interpersonal Skills
                          </MenuItem>
                          {technicalEvaluation.length > 0 &&
                          technicalEvaluation.map((e) => (
                              <MenuItem value={e.value} key={e.value}>
                              {e.label}
                              </MenuItem>
                          ))}
                      </Select>
                      </FormControl>
                      </Grid>
                      <Grid item md={6} xs={12} sx={{mt:2}}>
                      <TextField
                          id="filled-multiline-static"
                          label="Description"
                          multiline
                          rows={1}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name="communication.comment"
                          value={formik.values.communication.comment}
                          // defaultValue="Default Value"
                          variant="filled"
                          fullWidth
                          inputProps={
                              editData.communication.comment != ""?
                               {readOnly: true} : {readOnly: false}
                            }
                      />
                  </Grid>
  
                  <Grid item md={3} xs={12}>
                  <Typography align="left" color="GrayText" className="feedbackFieldHeader">Self Confidence</Typography>
                  <Typography align="left" className="subHeadingRating">(Faith in one's own ideas and capability to be successful; willingness to take an independent position in the face of opposition)</Typography>
                  </Grid>
                  <Grid item md={3} xs={12} sx={{mt:3}}>
                  <FormControl
                      variant="filled"
                      size="small"
                      sx={{ minWidth: 140, width: "100%" }}
                      align="left"
                      >
                      <InputLabel>Rating Scale</InputLabel>
                      <Select
                          labelId="demo-simple-select-label"
                          label="Self Confidence"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name="selfConfidence.rate"
                          value={formik.values.selfConfidence.rate}
                          inputProps={
                             editData.selfConfidence.rate != ""?
                               {readOnly: true} : {readOnly: false}
                            }
                      >
                          <MenuItem value={0} disabled>
                          Self Confidence
                          </MenuItem>
                          {technicalEvaluation.length > 0 &&
                          technicalEvaluation.map((e) => (
                              <MenuItem value={e.value} key={e.value}>
                              {e.label}
                              </MenuItem>
                          ))}
                      </Select>
                      </FormControl>
                      </Grid>
                      <Grid item md={6} xs={12} sx={{mt:2}}>
                      <TextField
                          id="filled-multiline-static"
                          label="Description"
                          multiline
                          rows={1}
                          className="multiline"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name="selfConfidence.comment"
                          value={ formik.values.selfConfidence.comment}
                          variant="filled"
                          fullWidth
                          inputProps={
                              editData.selfConfidence.comment != ""?
                               {readOnly: true} : {readOnly: false}
                            }
                      />
                  </Grid>
  
                  <Grid item md={3} xs={12}>
                  <Typography align="left" color="GrayText" className="feedbackFieldHeader">Flexibility</Typography>
                  <Typography align="left" className="subHeadingRating">(Willingness to work in Shifts,Relocation -Onsite/Local)</Typography>
                  </Grid>
                  <Grid item md={3} xs={12} sx={{mt:1}}>
                  <FormControl
                      variant="filled"
                      size="small"
                      sx={{ minWidth: 140, width: "100%" }}
                      align="left"
                      >
                      <InputLabel>Rating Scale</InputLabel>
                      <Select
                          labelId="demo-simple-select-label"
                          label="Flexibility"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name="flexibility.rate"
                          value={formik.values.flexibility.rate}
                          inputProps={
                              editData.flexibility.rate != ""?
                               {readOnly: true} : {readOnly: false}
                            }
                          
                      >
                          <MenuItem value={0} disabled>
                          Flexibility
                          </MenuItem>
                          {technicalEvaluation.length > 0 &&
                          technicalEvaluation.map((e) => (
                              <MenuItem value={e.value} key={e.value}>
                              {e.label}
                              </MenuItem>
                          ))}
                      </Select>
                      </FormControl>
                      </Grid>
                      <Grid item md={6} xs={12}>
                      <TextField
                          id="filled-multiline-static"
                          label="Description"
                          multiline
                          rows={1}
                          className="multiline"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name="flexibility.comment"
                          value={formik.values.flexibility.comment}
                          variant="filled"
                          fullWidth
                          inputProps={
                              editData.flexibility.comment != ""?
                               {readOnly: true} : {readOnly: false}
                            }
                      />
                  </Grid>
                  <Grid item md={3} xs={12} sx={{mt:3}}>
                      <Typography align="left" color="GrayText" className="feedbackFieldHeader">Candidate Seems Strong In</Typography>
                  </Grid>
                  <Grid item md={3} xs={12}>
                      <TextField
                          id="filled-multiline-static"
                          label="Description"
                          multiline
                          rows={1}
                          className="multiline"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name="strongSkills"
                          value={formik.values.strongSkills}
                          variant="filled"
                          fullWidth
                          inputProps={
                              editData.strongSkills != ""?
                               {readOnly: true} : {readOnly: false}
                            }
                      />
                  </Grid>
                  <Grid item md={3} xs={12} sx={{mt:3}}>
                      <Typography align="left" color="GrayText" className="feedbackFieldHeader">Candidate requires training on</Typography>
                  </Grid>
                  <Grid item md={3} xs={12}>
                      <TextField
                          id="filled-multiline-static"
                          label="Description"
                          multiline
                          rows={1}
                          className="multiline"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name="trainingRequire"
                          value={ formik.values.trainingRequire}
                          variant="filled"
                          fullWidth
                          inputProps={
                              editData.trainingRequire != ""?
                               {readOnly: true} : {readOnly: false}
                            }
                      />
                  </Grid>
            </Grid>
            </Box>
  
            <Box>
            <Typography  className="feedback_section" sx={{mt:3}}>
                  Overall Remarks
              </Typography>  
              <Grid className="feedback_header_1" container spacing={1}>
              <Grid item md={4} xs={12} sx={{mt:2}}>
                  {/* <Typography align="left" color="GrayText" className="feedbackFieldHeader">Rating Scale</Typography> */}
                  <FormControl
                      size="small"
                      variant="filled"
                      sx={{ minWidth: 140, width: "100%" }}
                      align="left"
                      >
                      <InputLabel>Overall Rating Scale <span className="required">*</span></InputLabel>
                      <Select
                          error={Boolean(formik.touched.ratingScale && formik.errors.ratingScale)}
                          helperText={formik.touched.ratingScale && formik.errors.ratingScale}
                          labelId="demo-simple-select-label"
                          label="rating scale"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name="ratingScale"
                          value={formik.values.ratingScale}
                          inputProps={
                              editData.ratingScale != ""?
                               {readOnly: true} : {readOnly: false}
                            }
                          required
                      >
                          <MenuItem value={0} disabled>
                          Rating Scale
                          </MenuItem>
                          {rating.length > 0 &&
                          rating.map((e) => (
                              <MenuItem value={e.value} key={e.value}>
                              {e.label}
                              </MenuItem>
                          ))}
                      </Select>
                      </FormControl>
                  </Grid>
              <Grid item md={8} xs={12}>                
                  <Box sx={{mt:1}}>
                  <TextField
                      className="multiline"
                      id="filled-multiline-static"
                      label="Overall Review / Comments"
                      multiline
                      rows={1}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="remark"
                      value={formik.values.remark}
                      variant="filled"
                      fullWidth
                      inputProps={
                          editData.remark != ""?
                           {readOnly: true} : {readOnly: false}
                        }
                  />
                  </Box>
                  </Grid> 
            </Grid> 
            </Box>
  
          <Box sx={{ py: 2 }}>
          <Stack direction="row" spacing={2} className="feedbackButton" >
            {/* <Button
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
              // disabled={formik.isSubmitting}
              // fullWidth
              size="medium"
              type="submit"
              variant="outlined"
              color="error"
            >
              Deactive
            </Button> */}
            {editData.ratingScale != "" ?
            <Button
              className="submit-button"
              variant="contained" 
              color="success"
              disabled={formik.isSubmitting}
              // fullWidth
              size="medium"
              type="submit"
              sx={{display:"none"}}
            >
              Save
            </Button>
            :
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
          </Button>}
            {/* <Button
              className="submit-button"
              // disabled={formik.isSubmitting}
              // fullWidth
              size="medium"
              type="submit"
              variant="outlined"
              color="secondary"
            >
              Next
            </Button> */}
            </Stack>
            </Box>
          </form>
          </Box>
        </>
    );
};


export default FeedbackForm;