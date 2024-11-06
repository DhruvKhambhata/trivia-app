import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './Pages/mainPage';
import { ThemeProvider } from '@mui/styles';
import { theme } from './common/theme';
import ChoiceForm from './Pages/choiceForm';
import Question from './Pages/questions';
import { unstable_createMuiStrictModeTheme } from '@mui/material';
import Results from './Pages/result';


function App() {
  const themeObj = unstable_createMuiStrictModeTheme(theme);

  return (
    <Router>
      <div>
      <ThemeProvider theme={themeObj}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/choice-form" element={<ChoiceForm />} />
          <Route path="/questions" element={<Question />} />
          <Route path="/results" element={<Results />} />
        </Routes>
        </ThemeProvider>
      </div>
    </Router>
  );
}

export default App;




// const TriviaApp: React.FC = () => {
//   const [state, setState] = useState<AppState>({
//     question: "",
//     options: [],
//     correctAnswer: "",
//     selectedAnswer: null,
//     questionCount: 0,
//     correctCount: 0,
//     loadingNext: false,
//   });

//   const [isSetupComplete, setIsSetupComplete] = useState(false);
//   const [interest, setInterest] = useState("9");
//   const [difficulty, setDifficulty] = useState("easy");
//   const [numQuestions, setNumQuestions] = useState(10);

//   const fetchQuestion = useCallback(async () => {
//     try {
//       const response = await axios.get<{ results: TriviaQuestion[] }>(
//         `https://opentdb.com/api.php?amount=1&category=${interest}&difficulty=${difficulty}`
//       );
//       const data = response.data.results[0];
//       const shuffledOptions = [data.correct_answer, ...data.incorrect_answers].sort(() => Math.random() - 0.5);
//       setState((prevState) => ({
//         ...prevState,
//         question: data.question,
//         options: shuffledOptions,
//         correctAnswer: data.correct_answer,
//       }));
//     } catch (error) {
//       console.error(error);
//     }
//   }, [interest, difficulty]);

//   useEffect(() => {
//     if (isSetupComplete) {
//       fetchQuestion();
//     }
//   }, [isSetupComplete, fetchQuestion]);

//   const handleStart = () => {
//     setIsSetupComplete(true);
//   };

//   const handleAnswerSelect = (answer: string) => {
//     setState((prevState) => ({
//       ...prevState,
//       selectedAnswer: answer,
//       correctCount: answer === prevState.correctAnswer ? prevState.correctCount + 1 : prevState.correctCount,
//     }));
//   };

//   const handleNext = async () => {
//     if (state.questionCount < numQuestions - 1) {
//       setState((prevState) => ({
//         ...prevState,
//         selectedAnswer: null,
//         questionCount: prevState.questionCount + 1,
//         loadingNext: true,
//       }));
//       await fetchQuestion();
//       setState((prevState) => ({
//         ...prevState,
//         loadingNext: false,
//       }));
//     } else {
//       setIsSetupComplete(false);
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Container maxWidth="sm" className="py-8">
//         <Typography variant="h3" component="h1" className="text-center text-primary mb-8">
//           Trivia Challenge
//         </Typography>
//         <Card className="shadow-lg">
//           <CardContent>
//             {!isSetupComplete ? (
//               <div className="space-y-6">
//                 <Typography variant="h5" component="h2" className="mb-4">
//                   Game Setup
//                 </Typography>
//                 <FormControl fullWidth>
//                   <InputLabel>Interest Area</InputLabel>
//                   <Select
//                     value={interest}
//                     onChange={(e) => setInterest(e.target.value as string)}
//                     label="Interest Area"
//                   >
//                     {interestOptions.map((option) => (
//                       <MenuItem key={option.value} value={option.value}>
//                         {option.label}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//                 <FormControl fullWidth>
//                   <InputLabel>Difficulty</InputLabel>
//                   <Select
//                     value={difficulty}
//                     onChange={(e) => setDifficulty(e.target.value as string)}
//                     label="Difficulty"
//                   >
//                     {difficultyOptions.map((option) => (
//                       <MenuItem key={option.value} value={option.value}>
//                         {option.label}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//                 <div>
//                   <Typography id="num-questions-slider" gutterBottom>
//                     Number of Questions: {numQuestions}
//                   </Typography>
//                   <Slider
//                     value={numQuestions}
//                     onChange={(_, value) => setNumQuestions(value as number)}
//                     aria-labelledby="num-questions-slider"
//                     valueLabelDisplay="auto"
//                     step={1}
//                     marks
//                     min={1}
//                     max={50}
//                   />
//                 </div>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   fullWidth
//                   onClick={handleStart}
//                   className="mt-4"
//                 >
//                   Start Trivia
//                 </Button>
//               </div>
//             ) : (
//               <div className="space-y-6">
//                 <Typography variant="h5" component="h2" className="mb-4">
//                   Question {state.questionCount + 1} of {numQuestions}
//                 </Typography>
//                 <LinearProgress
//                   variant="determinate"
//                   value={(state.questionCount / numQuestions) * 100}
//                   className="mb-6"
//                 />
//                 {state.question ? (
//                   <>
//                     <Typography
//                       variant="body1"
//                       className="mb-4"
//                       dangerouslySetInnerHTML={{ __html: state.question }}
//                     />
//                     <div className="space-y-2">
//                       {state.options.map((option, index) => (
//                         <Button
//                           key={index}
//                           onClick={() => handleAnswerSelect(option)}
//                           disabled={!!state.selectedAnswer}
//                           variant={state.selectedAnswer ? "contained" : "outlined"}
//                           color={
//                             state.selectedAnswer
//                               ? option === state.correctAnswer
//                                 ? "primary"
//                                 : option === state.selectedAnswer
//                                 ? "secondary"
//                                 : "inherit"
//                               : "primary"
//                           }
//                           fullWidth
//                           className="justify-start"
//                         >
//                           <span dangerouslySetInnerHTML={{ __html: option }} />
//                           {state.selectedAnswer && option === state.correctAnswer && (
//                             <CheckCircle className="ml-auto" />
//                           )}
//                           {state.selectedAnswer && option === state.selectedAnswer && option !== state.correctAnswer && (
//                             <Cancel className="ml-auto" />
//                           )}
//                         </Button>
//                       ))}
//                     </div>
//                   </>
//                 ) : (
//                   <Typography>Loading...</Typography>
//                 )}
//                 {state.selectedAnswer && (
//                   <Box className="mt-4">
//                     {state.selectedAnswer === state.correctAnswer ? (
//                       <Typography className="text-green-600 font-medium">Correct!</Typography>
//                     ) : (
//                       <Typography className="text-red-600 font-medium">
//                         Wrong! The correct answer is{" "}
//                         <span dangerouslySetInnerHTML={{ __html: state.correctAnswer }} />
//                       </Typography>
//                     )}
//                   </Box>
//                 )}
//                 {state.selectedAnswer && (
//                   <Button
//                     onClick={handleNext}
//                     disabled={state.loadingNext}
//                     variant="contained"
//                     color="primary"
//                     fullWidth
//                     className="mt-4"
//                   >
//                     {state.questionCount < numQuestions - 1 ? "Next Question" : "Finish Game"}
//                   </Button>
//                 )}
//               </div>
//             )}
//           </CardContent>
//         </Card>
//         {isSetupComplete && (
//           <Typography variant="h6" className="text-center mt-6 font-bold">
//             Correct Answers: {state.correctCount} / {state.questionCount + 1}
//           </Typography>
//         )}
//       </Container>
//     </ThemeProvider>
//   );
// };

// export default TriviaApp; 