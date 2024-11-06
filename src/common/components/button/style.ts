import { makeStyles } from "@mui/styles";

export const useButtonStyles = makeStyles((theme) => ({
    Button: {
      padding: '1.1em 2em',
      backgroundColor: '#ecd448',
      color: '#131313',
      border: '2px solid #fff',
      fontSize: '15px',
      transition: 'all 0.3s',
      borderRadius: '12px',
      boxShadow: '0 2px 0 2px #000',
      cursor:"pointer",
    //   [theme.breakpoints.down('sm')]: {
    //     padding: '0.5em 1em',
    //     fontSize: '12px',
    //   },
      '&:hover': {
        backgroundColor: '#4cc9f0',
        color: '#fff',
      },
      '&:active': {
        transform: 'scale(0.9)',
      },
    },
  }));