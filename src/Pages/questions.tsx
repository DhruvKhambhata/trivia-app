import { Button, Skeleton, Typography } from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStyles } from "./style";
import { Tilt } from "react-next-tilt";
import MyButton from "../common/components/button/button";
import SweetAlert from "../common/components/SweetAlert/SweetAlert";

interface QuestionData {
  question: string;
  options: string[];
  correctAnswer: string;
  selectedAnswer: string | null;
  questionCount: number;
  correctCount: number;
  loadingNext: boolean;
}

const Question: React.FC = () => {
  const [queState, setQueState] = useState<QuestionData>({
    question: "",
    options: [],
    correctAnswer: "",
    selectedAnswer: null,
    questionCount: 0,
    correctCount: 0,
    loadingNext: false,
  });
  const [isAnswered, setIsAnswered] = useState(false);
  const { state: locationState } = useLocation();
  const classes = useStyles();
  const { interest, difficulty } = locationState?.gameSettings || {};
  const navigate = useNavigate();
  const fetchQuestion = useCallback(async () => {
    if (!interest || !difficulty) return;
    setQueState((prevState) => ({
      ...prevState,
      loadingNext: true,
    }));
    try {
      const response = await axios.get<{ results: any[] }>(
        `https://opentdb.com/api.php?amount=1&category=${interest}&difficulty=${difficulty}`
      );
      const data = response.data.results[0];
      const shuffledOptions = [
        data.correct_answer,
        ...data.incorrect_answers,
      ].sort(() => Math.random() - 0.5);

      setQueState((prevState) => ({
        ...prevState,
        question: data.question,
        options: shuffledOptions,
        correctAnswer: data.correct_answer,
        loadingNext: false,
      }));
    } catch (error) {
      setQueState((prevState) => ({
        ...prevState,
        loadingNext: false,
      }));
      // @ts-ignore
      if (error?.response?.status === 429) {
        SweetAlert({
          text: "Please try again After 5 Seconds! We are having too many request",
          icon: "error",
        });
      }
    }
  }, [interest, difficulty]);

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion]);

  const handleAnswerSelect = (answer: string) => {
    setQueState((prevState) => ({
      ...prevState,
      selectedAnswer: answer,
      correctCount:
        answer === prevState.correctAnswer
          ? prevState.correctCount + 1
          : prevState.correctCount,
    }));
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    if (queState.questionCount > 9) {
      navigate("/results", { state: queState?.correctCount });
    } else {
      setIsAnswered(false);
      setQueState((prevState) => ({
        ...prevState,
        selectedAnswer: null,
        questionCount: queState?.questionCount + 1,
        loadingNext: true,
      }));
      // setTimeout(() => {
      // }, 5000);
      fetchQuestion();
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.formWrapper}>
        <div className={classes.formTitle}>
          <Typography variant="h4" align="center" className="font-bold">
            Quiz Question
          </Typography>
        </div>
        {queState?.loadingNext ? (
          <div>
            <Skeleton
              variant="rectangular"
              width={"100%"}
              height={62}
              sx={{ margin: "20px 0", borderRadius: "10px" }}
            />
          </div>
        ) : (
          queState.question && (
            <Typography
              variant="h6"
              className={classes.questionWrap}
              align="center"
              dangerouslySetInnerHTML={{ __html: queState.question }}
            />
          )
        )}
        <div className="space-y-2">
          {queState.options.map((option, index) => {
            const isCorrect = option === queState.correctAnswer;
            const isSelected = option === queState.selectedAnswer;
            const buttonClass = isAnswered
              ? isCorrect
                ? "correct"
                : isSelected
                ? "incorrect"
                : ""
              : "";

            return (
              <Tilt width="100%">
                {queState?.loadingNext ? (
                  <div>
                    <Skeleton
                      variant="rectangular"
                      width={"100%"}
                      height={62}
                      sx={{ margin: "10px 0", borderRadius: "10px" }}
                    />
                  </div>
                ) : (
                  <Button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={
                      !!queState.selectedAnswer || queState?.loadingNext
                    }
                    variant={queState.selectedAnswer ? "contained" : "outlined"}
                    color={
                      queState.selectedAnswer
                        ? isCorrect
                          ? "success"
                          : "error"
                        : "primary"
                    }
                    fullWidth
                    className={`${classes.optionsButton} ${buttonClass}`}
                  >
                    <span dangerouslySetInnerHTML={{ __html: option }} />
                  </Button>
                )}
              </Tilt>
            );
          })}
        </div>
        <div className={classes.buttonContainer}>
          <Tilt>
            <MyButton
              onClickHandler={handleNextQuestion}
              disabled={!isAnswered}
              label={queState?.loadingNext ? "Loading... " : "Next Question"}
            />
          </Tilt>
        </div>
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

export default Question;
