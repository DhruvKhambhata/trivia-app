import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./App.css";

interface TriviaQuestion {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const App: React.FC = () => {
  const [question, setQuestion] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [questionCount, setQuestionCount] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [loadingNext, setLoadingNext] = useState<boolean>(false);

  const fetchQuestion = useCallback(async () => {
    try {
      const response = await axios.get<{ results: TriviaQuestion[] }>(
        "https://opentdb.com/api.php?amount=1"
      );
      const data = response.data.results[0];
      setQuestion(data.question);
      const shuffledOptions = [
        data.correct_answer,
        ...data.incorrect_answers,
      ].sort(() => Math.random() - 0.5);
      setOptions(shuffledOptions);
      setCorrectAnswer(data?.correct_answer);
    } catch (error) {
      console.log("Somthing Went Wrong",error)
    }
  }, []);

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion]);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNext = async () => {
    setLoadingNext(true);
    try {
      setSelectedAnswer(null);
      setQuestionCount(questionCount + 1);
      if (questionCount < 10) {
        await fetchQuestion();
      }
    } finally {
      setLoadingNext(false);
    }
  };

  const handleExit = async () => {
    setLoadingNext(true);
    try {
      setQuestionCount(0);
      setCorrectCount(0);
      setSelectedAnswer(null);
      if (questionCount < 10) {
        await fetchQuestion();
      }
    } finally {
      setLoadingNext(false);
    }
  };

  if (questionCount >= 10) {
    return (
      <div className="results">
        <h2>Results</h2>
        <p>Total Questions Served: 10</p>
        <p>Total Correct Answers: {correctCount}</p>
        <p>Total Incorrect Answers: {10 - correctCount}</p>
        <button
          onClick={handleExit}
          disabled={loadingNext}
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
        {question ? (
          <>
            <h2>{question}</h2>
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                disabled={!!selectedAnswer}
                className={`option-button ${
                  selectedAnswer &&
                  (option === correctAnswer ? "correct" : "incorrect")
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
      {selectedAnswer && (
        <>
          {selectedAnswer === correctAnswer ? (
            <p className="feedback correct">Correct!</p>
          ) : (
            <p className="feedback incorrect">
              Wrong! The correct answer is {correctAnswer}
            </p>
          )}
          <div className="controls">
            <button
              onClick={handleNext}
              className="next-button"
              disabled={loadingNext}
            >
              Next {loadingNext && <span className="spinner" />}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
