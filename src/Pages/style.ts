import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme)=>({
   container:{
    display:'flex',
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    height:"100vh",
    background:"linear-gradient(to bottom right, #5a67d8, #9f7aea, #ed64a6)",
    [theme.breakpoints.between('xs',"md")]: {
      overflow: 'hidden',
    },
   },
   title: {
    fontFamily: "'Courier New', Courier, monospace",
    fontSize: "2rem",
    whiteSpace: "pre", // Keeps the typewriter spacing consistent
    borderRight: "3px solid black", // Cursor effect
    animation: "$blink 0.7s step-end infinite" // Blinking cursor effect
  },
  "@keyframes blink": {
    from: { borderColor: "black" },
    to: { borderColor: "transparent" }
  },
   formWrapper:{
    width:"50%",
    [theme.breakpoints.between('xs',"md")]: {
      width:"80%",
    },
   },
   formTitle:{
      textAlign:"center"
   },
   optionsButton: {
      border: '2px solid #0100ff !important',
      margin: '10px 0 !important',
      color: '#0100ff !important',
      borderRadius: '10px !important',
      padding: '10px !important',
      fontSize: '22px !important',
      '&.correct': {
        backgroundColor: '#4caf50b8 !important',
        borderColor: '#4caf50b8 !important',
        color: '#fff !important',
      },
      '&.incorrect': {
        backgroundColor: '#f44336d4 !important',
        borderColor: '#f44336d4 !important',
        color: '#fff !important',
      },
    },
   buttonContainer:{
      display:"flex",
      justifyContent:"space-between",
      padding:"10px"
   },
   questionWrap:{
      border:"2px solid #f4f4f4",
      padding:"10px",
      borderRadius:"10px",
      color:"#f4f4f4",
      margin:"20px 0 !important",
   },
   buttonCWrap:{
      width:"100%",
      display:"flex",
      padding:"10px"
   },
   root: {
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #5a67d8, #9f7aea, #ed64a6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
    },
    resContainer: {
      backgroundColor: '#fff',
      borderRadius: '1.5rem',
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
      padding: '2rem',
      width: '100%',
      maxWidth: '24rem',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    },
    gradientBorder: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '0.5rem',
      background: 'linear-gradient(to right, violet, indigo, blue, green, yellow, orange, red)',
      backgroundSize: '200% 200%',
      animation: `$rainbow 5s ease infinite`,
    },
    resultTitle: {
      marginBottom: '1rem',
      fontWeight: 800,
      backgroundClip: 'text',
      color: 'transparent',
      backgroundImage: 'linear-gradient(to right, #9f7aea, #ed64a6)',
    },
    scoreContainer: {
      position: 'relative',
      width: '12rem',
      height: '12rem',
      margin: '0 auto 1.5rem',
    },
    scoreText: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 700,
      fontSize: '3rem',
      color: '#4f46e5',
    },
    message: {
      marginBottom: '1rem',
      fontWeight: 700,
      color: '#4a5568',
    },
    starContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '1.5rem',
    },
    highlightedStar: {
      fontSize: '2rem',
      color: '#ecc94b',
    },
    fadedStar: {
      fontSize: '2rem',
      color: '#cbd5e0',
    },
    button: {
      fontWeight: 'bold',
      padding: '0.5rem 1rem',
      borderRadius: '9999px',
      transition: 'transform 0.2s ease',
      '&:hover': {
        transform: 'scale(1.05)',
      },
    },
    playAgainButton: {
      background: 'linear-gradient(to right, #9f7aea, #5a67d8)',
      color: '#fff',
    },
    homeButton: {
      background: 'linear-gradient(to right, #ed64a6, #f56565)',
      color: '#fff',
    },
    perfectScore: {
      marginTop: '1.5rem',
      animation: `$bounce 2s infinite`,
    },
    lowScore: {
      marginTop: '1.5rem',
      animation: `$pulse 2s infinite`,
    },
    '@keyframes rainbow': {
      '0%': { backgroundPosition: '0% 50%' },
      '50%': { backgroundPosition: '100% 50%' },
      '100%': { backgroundPosition: '0% 50%' },
    },
    '@keyframes bounce': {
      '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
      '40%': { transform: 'translateY(-10px)' },
      '60%': { transform: 'translateY(-5px)' },
    },
    '@keyframes pulse': {
      '0%': { transform: 'scale(1)' },
      '50%': { transform: 'scale(1.1)' },
      '100%': { transform: 'scale(1)' },
    },
    footer: {
      // marginTop: "auto",
      padding: "10px 0",
      textAlign: "center",
      width: "100%",
      position: "fixed",
      bottom:10
    },
    footerText: {
      color: "#fff",
      fontFamily:"cursive !important",
      fontWeight:"500 !important"
    },
}))