import React, { useState } from "react";
import { useStyles } from "./style";
import {
  Card,
  CardActions,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { difficultyOptions, interestOptions } from "../common/utils";
import Button from "../common/components/button/button";
import { useNavigate } from "react-router-dom";
import { Tilt } from "react-next-tilt";
function ChoiceForm() {
  const classes = useStyles();
  const [gameSettings, setGameSettings] = useState<any>({
    interest: "",
    difficulty: "",
    interestError: "",
    difficultyError: "",
  });
  const navigate = useNavigate();
  const handleFormSubmit = () => {
    if (!gameSettings?.interest) {
      setGameSettings((prev: any) => {
        return {
          ...prev,
          interestError: "Please select an interest",
        };
      });
    } else if (!gameSettings?.difficulty) {
      setGameSettings((prev: any) => {
        return {
          ...prev,
          difficultyError: "Please select an difficulty",
        };
      });
    } else {
      navigate("/questions", {
        state: {
          gameSettings,
        },
      });
    }
  };
  return (
    <div className={classes.container}>
      <Grid container>
        <Grid item xs={12} md={2} sm={2} lg={2}></Grid>
        <Grid item xs={12} md={8} sm={8} lg={8}>
          <Typography
            variant="h3"
            style={{ textAlign: "center", padding: "20px" }}
          >
            Choose your preferred option
          </Typography>
          <Card sx={{ minWidth: 275 }}>
            <Paper elevation={0} />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} lg={12}></Grid>
                <Grid item xs={12} lg={12}>
                  <FormControl fullWidth>
                    <InputLabel id="interest-label">
                      Select your interest
                    </InputLabel>
                    <Select
                      error={Boolean(gameSettings?.intrestError)}
                      labelId="interest-label"
                      value={gameSettings.interest}
                      label="Select your interest *"
                      onChange={(e) =>
                        setGameSettings((prev: any) => ({
                          ...prev,
                          interest: e.target.value,
                          // interestError:""
                        }))
                      }
                    >
                      {interestOptions?.length > 0 ? (
                        interestOptions?.map((options, index) => {
                          return (
                            <MenuItem key={index} value={options.value}>
                              {options.label}
                            </MenuItem>
                          );
                        })
                      ) : (
                        <MenuItem value="00">No item Found!</MenuItem>
                      )}
                    </Select>
                    <p>{gameSettings?.intrestError}</p>
                  </FormControl>
                </Grid>
                <Grid item xs={12} lg={12}>
                  <FormControl fullWidth>
                    <InputLabel id="difficulty-label">
                      Difficulty level
                    </InputLabel>
                    <Select
                      labelId="difficulty-label"
                      error={Boolean(gameSettings?.difficultyError)}
                      value={gameSettings.difficulty}
                      label="Difficulty level *"
                      fullWidth
                      onChange={(e) =>
                        setGameSettings((prev: any) => ({
                          ...prev,
                          difficulty: e.target.value,
                          // difficultyError:""
                        }))
                      }
                    >
                      {difficultyOptions?.length > 0 ? (
                        difficultyOptions?.map((options, index) => {
                          return (
                            <MenuItem key={index} value={options.value}>
                              {options.label}
                            </MenuItem>
                          );
                        })
                      ) : (
                        <MenuItem value="00">No item Found!</MenuItem>
                      )}
                    </Select>
                    <p>{gameSettings?.difficultyError}</p>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <div className={classes.buttonCWrap}>
            <Button label="Submit" onClickHandler={handleFormSubmit} />
          </div>
        </Grid>
        <Grid item xs={12} md={2} sm={2} lg={2}></Grid>
      </Grid>
      <footer className={classes.footer}>
        <Typography variant="body2" className={classes.footerText}>
          Made by{" "}
          <a
            href="https://www.linkedin.com/in/dhruv-khambhata/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Dhruv ❤️
          </a>
        </Typography>
      </footer>
    </div>
  );
}

export default ChoiceForm;
