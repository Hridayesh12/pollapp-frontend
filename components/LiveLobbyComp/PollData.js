import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography, Divider} from "@mui/material";
import PollDataDetail from "./PollVoteComp/PollDataDetail";
import { Grid,Card} from '@mui/material';
const PollData = ({ poll, sr, sums }) => {
  const [sum, setSum] = React.useState([]);

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

  return (
    <Card
    raised
    sx={{
      width: {xs:'90vw',sm:'90vw',md:'47vw',lg:'47vw'},
      borderRadius: '10px',
      padding: '1rem',
      position:'relative',
      marginTop:"35px",
      marginLeft:'15px',
      backgroundColor:'#CBEDD5',
      color:'#439A97',
    }}
  >
      <div
        style={{
          position: "relative",
          width: "90%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          
        }}
      >
        <ThemeProvider theme={theme}>
          <Typography variant="h3">Q{sr + 1}.</Typography>
        </ThemeProvider>
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
          <Typography variant="h3">{poll.pollQuestion}</Typography>
        </div>
        <div>
          {poll.pollOption.map((oop, y) => (
            <>
              {oop.optionValue == "" && <></>}
              {!oop.optionValue == "" && (
                <>
                  {oop.optionCorrect == "" && (
                    <>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "space-between",
                          color: "#251749",
                          height: "50px",
                          position: "relative",
                          border: "3px solid #251749",
                          width: "97%",
                          padding:'0px 5px'
                        }}
                      >
                        <div
                          style={{
                            overflow: "auto",
                            width: "70%",
                            height: "38px",
                          }}
                        >
                          <Typography variant="h5">
                            {y + 1}. {oop.optionValue}
                          </Typography>
                        </div>
                        <div>
                          <Typography variant="h5" align="right">
                            {oop.optionArray.length}&nbsp;
                            {oop.optionArray.length==1?<>vote</>:<>votes</>}
                          </Typography>
                        </div>
                          <div
                            style={{
                              width: `calc(${oop.optionArray.length}*100%/${sums})`,
                              left: "1%",
                              position: "absolute",
                              zIndex:"1",
                              minWidth: "2%",
                              maxWidth: "98%",
                              borderRadius: "15px",
                              transition: "500ms ease-in-out",
                              height: "10px",
                              top: "30px",
                              backgroundColor: "#251749",
                            }}
                          ></div>
                          <div
                            style={{
                              width: "98%",
                              left: "1%",
                              position: "absolute",
                              borderRadius: "15px",
                              transition: "500ms ease-in-out",
                              height: "10px",
                              top: "30px",
                              backgroundColor: "#ccc",
                            }}
                          ></div>
                      </div>
                    </>
                  )}
                  {!oop.optionCorrect == "" && (
                    <>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "space-between",
                          color: "rgb(73 73 73 / 87%)",
                          height: "50px",
                          position: "relative",
                          border: "3px solid green",
                          width: "97%",
                          padding:'0px 5px'
                        }}
                      >
                        <div
                          style={{
                            overflow: "auto",
                            width: "72%",
                            height: "38px",
                          }}
                        >
                          <Typography variant="h5">
                            {y + 1}. {oop.optionValue}
                          </Typography>
                        </div>
                        <div>
                          <Typography variant="h5" align="right">
                          {oop.optionArray.length}&nbsp;
                            {oop.optionArray.length==1?<>vote</>:<>votes</>}
                          </Typography>
                        </div>
                          <div
                            style={{
                              width: `calc(${oop.optionArray.length}*100%/${sums})`,
                              left: "1%",
                              position: "absolute",
                              zIndex:"1",
                              maxWidth: "98%",
                              borderRadius: "15px",
                              minWidth: "2%",
                              transition: "500ms ease-in-out",
                              height: "10px",
                              top: "30px",
                              backgroundColor: "green",
                            }}
                          ></div>
                          <div
                            style={{
                              width: "98%",
                              left: "1%",
                              position: "absolute",
                              borderRadius: "15px",
                              transition: "500ms ease-in-out",
                              height: "10px",
                              top: "30px",
                              backgroundColor: "#ccc",
                            }}
                          ></div>
                      </div>
                    </>
                  )}
                </>
              )}
              <br />
            </>
          ))}
        </div>
      </ThemeProvider>
      <Divider
      ></Divider>
     <PollDataDetail pollDet={poll} sr={sr}/>
    </Card>
  );
};

export default PollData;
