import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { CircularProgress, Grid } from "@mui/material";
import Step1 from "./Steps/step1";
import Step2 from "./Steps/step2";
import useApi from "../hooks/useApi";
import Result from "./Steps/result";
const steps = ["Upload Resume", "Add Job Description", "Submit"];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [formState, setFormmState] = React.useState({});
  const { hanldeSubmit, data, laoding, handleReset } = useApi();
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (activeStep == 1 && formState?.files && formState.jobDescription) {
      hanldeSubmit({ formDataa: formState });
      console.log("asdfas");
      return;
    }
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  console.log(formState, activeStep);
  return (
    <Grid pl={10} pr={10}>
      <Box sx={{ width: "100%" }}>
        {data ? (
          <>
            <Result data={data} />
            <Button
              color="primary"
              onClick={() => {
                setActiveStep(0);
                handleReset();
              }}
              sx={{ mr: 1, mt: 5 }}
            >
              Reset / Try Another
            </Button>
          </>
        ) : (
          <>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>

            {laoding ? (
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                height={300}
              >
                <CircularProgress />
              </Box>
            ) : (
              <React.Fragment>
                <Grid
                  container
                  justifyContent={"center"}
                  mt={3}
                  minHeight={200}
                  alignItems={"center"}
                >
                  {activeStep == 0 && (
                    <Step1
                      handleSubmit={(file) => {
                        setFormmState({
                          files: file,
                        });
                      }}
                    />
                  )}
                  {activeStep == 1 && (
                    <Step2
                      handleSubmit={(e) => {
                        setFormmState({
                          ...formState,
                          jobDescription: e.target.value,
                        });
                      }}
                    />
                  )}
                </Grid>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button
                    onClick={handleNext}
                    disabled={
                      !formState?.files ||
                      (activeStep == 1) & !formState?.jobDescription
                    }
                  >
                    {activeStep === steps.length - 2 ? "Finish" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </>
        )}
      </Box>
    </Grid>
  );
}
