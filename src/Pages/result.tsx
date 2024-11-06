
import React, { useState, useEffect } from 'react'
import { Button, Typography, Box } from '@mui/material'
import { Star, EmojiEvents, SentimentVeryDissatisfied, Replay, Home } from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom'
import { useStyles } from './style'

export default function Results() {
  const [score, setScore] = useState(0)
  const [stars, setStars] = useState(0)
  const totalQuestions = 10
  const classes = useStyles()
  const navigate = useNavigate()
const {state : currectCount} = useLocation()
  useEffect(() => {
    const timer = setInterval(() => {
      setScore(prevScore => {
        if (prevScore < currectCount) {
          return prevScore + 1
        }
        clearInterval(timer)
        return prevScore
      })
    }, 100)

    return () => clearInterval(timer)
  }, [currectCount])

  useEffect(() => {
    setStars(Math.floor(score / 2))
  }, [score])

  const getResultMessage = () => {
    if (score >= 8) return "Awesome! You're a Quiz Master!"
    if (score >= 5) return "Great job! Keep it up!"
    return "Don't give up! Try again!"
  }

  return  (
    <div className={classes.root}>
      <div className={classes.resContainer}>
        <div className={classes.gradientBorder}></div>

        <Typography variant="h4" className={classes.resultTitle}>
          Quiz Complete!
        </Typography>

        <Box className={classes.scoreContainer}>
          <Box className={classes.scoreText}>
            <Typography variant="h1">{score}</Typography>
          </Box>
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#e0e0e0" strokeWidth="10" />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#4f46e5"
              strokeWidth="10"
              strokeDasharray={`${(score / totalQuestions) * 283} 283`}
              transform="rotate(-90 50 50)"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
        </Box>

        <Typography variant="h5" className={classes.message}>
          {getResultMessage()}
        </Typography>

        <div className={classes.starContainer}>
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={index < stars ? classes.highlightedStar : classes.fadedStar}
            />
          ))}
        </div>

        <Typography variant="body1" className="mb-6 text-gray-600">
          You answered <span className="font-bold text-indigo-600">{score}</span> out of{' '}
          <span className="font-bold text-indigo-600">{totalQuestions}</span> questions correctly
        </Typography>

        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            startIcon={<Replay />}
            className={`${classes.button} ${classes.playAgainButton}`}
            onClick={() => navigate("/choice-form")}
          >
            Play Again
          </Button>
          <Button
            variant="contained"
            startIcon={<Home />}
            className={`${classes.button} ${classes.homeButton}`}
            onClick={() => (window.location.href = '/')}
          >
            Home
          </Button>
        </div>
        {score === totalQuestions && (
          <div className={classes.perfectScore}>
            <EmojiEvents className="text-6xl text-yellow-400" />
            <Typography variant="h6" className="text-indigo-600 font-bold">
              Perfect Score!
            </Typography>
          </div>
        )}
        {score < 5 && (
          <div className={classes.lowScore}>
            <SentimentVeryDissatisfied className="text-6xl text-gray-400" />
            <Typography variant="h6" className="text-gray-600">
              Keep practicing!
            </Typography>
          </div>
        )}
      </div>
    </div>
  )
}