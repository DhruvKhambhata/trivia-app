import React, { useEffect, useState } from "react";
import { useStyles } from "./style";
import MyButton from "../common/components/button/button";
import { useNavigate } from "react-router-dom";
import { Tilt } from "react-next-tilt";
import { TypeAnimation } from "react-type-animation";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
  Typography,
} from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const MainPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [openInstruction, setInstruction] = useState(false);
  const [currentText, setCurrentText] = useState("Quiz App");
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleGameStart = () => {
    navigate("/choice-form");
  };

  const handleClose = () => {
    setInstruction(false);
  };

  useEffect(() => {
    if (currentIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + currentText[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, []);

  return (
    <div className="bg-100">
      <div className={classes.container}>
        <h3 className={classes.title}>
          <TypeAnimation
            sequence={["Quiz App", 1000, "Q", 500]}
            wrapper="span"
            deletionSpeed={10}
            speed={10}
            style={{ fontSize: "3em", display: "inline-block" }}
            repeat={Infinity}
            cursor={false}
          />
        </h3>
        <Tilt>
          <MyButton label="START PLAYING" onClickHandler={handleGameStart} />
        </Tilt>
        <p onClick={() => setInstruction(true)}>How To Play?</p>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={openInstruction}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            <strong>Welcome to the Trivia Challenge!</strong>
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            {/* <CloseIcon /> */}
            close
          </IconButton>
          <DialogContent dividers>
            <Typography gutterBottom>
              Answer as many questions as possible within the time limit. Each
              question has four possible answers, but only one is correct!
            </Typography>
            <Typography gutterBottom>
              <strong>How to Play:</strong>
            </Typography>
            <Typography gutterBottom>
              - You will be presented with a series of multiple-choice
              questions.
              <br />
              - Click on an option to select your answer.
              <br />
              - Once an answer is selected, you cannot change it.
              <br />- Each correct answer earns you points. Try to answer
              quickly to get bonus points!
            </Typography>
            <Typography gutterBottom>
              <strong>Rules:</strong>
            </Typography>
            <Typography gutterBottom>
              - No cheating! Use only your knowledge.
              <br />
              - If time runs out, the game will end automatically.
              <br />- Have fun and challenge yourself!
            </Typography>
          </DialogContent>
        </BootstrapDialog>
      </div>
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
};

export default MainPage;
