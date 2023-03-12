import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Grid, Dialog, DialogContent, DialogContentText, DialogActions, DialogTitle } from '@mui/material';
import { Typography, Divider, Button } from "@mui/material";
import { IconButton, Avatar, Tooltip } from '@mui/material';
import { deepOrange, green, pink } from '@mui/material/colors';
import PollData from '../LiveLobbyComp/PollData.js';
import {
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import io from 'socket.io-client';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ShareIcon from '@mui/icons-material/Share';
import Swal from 'sweetalert2';
import swal from "sweetalert";
import {
  EmailShareButton,
  FacebookShareButton,
  FacebookMessengerShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  LinkedinIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import LinkIcon from '@mui/icons-material/Link';
import Footer from '../Footer.js';
let socket;
const LiveLobby = ({ id }) => {
  const router = useRouter();
  const linking = process.env.NEXT_PUBLIC_LINK;
  const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT;
  const link = process.env.NEXT_PUBLIC_URL;
  const sharurl = linking + 'pollvote/' + id;
  const [polldes, setItems] = useState([]);
  const [lobbydes, setTritems] = useState([]);
  const [sum, setSum] = useState([]);
  const close = true;
  const [users, setUsers] = useState([]);
  const [polls, setPolls] = useState([]);
  const data = { name: 'teacher' };
  const lobbyuuid = id;
  let titles = '';
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
      fontSize: '1.2rem',
    },
  };


  useEffect(() => {
    socket = io(ENDPOINT)
    socket.emit('join', { data, lobbyuuid }, (error) => {
      if (error) { alert(error); }
    });
    return () => {
      socket.disconnect();
      socket.close();
    }

  }, [ENDPOINT, lobbyuuid])

  useEffect(() => {
    socket.on("LobbyData", ({ users }) => {
      console.log("Is something", users);
      setUsers(users);

    });
    socket.on("PollData", ({ poll }) => {
      // // // console.log("Ok",poll);
      setPolls(poll);
      let vederichi = []
      for (var r = 0; r < poll.length; r++) {
        let arri = 0
        for (var s = 0; s < poll[r].option.length; s++) {
          if (poll[r].option[s].value !== "") {
            arri += poll[r].option[s].votes;
          }
        }
        vederichi.push(arri);
      }
    });
    let veddd = []
    for (var z = 0; z < polldes.length; z++) {
      let arrir = 0;
      for (var k = 0; k < 5; k++) {
        if (polldes[z].pollOption[k].optionValue !== "") {
          arrir += polldes[z].pollOption[k].optionArray.length;
        }
      }
      veddd.push(arrir);
    }
    setSum(veddd);
  }, [polldes]);



  useEffect(() => {
    fetch(`${link}bobs`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ data: lobbyuuid }),
      credentials: "include",
    }).then((res) => res.json())
      .then((ret) => {
        socket.emit('polls', { ret, lobbyuuid }, (error) => {
          if (error) { alert(error); }
        });
        // // console.log(ret.myitem);
        setItems(ret.myitem);

      })
  }, [lobbydes]);
  const ClosingLobby = async () => {
    const stuid = id;
    // // console.log(stuid);
    const res = await fetch(`${link}close`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        close,
        stuid
      }),
      credentials: "include",
    });
    if (res.status === 200) {
      swal("Success", "Lobby Closed", "success");
      socket.emit('closepoll', { lobbyuuid: stuid }, (error) => {
        if (error) { alert(error); }
      });
    }
    else {
      swal("Error", "Failed TO Close", "error");
    }

  }
  function closelob() {
    Swal.fire({
      title: 'Are You Sure You Want To Stop The Responses ?',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      icon: 'warning'
    }
    ).then((result) => {
      if (result.isConfirmed) {
        ClosingLobby();
      }
    })
  };
  useEffect(() => {
    fetch(`${link}ross`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ data: lobbyuuid }),
      credentials: "include",
    }).then((res) => res.json())
      .then((rte) => {
        setTritems(rte.myitem[0]);
        titles = rte.myitem[0].lobbyName;

      })
  }, [polldes]);
  const [dopen, setdopen] = useState(false);
  const handleClickOpen = () => {
    setdopen(true);
  }
  const handleClose = () => {
    setdopen(false);
  };


  return (
    <>
      <div style={{ minHeight: '100vh', backgroundColor: "#FAF8F1" }}>
        <div style={{ display: 'flex', paddingLeft: '1%', paddingRight: '1%', width: '100%', justifyContent: 'space-between', flexWrap: 'wrap', backgroundColor: '#439A97' }}>
          <Button
            variant="text"
            sx={{ margin: '1%' }}
            style={{ color: '#CBEDD5' }}
            startIcon={<ArrowBackIosIcon />}
            onClick={() => router.push("/dashboard/info")}
          >
            Dashboard
          </Button>
          <Button
            variant="contained"
            sx={{ margin: '1%' }}
            endIcon={<ShareIcon />}
            onClick={handleClickOpen}
          >
            Share
          </Button>
        </div>
        {lobbydes == undefined ? <></> :
          <div style={{ display: 'flex', paddingLeft: '1%', paddingRight: '1%', marginBottom: '2%', width: '100%', justifyContent: 'space-between', flexWrap: 'wrap', marginTop: '1%' }}>
            <ThemeProvider theme={theme}>
              <Typography variant="h2" style={{ borderBottom: '5px solid #C58940', color: '#62B6B7' }}>{lobbydes.lobbyName}</Typography>
            </ThemeProvider>
            <Button onClick={closelob} variant="contained"
              color="error">Stop Responses</Button>
          </div>
        }
        <Grid container  >
          {polls == undefined ? <></> :
            <>
              {polls.map((lob, x) => (
                <Grid spacing={5} xs={12} sm={12} md={6} key={x}>
                  <PollData poll={lob} sr={x} sums={sum[x]} />
                </Grid>
              ))}
            </>
          }
        </Grid>
        <Dialog
          open={dopen}
          onClose={handleClose}
          style={{ width: { xs: "100vw" } }}
          fullWidth
        >
          <DialogTitle
            style={{
              display: "flex",
              flexWrap: "no-wrap",
              backgroundColor: "#DAECFF",
            }}
          >SHARE LINK
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Grid container spacing={7} rowSpacing={3} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
                <Grid item xs={4} sm={2} md={2}>
                  <Tooltip disableFocusListener title="Copy Link" placement="top">
                    <IconButton label="Copy Link" onClick={() => {
                      setdopen(false); navigator.clipboard.writeText(linking + 'pollvote/' + id); Swal.fire({
                        position: 'top-middle',
                        icon: 'success',
                        title: 'Link Copied',
                        showConfirmButton: false,
                        timer: 1500
                      })
                    }}>
                      <Avatar alt="Copy Link" sx={{ bgcolor: deepOrange[500] }}><LinkIcon /></Avatar>
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item xs={4} sm={2} md={2}>
                  <EmailShareButton>
                    <EmailIcon size={40} round={true}></EmailIcon>
                  </EmailShareButton>
                </Grid>
                <Grid item xs={4} sm={2} md={2}>
                  <FacebookShareButton url={sharurl} subject={titles}>
                    <FacebookIcon size={40} round={true}></FacebookIcon>
                  </FacebookShareButton>
                </Grid>
                <Grid item xs={4} sm={2} md={2}>
                  <FacebookMessengerShareButton url={sharurl} quote={titles}>
                    <FacebookMessengerIcon size={40} round={true}></FacebookMessengerIcon>
                  </FacebookMessengerShareButton>
                </Grid>
                <Grid item xs={4} sm={2} md={2}>
                  <WhatsappShareButton url={sharurl} title={titles}>
                    <WhatsappIcon size={40} round={true}></WhatsappIcon>
                  </WhatsappShareButton>
                </Grid>
                <Grid item xs={4} sm={2} md={2}>
                  <TwitterShareButton url={sharurl} title={titles}>
                    <TwitterIcon size={40} round={true}></TwitterIcon>
                  </TwitterShareButton>
                </Grid>
                <Grid item xs={4} sm={2} md={2}>
                  <TelegramShareButton url={sharurl} title={titles}>
                    <TelegramIcon size={40} round={true}></TelegramIcon>
                  </TelegramShareButton>
                </Grid>
                <Grid item xs={4} sm={2} md={2}>
                  <RedditShareButton url={sharurl} title={titles}>
                    <RedditIcon size={40} round={true}></RedditIcon>
                  </RedditShareButton>
                </Grid>
                <Grid item xs={4} sm={2} md={2}>
                  <LinkedinShareButton url={sharurl} title={titles} source='POLLAPP'>
                    <LinkedinIcon size={40} round={true}></LinkedinIcon>
                  </LinkedinShareButton>
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{ backgroundColor: "#FFFAFA" }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleClose}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Footer />
    </>
  );
}

export default LiveLobby;
