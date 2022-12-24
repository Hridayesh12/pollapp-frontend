import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Box } from '@mui/material';
import { Typography, Divider, RadioGroup,MyFormControlLabel,Radio} from "@mui/material";
import styles from '../../../styles/Radio.module.css';
import {
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import pollapp from '../../../assets/logo.png';
import Image from 'next/image';
import { AppBar, Toolbar, Button } from '@mui/material';
let socket;
const VotePage = ({ usern, lobbyid }) => {
  let subject = '';
  let subexist = '';
  const theme = createTheme();
  theme.typography = {
    fontFamily: ['"Roboto"', "sans-serif"].join(","),
  };
  theme.typography.h2 = {
    fontSize: '1.4rem',
    '@media (min-width:600px)': {
      fontSize: '1.7rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '2.5rem',
    },
  };
  theme.typography.h3 = {
    fontSize: '1.2rem',
    '@media (min-width:600px)': {
      fontSize: '1.5rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '2rem',
    },
  };
  theme.typography.h5 = {
    fontSize: '1rem',
    '@media (min-width:600px)': {
      fontSize: '1.2rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1.5rem',
    },
  };
  const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT;
  const link = process.env.NEXT_PUBLIC_URL;
  let mer = '';
  let lobbyuuid = lobbyid;
  const [polldes, setItems] = useState([]);
  const [lobbydes, setTritems] = useState([]);
  const [check, setBitems] = useState(Boolean);
  //   const socker=(question,option)=>{
  //     socket.emit('sendPoll', {lobbyuuid,question,option,usern}, (error) => {
  //         if(error) {
  //             alert(error);
  //         }
  //     })
  // }      

  const polls = (() => {
    lobbyuuid = lobbyid;
    if (usern) { mer = usern.mail; }
    fetch(`${link}bobs`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ data: lobbyuuid })
    }).then((res) => res.json())
      .then((ret) => {
        setItems(ret.myitem);
        // socket.emit('polls',{ret,lobbyuuid},(error)=>{
        //     if(error){alert(error);}
        // });
      })
  });

  const lobby = (() => {
    lobbyuuid = lobbyid;
    if (usern) { mer = usern.mail; }
    fetch(`${link}ross`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ data: lobbyuuid })
    }).then((res) => res.json())
      .then((rte) => {
        setTritems(rte.myitem[0]);
      })
  });

  useEffect(() => {
    if (usern) { mer = usern.mail; }
    lobbyuuid = lobbyid;
    // console.log("Hey", lobbyid);
    fetch(`${link}check`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ data: lobbyuuid })
    }).then((res) => res.json())
      .then((rat) => {
        // console.log("Hi", rat);
        if (rat.myitem.length > 0) {
          setBitems(rat.myitem[0].close);
          if (rat.myitem[0].close) {
            return;
          }
          else {
            lobby()
            polls()
          }
        }
      })
  }, [usern, lobbyid])
  useEffect(() => {
    let data = usern;
    lobbyuuid = lobbyid;
    socket = io(ENDPOINT);
    if (usern != null || usern != undefined) {
      subexist = lobbyid.includes('s');
      if (subexist) {
        subject = lobbyid.slice(19);
        // console.log(subject);
      }
      else {
        subject = 'general';
        // console.log(subject);
      }
      // console.log(usern);
      // console.log(data, lobbyuuid);
      // socket.emit('join',{data,lobbyuuid},(error)=>{
      //     if(error){alert(error);}
      // });
    }
    // return()=>{
    //     socket.disconnect();
    //     socket.close();
    // }

  }, [ENDPOINT, usern, lobbyuuid])

  const selectthis = (puid, opuid) => {
    if (usern) { mer = usern.mail; }

    // console.log(mer, puid, opuid, lobbyid, subject);
    subexist = lobbyid.includes('s');
    // console.log(subexist);
    if (subexist) {
      subject = lobbyid.slice(19);
      // console.log(subject);
    }
    else {
      subject = 'general';
      // console.log(subject);
    }
    // console.log(subject);
    fetch(`${link}select`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        puid,
        opuid,
        mer,
        data: lobbyid,
        subject
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          // console.log({ html: data.error });
        } else {
          // console.log({
        }
      })
      .catch((err) => {
      });
  }

  const [selectedValue, setSelectedValue] = React.useState();
  const nowdigonthis = (puid, opuid, question, option) => {
    setSelectedValue(option);
    // console.log(puid, opuid, question, option);
    fetch(`${link}check`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ data: lobbyuuid })
    }).then((res) => res.json())
      .then((rat) => {
        if (!rat.myitem[0].close) {
          // console.log("Hello", puid, opuid, question, option);
          selectthis(puid, opuid);
          // socker(question,option);
        }
        else {
          window.alert("POLL HAS BEEN CLOSED");
        }
      })
  }
  return (
    <div>

      {check == true && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", padding: "1%", marginTop: "20%" }}>
          <div className='endp'><h1>This room is no longer accepting responses</h1></div>
        </div>
      )}
      {check == false && (
        <Box sx={{width:{xs:'100%',sm:'70%',md:'60%'},minHeight:'100vh',margin:'auto',backgroundColor:'#CBEDD5',padding:{xs:1,sm:3}}}>
            <Box sx={{display:"flex",mb:2 }}>
        <Image  src={pollapp} width={20} height={20} />
          </Box> 
            <div style={{color:'#C58940',borderBottom:'5px solid #439A97',marginBottom:'7px'}}>
              <ThemeProvider theme={theme}>
              <Typography variant='h2'> {lobbydes.lobbyName}</Typography>
              <Typography variant='h3'>{lobbydes.lobbyDescription}</Typography>
              </ThemeProvider>
            </div>
          <div>
            {polldes.map((poll, x) => (
              <div key={poll}>
                <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <ThemeProvider theme={theme}>
                    <Typography variant="h3" sx={{color:'##439A97'}}>
                      Q{x + 1}.
                    </Typography>
                  </ThemeProvider>
                </div>
                <br />

                <ThemeProvider theme={theme}>
                  <div style={{ position: "relative", height: "50px", width: "100%", overflow: "auto", marginBottom: "7px", borderBottom: "3px solid #C58940" }}>
                    <Typography variant="h3" sx={{color:'#439A97'}}>
                      {poll.pollQuestion}
                    </Typography>
                  </div>
                  <div>
                    {poll.pollOption.map((oop, y) => (
                      <>
                        {oop.optionValue == "" && <></>}
                        {!oop.optionValue == "" && (
                          <Box
                            style={{
                              color: "#CBEDD5",
                              width: "100%",
                              position: "relative",
                              backgroundColor:'#E5BA73',
                              borderRadius:'50px',
                              display: 'flex',
                              flexDirection: 'row-reverse'
                            }}
                            sx={{height: {xs:'40px',sm:'50px'}}}
                          >
                           <input
                           className={styles.radioBtn}
                           style={{width:'1rem',height:'1rem',borderRadius:'0.15em solid #439A97',appearance: 'none',
                           backgroundColor:'#CBEDD5',marginTop:'0.8rem',marginRight:'1rem',display:"grid",placeContent:"center",borderRadius:"50%"}}
                           type="radio" value={oop.optionValue} name={poll.pollQuestion} id="gywshb"
                           onChange={()=>nowdigonthis(poll._id,oop._id,poll.pollQuestion,oop.optionValue)}
                           sx={{mr:{xs:0,sm:'5%'}}} 
                           />
                            <Typography variant="h5" title={oop.optionValue} sx={{overflow:"auto",borderRadius:'50px 0px 0px 50px',paddingLeft:'3%',paddingTop:'1%',backgroundColor:'#C58940', position: 'absolute', left: 0, width: '85%', height: {xs:'40px',sm:'50px'} }}>
                              {y + 1}. {oop.optionValue}
                            </Typography>
                          </Box>
                        )}
                        <br />
                      </>
                    ))}
                  </div>
                </ThemeProvider>
                <Divider sx={{ marginLeft: "auto"}}></Divider><br />
              </div>
            ))}
        </div>
        </Box>
      )}
    </div>
  );
}

export default VotePage;
