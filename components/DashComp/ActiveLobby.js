import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import PollIcon from '@mui/icons-material/Poll';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import LinkIcon from '@mui/icons-material/Link';
import EditIcon from '@mui/icons-material/Edit';
import { Typography, IconButton, Avatar, Tooltip, Button } from '@mui/material';
import { deepOrange, green, pink } from '@mui/material/colors';
import Chip from '@mui/material/Chip';
import Swal from 'sweetalert2';
import swal from "sweetalert";
import { Grid, Dialog, DialogContent, DialogContentText, DialogActions, DialogTitle } from '@mui/material';
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
import ShareIcon from '@mui/icons-material/Share';
import io from 'socket.io-client';
let socket
import { motion } from 'framer-motion';
const ActiveLobby = ({ lobby }) => {
  const router = useRouter();
  const theme = createTheme();
  const link = process.env.NEXT_PUBLIC_URL;
  const linking = process.env.NEXT_PUBLIC_LINK;
  const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT;
  const id = lobby.lobbyId;
  const sharurl = linking + 'pollvote/' + id;
  const titles = lobby.lobbyName;
  const close = true;
  theme.typography = {
    fontFamily: ['"Roboto"', "sans-serif"].join(","),
  };
  theme.typography.h3 = {
    fontSize: '1rem',
    '@media (min-width:600px)': {
      fontSize: '1.2rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1.5rem',
    },
  };
  theme.typography.h4 = {
    fontSize: '0.8rem',
    '@media (min-width:600px)': {
      fontSize: '1rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1.2rem',
    },
  };
  function editfunc() {
    // console.log(id);
    router.push('/createpoll/' + id);
  }
  function votefunc() {
    // console.log(id)
    router.push('/livepoll/' + id);
  }
  const ClosingLobby = async () => {
    const stuid = id;
    // console.log(stuid);
    const res = await fetch(`${link}close`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        close,
        stuid
      }),
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
  const [dopen, setdopen] = useState(false);
  const handleClickOpen = () => {
    setdopen(true);
  }
  const handleClose = () => {
    setdopen(false);
  };
  useEffect(() => {
    socket = io(ENDPOINT)
    return () => {
      socket.off();
    }
  }, [ENDPOINT, 'dashboard/info']);
  return (
    <motion.div whileHover={{ scale: 1.055 }}
      onHoverStart={e => { }}
      onHoverEnd={e => { }} style={{ position: "relative", color: "#439A97", borderRadius: '20px', backgroundColor: "#97DECE" }}>
      <div style={{ display: "flex", position: "absolute", right: "-22px", top: "-22px" }}>
        <Chip style={{ backgroundColor: "#439A97" }} sx={{ color: "#CBEDD5" }} icon={<PollIcon sx={{ color: "#CBEDD5 !important" }} />} label={lobby.pollId.length} />
      </div>
      <ThemeProvider theme={theme}>
        <div style={{ position: "relative", height: "45px", overflow: "auto", marginTop: "8px", marginBottom: "7px", paddingTop: "5px", paddingLeft: "10px" }}>
          <Typography variant='h3'>{lobby.lobbyName}</Typography>
        </div>
        <div style={{ position: "relative", height: "50px", overflow: "auto", marginBottom: "7px", paddingTop: "3px", paddingLeft: "10px" }}>
          <Typography variant='h4'>{lobby.lobbyDescription}</Typography>
        </div>
      </ThemeProvider>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", flexWrap: "no-wrap", paddingBottom: "5px" }}>
        <Tooltip disableFocusListener title="Edit Lobby" placement="top">
          <IconButton label="Edit Lobby" onClick={editfunc}>
            <Avatar alt="Edit Lobby" sx={{ bgcolor: "white", color: "black" }}><EditIcon /></Avatar>
          </IconButton>
        </Tooltip>
        <Tooltip disableFocusListener title="Share Link" placement="top">
          <IconButton label="Share Link" onClick={handleClickOpen}>
            <Avatar alt="Share Link" color='secondary'><ShareIcon /></Avatar>
          </IconButton>
        </Tooltip>
        <Tooltip disableFocusListener title="Live Updates" placement="top">
          <IconButton label="Live Updates" onClick={votefunc}>
            <Avatar alt="Live Updates" sx={{ bgcolor: green[500] }}><VisibilityIcon /></Avatar>
          </IconButton>
        </Tooltip>
        <Tooltip disableFocusListener title="Stop Responses" placement="top">
          <IconButton label="Stop Responses" onClick={closelob}>
            <Avatar alt="Stop Responses" sx={{ bgcolor: pink[500] }} ><StopCircleIcon /></Avatar>
          </IconButton>
        </Tooltip>
      </div>


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
                    setdopen(false);; navigator.clipboard.writeText(linking + 'pollvote/' + id); Swal.fire({
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
    </motion.div>
  );
}

export default ActiveLobby;
