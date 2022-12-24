import React from 'react';
import { useState, useEffect, useRef } from "react";
import Lottie from 'react-lottie';
import * as securedPoll from '../../assets/animations/112656-shield-check.json'
import * as livePoll from '../../assets/animations/livePoll.json'
import * as downloadReports from '../../assets/animations/downloadReports.json'
import * as dataAnalysis from '../../assets/animations/dataAnalysis.json'
import * as thingsDone from '../../assets/animations/sharePoll.json'
import * as dashVi from '../../assets/animations/hierarchy.json'
import { Typography, Grid, Card } from '@mui/material'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { motion } from 'framer-motion';
const Features = () => {
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 450,
        md: 800,
        lg: 1200,
        xl: 1536,
      },
    },
  });
  theme.typography = {
    fontFamily: ['"Inter"', "sans-serif"].join(","),
  };
  theme.typography.h2 = {
    fontSize: '3rem',
    '@media (max-width: 400px)': {
      fontSize: '2.5rem',
    },
    '@media (max-width: 321px)': {
      fontSize: '1.5rem',
    },
  };
  theme.typography.h3 = {
    fontSize: "1rem",
    "@media (min-width:600px)": {
      fontSize: "1.2rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.5rem",
    },
  };
  theme.typography.h5 = {
    fontSize: "0.8rem",
    "@media (min-width:600px)": {
      fontSize: "1rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1rem",
    },
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: securedPoll,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  const defaultOptions1 = {
    loop: true,
    autoplay: true,
    animationData: livePoll,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: downloadReports,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  const defaultOptions3 = {
    loop: true,
    autoplay: true,
    animationData: dataAnalysis,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  const defaultOptions4 = {
    loop: true,
    autoplay: true,
    animationData: thingsDone,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  const defaultOptions5 = {
    loop: true,
    autoplay: true,
    animationData: dashVi,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  const scrollRef = useRef(null)
  return (
    <Grid container direstion="column" sx={{ backgroundColor: '#E5BA73' }}>
      <ThemeProvider theme={theme}>
        <Typography variant="h2" sx={{ marginLeft: '5%', marginTop: '3%', marginBottom: '3%', color:'#251749' }}>What Makes Pollapp Different From Others</Typography>
        <Grid item direction="column" xs={12} >
          <Card sx={{
            borderRadius: '10px',
            padding: '1rem',
            overflow: "auto",
            marginBottom: '5%',
            marginLeft: '5%', marginRight: '5%',
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            height: { sm: '300px' },
            flexDirection: { xs: 'column', sm: 'row' },
            backgroundColor:'#FAF8F1'
          }}
            component={motion.div} whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
            transition={{ duration: 0.5 }}
          >
            <Lottie height={80} width={80} options={defaultOptions} />
            <div>
              <Typography variant="h3" sx={{ width: { xs: '75vw', sm: '40vw' } ,color:'#251749'}}>Short or Long Titile</Typography>
              <Typography variant="h5" sx={{ width: { xs: '75vw', sm: '40vw' } ,color:'#439A97'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?</Typography>
            </div>
          </Card>
        </Grid>
        <Grid item direction="column" xs={12} >
          <Card sx={{
            borderRadius: '10px',
            padding: '1rem',
            overflow: "auto",
            marginBottom: '5%',
            marginLeft: '5%', marginRight: '5%',
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            height: { sm: '300px' },
            flexDirection: { xs: 'column', sm: 'row-reverse' },
            backgroundColor:'#FAF8F1'
          }}
            component={motion.div} whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
            transition={{ duration: 0.5 }}>
            <Lottie height={80} width={80} options={defaultOptions1} />
            <div>
              <Typography variant="h3" sx={{ width: { xs: '75vw', sm: '40vw' } ,color:'#251749'}}>Short or Long Titile</Typography>
              <Typography variant="h5" sx={{ width: { xs: '75vw', sm: '40vw' } ,color:'#439A97'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?</Typography>
            </div>
          </Card>
        </Grid>
        <Grid item direction="column" xs={12} >
          <Card sx={{
            borderRadius: '10px',
            padding: '1rem',
            overflow: "auto",
            marginBottom: '5%',
            marginLeft: '5%', marginRight: '5%',
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            height: { sm: '300px' },
            flexDirection: { xs: 'column', sm: 'row' },
            backgroundColor:'#FAF8F1'
          }} component={motion.div} whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
            transition={{ duration: 0.5 }}>
            <Lottie height={80} width={80} options={defaultOptions2} />
            <div>
              <Typography variant="h3" sx={{ width: { xs: '75vw', sm: '40vw' } ,color:'#251749'}}>Short or Long Titile</Typography>
              <Typography variant="h5" sx={{ width: { xs: '75vw', sm: '40vw' } ,color:'#439A97'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?</Typography>
            </div>
          </Card>
        </Grid>
        <Grid item direction="column" xs={12} >
          <Card sx={{
            borderRadius: '10px',
            padding: '1rem',
            overflow: "auto",
            marginBottom: '5%',
            marginLeft: '5%', marginRight: '5%',
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            height: { sm: '300px' },
            flexDirection: { xs: 'column', sm: 'row-reverse' },
            backgroundColor:'#FAF8F1'
          }} component={motion.div} whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
            transition={{ duration: 0.5 }}>
            <Lottie height={100} width={100} options={defaultOptions3} />
            <div>
              <Typography variant="h3" sx={{ width: { xs: '75vw', sm: '40vw' } ,color:'#251749'}}>Short or Long Titile</Typography>
              <Typography variant="h5" sx={{ width: { xs: '75vw', sm: '40vw' } ,color:'#439A97'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?</Typography>
            </div>
          </Card>
        </Grid>
        <Grid item direction="column" xs={12} >
          <Card sx={{
            borderRadius: '10px',
            padding: '1rem',
            overflow: "auto",
            marginBottom: '5%',
            marginLeft: '5%', marginRight: '5%',
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            height: { sm: '300px' },
            flexDirection: { xs: 'column', sm: 'row' },
            backgroundColor:'#FAF8F1'
          }} component={motion.div} whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
            transition={{ duration: 0.5 }}>
            <Lottie height={80} width={80} options={defaultOptions4} />
            <div>
              <Typography variant="h3" sx={{ width: { xs: '75vw', sm: '40vw' } ,color:'#251749'}}>Short or Long Titile</Typography>
              <Typography variant="h5" sx={{ width: { xs: '75vw', sm: '40vw' } ,color:'#439A97'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?</Typography>
            </div>
          </Card>
        </Grid>
        <Grid item direction="column" xs={12} >
          <Card sx={{
            borderRadius: '10px',
            padding: '1rem',
            overflow: "auto",
            marginBottom: '5%',
            marginLeft: '5%', marginRight: '5%',
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            height: { sm: '300px' },
            flexDirection: { xs: 'column', sm: 'row-reverse' },
            backgroundColor:'#FAF8F1'
          }} component={motion.div} whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
            transition={{ duration: 0.5 }}>
            <Lottie height={100} width={100} options={defaultOptions5} />
            <div>
              <Typography variant="h3" sx={{ width: { xs: '75vw', sm: '40vw' } ,color:'#251749'}}>Short or Long Titile</Typography>
              <Typography variant="h5" sx={{ width: { xs: '75vw', sm: '40vw' } ,color:'#439A97'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?</Typography>
            </div>
          </Card>
        </Grid>
      </ThemeProvider>
    </Grid>
  );
}

export default Features;
