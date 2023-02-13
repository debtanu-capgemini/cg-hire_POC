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


const ApplicantFeedbackForm = ({edit,Candid}) =>{
    const [open, setOpen] = useState(false);
    const [msg, setmsg] = useState("");

    const validationSchema = Yup.object({
        ratingScale: Yup.string().required("Rating is required"),
        ModeOfInterview: Yup.string().required("mode of Interview is required"),
      });

      useEffect(() => {
    
        // getJobIdData();
        // getcgUserData();
      },
        [edit]);
    console.log(edit,"edit");
    const formik = useFormik({
        initialValues: {
            ratingScale:edit.ratingScale,
            ModeOfInterview:edit.ModeOfInterview,
            ProblemSolvingSkill:{
                rate:edit.ProblemSolvingSkill.rate,
                comment:edit.ProblemSolvingSkill.comment
            },
            jobKnowledge:{
                rate:edit.jobKnowledge.rate,
                comment:edit.jobKnowledge.comment
            },
            technicalExperience:{
                rate:edit.technicalExperience.rate,
                comment:edit.technicalExperience.comment
            },
            initiative:{
                rate:edit.initiative.rate,
                comment:edit.initiative.comment
            },
            communication:{
                rate:edit.communication.rate,
                comment:edit.communication.comment
            },
            selfConfidence:{
                rate:edit.selfConfidence.rate,
                comment:edit.selfConfidence.comment
            },
            flexibility:{
                rate:edit.flexibility.rate,
                comment:edit.flexibility.comment
            },
            remark:edit.remark,
            creted_by:"",
            modify_by:""
        },

        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values,"values");
            async function putData() {
            //   let url = "http://localhost:8080/candidate";
            //   let ps= values.ProblemSolvingSkill;
              let body = {
                id: parseInt(Candid),
                fname: edit.fname,
                lName: edit.lName,
                email: edit.email,
                mobile: edit.mobile,
                location: edit.location,
                skill: edit.skill,
                experience: edit.experience,
                position: edit.position,
                assign: edit.assign,
                idType:edit.idType,
                idNumber: edit.idNumber,
                address: {
                    country: edit.address.country,
                    state:edit.address.state,
                    city: edit.address.city,
                    address1: edit.address.address1,
                    pincode: edit.address.pincode,
                },
                status:edit.status,
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
                creted_by: values["creted_by"],
                modify_by:values["modify_by"]
              };
              let obj={
                key:"id",
                val:parseInt(Candid)
              
              }
              let url = `http://localhost:8080/candidate?q=${JSON.stringify(obj)}`;
                // console.log(body,"data");
                console.log(url,"url");
                // alert(url);
                console.log(JSON.stringify(body),"body");
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

            //   console.log(obj);
            //   const response = await fetch(url, {
            //     method: "POST",
            //     headers: {
            //       "Content-type": "application/json",
            //     },
            //     body: JSON.stringify(obj),
            //   });
            //   const resData = await response.json();
            //   console.log(resData);
            //   if (resData) {
            //     setOpen(true);
            //     setmsg("Candidate Successfully Registered");
            //     console.log(setmsg);
            //   }
            }
            putData();
            // window.location.reload();
          },
    });
    return (
        // <>
        // <form onSubmit={formik.handleSubmit}>
        //     <Box sx={{ my: 6 }}>
        //         <Typography variant="h5" component="div" className="feedback_header_1">
        //         Interview Assessment Workbook
        //         </Typography>
        //         <Typography variant="h7" component="div" className="feedback_subheader_1">
        //         (For C and SC- 1st level Technical Interview)
        //         </Typography>
        //     </Box>
        //     <Box>
        //     <Typography  className="feedback_section">
        //         Candidate Details
        //     </Typography>
        //     <Grid className="feedback_header_1" container spacing={3}>
        //         <Grid item md={4} xs={12}>
        //         <FormControl
        //         size="small"
        //         sx={{ minWidth: 140, width: "100%" }}
        //         align="left"
        //         className="textFieldColor"
        //       >
        //         {/* <InputLabel>Candidate Name</InputLabel> */}
        //         <TextField
        //         //   error={Boolean(formik.touched.fName && formik.errors.fName)}
        //         //   helperText={formik.touched.fName && formik.errors.fName}
        //           label="Candidate Name:"
        //           // margin="none"
        //           size="small"
        //           name="fname"
        //           onChange={formik.handleChange}
        //           onBlur={formik.handleBlur}
        //           required
        //           value={formik.values.fname}
        //           variant="filled"
        //           // color="#FFFFFF"

        //           fullWidth
        //         />
        //       </FormControl>

        //         </Grid>
        //     </Grid>
        //     <Grid className="feedback_header_1" container spacing={3}>
        //         <Grid item md={6} xs={12}>
        //         <Typography align="left" color="GrayText" className="feedbackFieldHeader">Rating Scale</Typography>
        //         <FormControl
        //             size="small"
        //             variant="filled"
        //             sx={{ minWidth: 140, width: "100%" }}
        //             align="left"
        //             >
        //             <InputLabel> Rating Scale</InputLabel>
        //             <Select
        //                 error={Boolean(formik.touched.ratingScale && formik.errors.ratingScale)}
        //                 helperText={formik.touched.ratingScale && formik.errors.ratingScale}
        //                 labelId="demo-simple-select-label"
        //                 label="rating scale"
        //                 onChange={formik.handleChange}
        //                 onBlur={formik.handleBlur}
        //                 name="ratingScale"
        //                 value={formik.values.ratingScale}
        //             >
        //                 <MenuItem value={0} disabled>
        //                 Rating Scale
        //                 </MenuItem>
        //                 {rating.length > 0 &&
        //                 rating.map((e) => (
        //                     <MenuItem value={e.value} key={e.value}>
        //                     {e.label}
        //                     </MenuItem>
        //                 ))}
        //             </Select>
        //             </FormControl>
        //         </Grid>
        //          <Grid item md={6} xs={12}>
        //         <Typography align="left" color="GrayText" className="feedbackFieldHeader">Mode of Interview</Typography>
        //         <FormControl
        //             variant="filled"
        //             size="small"
        //             sx={{ minWidth: 140, width: "100%" }}
        //             align="left"
        //             >
        //             <InputLabel> Mode of Interview</InputLabel>
        //             <Select
        //                 error={Boolean(formik.touched.ModeOfInterview && formik.errors.ModeOfInterview)}
        //                 helperText={formik.touched.ModeOfInterview && formik.errors.ModeOfInterview}
        //                 labelId="demo-simple-select-label"
        //                 label="Mode of Interview"
        //                 onChange={formik.handleChange}
        //                 onBlur={formik.handleBlur}
        //                 name="ModeOfInterview"
        //                 value={formik.values.ModeOfInterview}
        //             >
        //                 <MenuItem value={0} disabled>
        //                 Mode of Interview
        //                 </MenuItem>
        //                 {interviewMode.length > 0 &&
        //                 interviewMode.map((moi) => (
        //                     <MenuItem value={moi.value} key={moi.value}>
        //                     {moi.label}
        //                     </MenuItem>
        //                 ))}
        //             </Select>
        //             </FormControl>
        //         </Grid>
        //   </Grid>
        //   </Box>

        //   <Box>
        //     <Typography  className="feedback_section">
        //         Technical Evalution
        //     </Typography>
        //     <Grid className="feedback_header_1" container spacing={3}>
        //     <Grid item md={6} xl={4} xs={12}>
        //         <Typography align="left" color="GrayText" className="feedbackFieldHeader">Problem Solving / Analytical Ability</Typography>
        //         <FormControl
        //             size="small"
        //             variant="filled"
        //             sx={{ minWidth: 140, width: "100%" }}
        //             align="left"
        //             >
        //             <InputLabel> Rating Scale</InputLabel>
        //             <Select
        //                 labelId="demo-simple-select-label"
        //                 label="Problem Solving / Analytical Ability"
        //                 onChange={formik.handleChange}
        //                 onBlur={formik.handleBlur}
        //                 name="ProblemSolvingSkill.rate"
        //                 value={formik.values.ProblemSolvingSkill.rate}
        //             >
        //                 <MenuItem value={0} disabled>
        //                 Problem Solving / Analytical Ability
        //                 </MenuItem>
        //                 {technicalEvaluation.length > 0 &&
        //                 technicalEvaluation.map((e) => (
        //                     <MenuItem value={e.value} key={e.value}>
        //                     {e.label}
        //                     </MenuItem>
        //                 ))}
        //             </Select>
        //         </FormControl>
        //         <Box sx={{mt:2}}>
        //         <TextField
        //             className="multiline"
        //             id="filled-multiline-static"
        //             label="Description"
        //             onChange={formik.handleChange}
        //             onBlur={formik.handleBlur}
        //             multiline
        //             rows={2}
        //             // defaultValue="Default Value"
        //             variant="filled"
        //             name="ProblemSolvingSkill.comment"
        //             value={formik.values.ProblemSolvingSkill.comment}
        //             fullWidth
        //         />
        //         </Box>
        //         </Grid>
        //         <Grid item md={6} xl={4} xs={12}>
        //         <Typography align="left" color="GrayText" className="feedbackFieldHeader">Business and Job Knowledge</Typography>
        //         <FormControl
        //             variant="filled"
        //             size="small"
        //             sx={{ minWidth: 140, width: "100%" }}
        //             align="left"
        //             >
        //             <InputLabel> Business and Job Knowledge</InputLabel>
        //             <Select
        //                 labelId="demo-simple-select-label"
        //                 label="Business and Job Knowledge"
        //                 onChange={formik.handleChange}
        //                 onBlur={formik.handleBlur}
        //                 name="jobKnowledge.rate"
        //                 value={formik.values.jobKnowledge.rate}
        //             >
        //                 <MenuItem value={0} disabled>
        //                 Business and Job Knowledge
        //                 </MenuItem>
        //                 {technicalEvaluation.length > 0 &&
        //                 technicalEvaluation.map((e) => (
        //                     <MenuItem value={e.value} key={e.value}>
        //                     {e.label}
        //                     </MenuItem>
        //                 ))}
        //             </Select>
        //             </FormControl>
        //             <Box sx={{mt:2}}>
        //             <TextField
        //                 id="filled-multiline-static"
        //                 label="Description"
        //                 multiline
        //                 rows={2}
        //                 onChange={formik.handleChange}
        //                 onBlur={formik.handleBlur}
        //                 name="jobKnowledge.comment"
        //                 // defaultValue="Default Value"
        //                 value={formik.values.jobKnowledge.comment}
        //                 variant="filled"
        //                 fullWidth
        //             />
        //             </Box>
        //         </Grid>
        //         <Grid item md={6} xl={4} xs={12}>
        //         <Typography align="left" color="GrayText" className="feedbackFieldHeader">Technical/Functional Experience & Exposure</Typography>
        //         <FormControl
        //             variant="filled"
        //             size="small"
        //             sx={{ minWidth: 140, width: "100%" }}
        //             align="left"
        //             >
        //             <InputLabel>Technical/Functional Experience & Exposure</InputLabel>
        //             <Select
        //                 labelId="demo-simple-select-label"
        //                 label="Technical/Functional Experience & Exposure"
        //                 onChange={formik.handleChange}
        //                 onBlur={formik.handleBlur}
        //                 name="technicalExperience.rate"
        //                 value={formik.values.technicalExperience.rate}
        //             >
        //                 <MenuItem value={0} disabled>
        //                 Technical/Functional Experience & Exposure
        //                 </MenuItem>
        //                 {technicalEvaluation.length > 0 &&
        //                 technicalEvaluation.map((e) => (
        //                     <MenuItem value={e.value} key={e.value}>
        //                     {e.label}
        //                     </MenuItem>
        //                 ))}
        //             </Select>
        //             </FormControl>
        //             <Box sx={{mt:2}}>
        //             <TextField
        //                 id="filled-multiline-static"
        //                 label="Description"
        //                 multiline
        //                 rows={2}
        //                 className="multiline"
        //                 onChange={formik.handleChange}
        //                 onBlur={formik.handleBlur}
        //                 name="technicalExperience.comment"
        //                 // defaultValue="Default Value"
        //                 value={formik.values.technicalExperience.comment}
        //                 variant="filled"
        //                 fullWidth
        //             />
        //             </Box>
        //         </Grid>
        //   </Grid>
        //   </Box>

        //   <Box>
        //     <Typography  className="feedback_section">
        //     Dealing with People/Self
        //     </Typography>
        //     <Grid className="feedback_header_1" container spacing={3}>
        //     <Grid item md={6} xl={4} xs={12}>
        //         <Typography align="left" color="GrayText" className="feedbackFieldHeader">Initiative</Typography>
        //         <FormControl
        //             size="small"
        //             variant="filled"
        //             sx={{ minWidth: 140, width: "100%" }}
        //             align="left"
        //             >
        //             <InputLabel> Initiative</InputLabel>
        //             <Select
        //                 labelId="demo-simple-select-label"
        //                 label="Initiative"
        //                 onChange={formik.handleChange}
        //                 onBlur={formik.handleBlur}
        //                 name="initiative.rate"
        //                 value={formik.values.initiative.rate}
        //             >
        //                 <MenuItem value={0} disabled>
        //                 Initiative
        //                 </MenuItem>
        //                 {technicalEvaluation.length > 0 &&
        //                 technicalEvaluation.map((e) => (
        //                     <MenuItem value={e.value} key={e.value}>
        //                     {e.label}
        //                     </MenuItem>
        //                 ))}
        //             </Select>
        //         </FormControl>
        //         <Box sx={{mt:2}}>
        //         <TextField
        //             className="multiline"
        //             id="filled-multiline-static"
        //             label="Description"
        //             multiline
        //             rows={2}
        //             onChange={formik.handleChange}
        //             onBlur={formik.handleBlur}
        //             name="initiative.comment"
        //             value={formik.values.initiative.comment}
        //             // defaultValue="Default Value"
        //             variant="filled"
        //             fullWidth
        //         />
        //         </Box>
        //         </Grid>
        //         <Grid item md={6} xl={4} xs={12}>
        //         <Typography align="left" color="GrayText" className="feedbackFieldHeader">Communication and Interpersonal Skills</Typography>
        //         <FormControl
        //             variant="filled"
        //             size="small"
        //             sx={{ minWidth: 140, width: "100%" }}
        //             align="left"
        //             >
        //             <InputLabel> Communication and Interpersonal Skills</InputLabel>
        //             <Select
        //                 labelId="demo-simple-select-label"
        //                 label="Communication and Interpersonal Skills"
        //                 onChange={formik.handleChange}
        //                 onBlur={formik.handleBlur}
        //                 name="communication.rate"
        //                 value={formik.values.communication.rate}
        //             >
        //                 <MenuItem value={0} disabled>
        //                 Communication and Interpersonal Skills
        //                 </MenuItem>
        //                 {technicalEvaluation.length > 0 &&
        //                 technicalEvaluation.map((e) => (
        //                     <MenuItem value={e.value} key={e.value}>
        //                     {e.label}
        //                     </MenuItem>
        //                 ))}
        //             </Select>
        //             </FormControl>
        //             <Box sx={{mt:2}}>
        //             <TextField
        //                 id="filled-multiline-static"
        //                 label="Description"
        //                 multiline
        //                 rows={2}
        //                 onChange={formik.handleChange}
        //                 onBlur={formik.handleBlur}
        //                 name="communication.comment"
        //                 value={formik.values.communication.comment}
        //                 // defaultValue="Default Value"
        //                 variant="filled"
        //                 fullWidth
        //             />
        //             </Box>
        //         </Grid>
        //         <Grid item md={6} xl={4} xs={12}>
        //         <Typography align="left" color="GrayText" className="feedbackFieldHeader">Self Confidence</Typography>
        //         <FormControl
        //             variant="filled"
        //             size="small"
        //             sx={{ minWidth: 140, width: "100%" }}
        //             align="left"
        //             >
        //             <InputLabel>Self Confidence</InputLabel>
        //             <Select
        //                 labelId="demo-simple-select-label"
        //                 label="Self Confidence"
        //                 onChange={formik.handleChange}
        //                 onBlur={formik.handleBlur}
        //                 name="selfConfidence.rate"
        //                 value={formik.values.selfConfidence.rate}
        //             >
        //                 <MenuItem value={0} disabled>
        //                 Self Confidence
        //                 </MenuItem>
        //                 {technicalEvaluation.length > 0 &&
        //                 technicalEvaluation.map((e) => (
        //                     <MenuItem value={e.value} key={e.value}>
        //                     {e.label}
        //                     </MenuItem>
        //                 ))}
        //             </Select>
        //             </FormControl>
        //             <Box sx={{mt:2}}>
        //             <TextField
        //                 id="filled-multiline-static"
        //                 label="Description"
        //                 multiline
        //                 rows={2}
        //                 className="multiline"
        //                 onChange={formik.handleChange}
        //                 onBlur={formik.handleBlur}
        //                 name="selfConfidence.comment"
        //                 value={formik.values.selfConfidence.comment}
        //                 variant="filled"
        //                 fullWidth
        //             />
        //             </Box>
        //         </Grid>

        //         <Grid item md={6} xl={4} xs={12}>
        //         <Typography align="left" color="GrayText" className="feedbackFieldHeader">Flexibility</Typography>
        //         <FormControl
        //             variant="filled"
        //             size="small"
        //             sx={{ minWidth: 140, width: "100%" }}
        //             align="left"
        //             >
        //             <InputLabel>Flexibility</InputLabel>
        //             <Select
        //                 labelId="demo-simple-select-label"
        //                 label="Flexibility"
        //                 onChange={formik.handleChange}
        //                 onBlur={formik.handleBlur}
        //                 name="flexibility.rate"
        //                 value={formik.values.flexibility.rate}
                        
        //             >
        //                 <MenuItem value={0} disabled>
        //                 Flexibility
        //                 </MenuItem>
        //                 {technicalEvaluation.length > 0 &&
        //                 technicalEvaluation.map((e) => (
        //                     <MenuItem value={e.value} key={e.value}>
        //                     {e.label}
        //                     </MenuItem>
        //                 ))}
        //             </Select>
        //             </FormControl>
        //             <Box sx={{mt:2}}>
        //             <TextField
        //                 id="filled-multiline-static"
        //                 label="Description"
        //                 multiline
        //                 rows={2}
        //                 className="multiline"
        //                 onChange={formik.handleChange}
        //                 onBlur={formik.handleBlur}
        //                 name="flexibility.comment"
        //                 value={formik.values.flexibility.comment}
        //                 variant="filled"
        //                 fullWidth
        //             />
        //             </Box>
        //         </Grid>
        //   </Grid>
        //   </Box>

        //   <Box>
        //   <Typography  className="feedback_section">
        //         Overall Remarks
        //     </Typography>
        //     <Grid className="feedback_header_1" container spacing={3}>
        //     <Grid item md={12} xs={12}>                
        //         <Box sx={{mt:1}}>
        //         <TextField
        //             className="multiline"
        //             id="filled-multiline-static"
        //             label="Description"
        //             multiline
        //             rows={2}
        //             onChange={formik.handleChange}
        //             onBlur={formik.handleBlur}
        //             name="remark"
        //             value={formik.values.remark}
        //             variant="filled"
        //             fullWidth
        //         />
        //         </Box>
        //         </Grid> 
        //   </Grid> 
        //   </Box>

        // <Box sx={{ py: 2 }}>
        // <Stack direction="row" spacing={2} className="feedbackButton" >
        //   {/* <Button
        //     className="submit-button"
        //     // disabled={formik.isSubmitting}
        //     // fullWidth
        //     size="medium"
        //     type="submit"
        //     variant="outlined"
        //     color="secondary"
        //   >
        //     Back
        //   </Button>
        //   <Button
        //     className="submit-button"
        //     // disabled={formik.isSubmitting}
        //     // fullWidth
        //     size="medium"
        //     type="submit"
        //     variant="outlined"
        //     color="error"
        //   >
        //     Deactive
        //   </Button> */}
        //   <Button
        //     className="submit-button"
        //     variant="contained" 
        //     color="success"
        //     disabled={formik.isSubmitting}
        //     // fullWidth
        //     size="medium"
        //     type="submit"
        //   >
        //     Save
        //   </Button>
        //   {/* <Button
        //     className="submit-button"
        //     // disabled={formik.isSubmitting}
        //     // fullWidth
        //     size="medium"
        //     type="submit"
        //     variant="outlined"
        //     color="secondary"
        //   >
        //     Next
        //   </Button> */}
        //   </Stack>
        //   </Box>
        // </form>
        // </>

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
                    value={`${edit.fname} ${edit.lName}`}
                    inputProps={
                      formik.values.fname != ""?
                       {readOnly: true} : {readOnly: false}
                    }
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
                      edit.skill != ""?
                       {readOnly: true} : {readOnly: false}
                    }
                    value={`${edit.skill}`}
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
                    value={`${edit.experience}`}
                    inputProps={
                      edit.experience != ""?
                       {readOnly: true} : {readOnly: false}
                    }
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
                    // margin="none"
                    id="outlined"
                    size="small"
                    name="interviewDate"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={"date"}
                    inputProps={
                      
                       {readOnly: true} 
                    }
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
                    value={`${edit.location}`}
                    inputProps={
                      edit.location != ""?
                       {readOnly: true} : {readOnly: false}
                    }
                  //   variant="filled"
                    // color="#FFFFFF"
                 
                    fullWidth
                  />
                </FormControl>
                  </Grid>
  
                  <Grid item md={4} xs={12}>
                  <Card sx={{ maxWidth: 180,ml:6,borderRadius: "47% ",justifyContent: 'center' }}>
        
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
                              edit.ModeOfInterview != ""?
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
                              edit.ProblemSolvingSkill.rate != ""?
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
                          edit.ProblemSolvingSkill.comment != ""?
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
                              edit.jobKnowledge.rate != ""?
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
                              edit.jobKnowledge.comment != ""?
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
                              edit.technicalExperience.rate != ""?
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
                              edit.technicalExperience.comment != ""?
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
                              edit.initiative.rate != ""?
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
                          edit.initiative.comment != ""?
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
                              edit.communication.rate != ""?
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
                              edit.communication.comment != ""?
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
                             edit.selfConfidence.rate != ""?
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
                              edit.selfConfidence.comment != ""?
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
                              edit.flexibility.rate != ""?
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
                              edit.flexibility.comment != ""?
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
                          name="flexibility.comment"
                          value={formik.values.strongSkills}
                          variant="filled"
                          fullWidth
                          inputProps={
                              edit.strongSkills != ""?
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
                          name="flexibility.comment"
                          value={ formik.values.trainingRequire}
                          variant="filled"
                          fullWidth
                          inputProps={
                              edit.trainingRequire != ""?
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
                              edit.ratingScale != ""?
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
                          edit.remark != ""?
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
    );
};


export default ApplicantFeedbackForm;