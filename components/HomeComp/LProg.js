import React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Fab from "@mui/material/Fab";
import Stack from "@mui/material/Stack";
import { Typography,Grid } from "@mui/material";

const LProg = () => {
  
  const [progress4, setProgress4] = React.useState(20);
  const [progress5, setProgress5] = React.useState(80);
  const [buffer4, setBuffer4] = React.useState(20);
  const [buffer5, setBuffer5] = React.useState(0);
  const progressRef = React.useRef(() => {});
  React.useEffect(() => {
    progressRef.current = () => {
      if (progress4 > 100) {
        setProgress4(0);
        setBuffer4(40);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress4(progress4 + diff);
        setBuffer4(progress4 + diff + diff2);
      }
      if (progress5 > 100) {
        setProgress5(0);
        setBuffer5(0);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress5(progress5 + diff);
        setBuffer5(progress5 + diff + diff2);
      }
    };
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <>
      <Grid container justifyContent="center"
  alignItems="center" direction='column'>
    <Grid item xs='auto'>
    <Fab
          sx={{
            backgroundColor: "#E5BA73",
            width: {xs:'40px',sm:"85px"},
            height: {xs:'40px',sm:"85px"},
            boxShadow: "none",
            rotate: "270deg",
          }}

        >
          <Stack sx={{ width:'100%' }}>
            <LinearProgress
              variant="buffer"
              color='success'
              value={progress4}
              valueBuffer={buffer4}
              sx={{height:{xs:'5px',sm:'13px'},marginBottom:{xs:'20%',sm:"20%"},backgroundColor:'#EAD6CD',color:'#EAD6CD'}}
            />
            <LinearProgress
              variant="buffer"
              color="secondary"
              value={progress5}
              valueBuffer={buffer5}
              sx={{height:{xs:'5px',sm:'13px'},backgroundColor:'#EAD6CD',color:'#EAD6CD'}}
            />
          </Stack>
        </Fab>
      </Grid>
      </Grid>
    </>
  );
};

export default LProg;
