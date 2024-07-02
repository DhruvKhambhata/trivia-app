import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./App.css";

interface TriviaQuestion {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface AppState {
  question: string;
  options: string[];
  correctAnswer: string;
  selectedAnswer: string | null;
  questionCount: number;
  correctCount: number;
  loadingNext: boolean;
}

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    question: "",
    options: [],
    correctAnswer: "",
    selectedAnswer: null,
    questionCount: 0,
    correctCount: 0,
    loadingNext: false,
  });

  const fetchQuestion = useCallback(async () => {
    try {
      const response = await axios.get<{ results: TriviaQuestion[] }>(
        "https://opentdb.com/api.php?amount=1"
      );
      const data = response.data.results[0];
      const shuffledOptions = [
        data.correct_answer,
        ...data.incorrect_answers,
      ].sort(() => Math.random() - 0.5);
      setState((prevState) => ({
        ...prevState,
        question: data.question,
        options: shuffledOptions,
        correctAnswer: data.correct_answer,
      }));
    } catch (error) {
      console.log("Something Went Wrong", error);
    }
  }, []);

  useEffect(() => {
    fetchQuestion();
  }, []);

  const handleAnswerSelect = (answer: string) => {
    setState((prevState) => ({
      ...prevState,
      selectedAnswer: answer,
    }));
  };

  const handleNext = async () => {
    setState((prevState) => ({
      ...prevState,
      loadingNext: true,
    }));

    setTimeout(async () => {
      try {
        setState((prevState) => ({
          ...prevState,
          selectedAnswer: null,
          questionCount: prevState.questionCount + 1,
        }));
        if (state.questionCount < 10) {
          await fetchQuestion();
        }
      } finally {
        setState((prevState) => ({
          ...prevState,
          loadingNext: false,
        }));
      }
    }, 4000);
  };

  const handleExit = async () => {
    setState((prevState) => ({
      ...prevState,
      loadingNext: true,
    }));
    setTimeout(async () => {
      await fetchQuestion();
    },4000)
    try {
      setState({
        question: "",
        options: [],
        correctAnswer: "",
        selectedAnswer: null,
        questionCount: 0,
        correctCount: 0,
        loadingNext: false,
      });
    } finally {
      setState((prevState) => ({
        ...prevState,
        loadingNext: false,
      }));
    }
  };

  if (state.questionCount >= 10) {
    return (
      <div className="results">
        <h2>Results</h2>
        <p>Total Questions Served: 10</p>
        <p>Total Correct Answers: {state?.correctCount}</p>
        <p>Total Incorrect Answers: {10 - state?.correctCount}</p>
        <button
          onClick={handleExit}
          disabled={state?.loadingNext}
          className="exit-button"
        >
          Exit
        </button>
      </div>
    );
  }
  return (
    <div className="App">
      <h1>Trivia Game</h1>
      <div className="question-container">
        {state?.question ? (
          <>
            <h2>{state?.question}</h2>
            {state?.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                disabled={!!state?.selectedAnswer}
                className={`option-button ${
                  state?.selectedAnswer &&
                  (option === state?.correctAnswer ? "correct" : "incorrect")
                }`}
              >
                {option}
              </button>
            ))}
          </>
        ) : (
          "Loading..."
        )}
      </div>
      {state?.selectedAnswer && (
        <>
          {state?.selectedAnswer === state?.correctAnswer ? (
            <p className="feedback correct">Correct!</p>
          ) : (
            <p className="feedback incorrect">
              Wrong! The correct answer is {state?.correctAnswer}
            </p>
          )}
          <div className="controls">
            <button
              onClick={handleNext}
              className="next-button"
              disabled={state?.loadingNext}
            >
              Next {state?.loadingNext && <span className="spinner" />}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
