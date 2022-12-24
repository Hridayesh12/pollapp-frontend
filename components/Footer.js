import React from 'react';
import { Typography } from '@mui/material';
import {
    createTheme,
    ThemeProvider,
  } from "@mui/material/styles";
const Footer = () => {
    const theme = createTheme();
    theme.typography = {
      fontFamily: ['"Roboto"', "sans-serif"].join(","),
    };
    theme.typography.h5 = {
        fontSize: '1rem',
        '@media (min-width:600px)': {
          fontSize: '1.2rem',
        },
        [theme.breakpoints.up('md')]: {
          fontSize: '1.5rem',
        },
      }
  return (
    <footer style={{width:"100vw",backgroundColor:"#C58940",display:"flex",alignItems:"center",justifyContent:"center",paddingTop:"1rem",paddingBottom:"1rem"}}>
        <ThemeProvider theme={theme}>
        <Typography variant="h5" align="center" sx={{color:"#CBEDD5"}}>Made By -&nbsp;<a href='https://github.com/Hridayesh12'>Hridayesh</a>&nbsp;,&nbsp;
        <a href='https://github.com/ADIVADER19'>Advait</a>&nbsp;And&nbsp;
            <a href='https://github.com/SohamX'>Soham</a>  
        </Typography>
        </ThemeProvider>
    </footer>
  );
}

export default Footer;
