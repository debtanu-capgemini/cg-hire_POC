import { React, useState, useEffect } from "react";
import ApplicantEditForm from "./ApplicantEditForm";
import { useParams } from "react-router";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import ApplicantFinalProcess from "./ApplicantFinalProcess";
import { Box } from "@mui/material";
import UpdateFeedbackForm from "./UpdateFeedbackForm";
import FeedbackForm from "./FeedbackForm";
import ApplicantFeedbackForm from "./ApplicantFeedbackForm";
const steps = [ "Technical Evaluation", "Behavioral evaluation"];

const getActiveStep = () => {
  const activeStep = localStorage.getItem("activeStep");
  console.log("active step", activeStep);
  if (activeStep) {
    return parseInt(activeStep);
  }
  return 0;
};

const Form2 = () => {
  return (
    <div>
      <h1>Final Process</h1>
    </div>
  );
};

export default function EditFeedback() {
  const { id } = useParams();
  const [editData, setEditData] = useState("");
  const [activeStep, setActiveStep] = useState(getActiveStep());
  const [completed, setCompleted] = useState([]);

  async function getEditData() {
    let obj = {
      key: "id",
      val: parseInt(id),
    };
    let url = `http://localhost:8080/candidate?q=${JSON.stringify(obj)}`;

    let response = await fetch(url);
    let data = await response.json();

    setEditData(data.result[0]);
  }

  useEffect(() => {
    getEditData();
  }, []);
  const handleStep = (step) => () => {
    setActiveStep(step);
    localStorage.setItem("activeStep", step);
  };
  function candidateForm(activeStep) {
    if (activeStep === 0 && editData) {
      return <FeedbackForm editData={editData} Candid={id} />;
    }
    
    if (activeStep === 1 && editData) {
      return <FeedbackForm editData={editData} Candid={id} />;
    }
  }

  return (
    <div className="edit-candidate-box ">
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>

      <Box
        sx={{
          "& .MuiFilledInput-root, .MuiFilledInput-root:hover, .MuiFilledInput-root:not(:active)":
            {
              background: "white",
            },

          "& .MuiSelect-select:focus": {
            background: "white",
          },
        }}
      >
        {candidateForm(activeStep)}
      </Box>
    </div>
  );
}
