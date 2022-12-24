import React from 'react';
import { Box,Typography,Card } from '@mui/material';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ModeIcon from '@mui/icons-material/Mode';
import ShareIcon from '@mui/icons-material/Share';
import { motion } from 'framer-motion';
const Steps = () => {
    const theme = createTheme({})
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
  return (
    <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-around",backgroundColor:'#CBEDD5'}}>
      <ThemeProvider theme={theme}>
      <Typography variant="h2"  component={motion.div} whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
            transition={{ duration: 0.5 }} sx={{color:'#439A97', marginTop: '3%', marginBottom: '3%'}}>How To Make A Poll</Typography>
        <Box sx={{display:"flex",width:{sm:'100%',lg:'80%'},height:{xs:'150vh',md:'70vh'},flexDirection: { xs: 'column', md: 'row' },alignItems:"center",justifyContent:"space-around"}}>
            <Card raised  component={motion.div} whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
            transition={{ duration: 0.5 }} sx={{width:'200px',height:"200px",backgroundColor:"#439A97",display:"flex",flexDirection:"column",alignItems:"center",padding:"7px"}}>
                <Typography variant="h3" sx={{color:'#251749',marginBottom:'3%'}}>Step 1</Typography>
                <CreateNewFolderIcon sx={{color:'#FAF8F1',marginBottom:'5%'}}/>
                <Typography variant="h5" sx={{color:'#FAF8F1'}}>Create New Lobby For Grouping Multiple Similar Polls</Typography>
            </Card>
            <Card raised  component={motion.div} whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
            transition={{ duration: 0.5 }} sx={{width:'200px',height:"200px",backgroundColor:"#439A97",display:"flex",flexDirection:"column",alignItems:"center",padding:"7px"}}>
                <Typography variant="h3" sx={{color:'#251749',marginBottom:'3%'}}>Step 2</Typography>
                <CheckBoxIcon sx={{color:'#FAF8F1',marginBottom:'5%'}}/>
                <Typography variant="h5" sx={{color:'#FAF8F1'}}>Select The Subject For Lobby. You Can Create New Subject In Profile Section</Typography>
            </Card>
            <Card raised  component={motion.div} whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
            transition={{ duration: 0.5 }} sx={{width:'200px',height:"200px",backgroundColor:"#439A97",display:"flex",flexDirection:"column",alignItems:"center",padding:"7px"}}>
                <Typography variant="h3" sx={{color:'#251749',marginBottom:'3%'}}>Step 3</Typography>
                <ModeIcon sx={{color:'#FAF8F1',marginBottom:'5%'}}/>
                <Typography variant="h5" sx={{color:'#FAF8F1'}}>Now Your Lobby Is Ready For Creating Multiple Polls.</Typography>
            </Card>
            <Card raised  component={motion.div} whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
            transition={{ duration: 0.5 }} sx={{width:'200px',height:"200px",backgroundColor:"#439A97",display:"flex",flexDirection:"column",alignItems:"center",padding:"7px"}}>
                <Typography variant="h3" sx={{color:'#251749',marginBottom:'3%'}}>Step 4</Typography>
                <ShareIcon sx={{color:'#FAF8F1',marginBottom:'5%'}}/>
                <Typography variant="h5" sx={{color:'#FAF8F1'}}>After Creating Polls, Find Your Lobby in Dashboard and share it across various platforms.</Typography>
            </Card>
        </Box>
      </ThemeProvider>
    </Box>
  );
}

export default Steps;
