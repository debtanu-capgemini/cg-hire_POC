import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";

const steps = ["Basic Information", "Interview Process", "Final Process"];

export default function HireProcessBar() {
  const [activeStep, setActiveStep] = React.useState(1);
  const [completed, setCompleted] = React.useState([true]);

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
