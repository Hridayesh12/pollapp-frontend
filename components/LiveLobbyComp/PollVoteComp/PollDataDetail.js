import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography, Divider, Button, Box, IconButton, Fade } from "@mui/material";
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
const PollDataDetail = ({ pollDet, sr }) => {
  const [checked, setChecked] = React.useState(false);
  const containerRef = React.useRef(null);
  const link = process.env.NEXT_PUBLIC_URL;
  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  const theme = createTheme();
  theme.typography = {
    fontFamily: ['"Roboto"', "sans-serif"].join(","),
  };
  theme.typography.h3 = {
    fontSize: "1.2rem",
    "@media (min-width:600px)": {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "2rem",
    },
  };
  theme.typography.h5 = {
    fontSize: "1rem",
    "@media (min-width:600px)": {
      fontSize: "1.2rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.2rem",
    },
  };
  theme.typography.h6 = {
    fontSize: "0.8rem",
    "@media (min-width:600px)": {
      fontSize: "1rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1rem",
    },
  };
  const [data, setdata] = useState([]);
  let uni_len = 0
  useEffect(() => {
    for (let i = 0; i < pollDet.option.length; i++) {
      if (pollDet.option[i].votes != 0) {
        uni_len += pollDet.option[i].votes.length
      }
    }
    // console.log("Data",data);
  }, [pollDet])
  return (
    <div >
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Button onClick={handleChange} sx={{ color: '#439A97' }}>View Details</Button>
      </div>
      <Fade in={checked}>
        <Paper sx={{ backgroundColor: '#CBEDD5', color: '#439A97', width: '100%', height: '100%', position: 'absolute', top: '0', overflow: 'auto', zIndex: '2' }} elevation={0}>
          <div
            style={{
              position: "relative",
              width: "95%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "column"
            }}
          >
            <div
              style={{
                position: "relative",
                width: "97%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",

              }}
            >
              <ThemeProvider theme={theme}>
                <Typography variant="h3">Q{sr + 1}.</Typography>
              </ThemeProvider>
              <IconButton onClick={handleChange}><KeyboardArrowDownIcon sx={{ color: '#C58940 !important' }} /></IconButton>
            </div>
            <br />

            <ThemeProvider theme={theme}>
              <div
                style={{
                  position: "relative",
                  height: "50px",
                  width: "97%",
                  overflow: "auto",
                  marginBottom: "10px",
                  borderBottom: "4px solid #C58940",
                }}
              >
                <Typography variant="h3">{pollDet.pollQuestion}</Typography>
              </div>

              {pollDet.option.map((ops, s) => <>
                {ops.votes != 0 ? (
                  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', marginLeft: '3%' }}>
                    <Typography variant="h5" sx={{ color: '#251749' }}>{s + 1}. {ops.value}</Typography>
                    {ops.user.map((zpx, d) => (<div style={{ marginLeft: '2%', maxHeight: '50px', overflow: 'auto', color: '#251749' }}>
                      <Typography variant="h6">{zpx}</Typography>
                    </div>))}
                  </div>
                ) : (<> </>)}
              </>)}
            </ThemeProvider>
          </div>
        </Paper>
      </Fade>
    </div>
  );
}

export default PollDataDetail;
