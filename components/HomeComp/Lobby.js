import React from "react";
import styles from "../../styles/Home.module.css";
import { useState } from "react";
import swal from "sweetalert";
import {
  makeStyles,
  Dialog,
  DialogTitle,
  DialogActions,
  TextField,
  DialogContent,
  DialogContentText,
  Button,
  Typography,
  Grid
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useRouter } from 'next/router';
import {
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import LProg from "./LProg";
import Head from 'next/head';
const Lobby = () => {
  const theme = createTheme();
  theme.typography ={
      fontFamily: ['"Roboto"', "sans-serif"].join(","),
  };
  theme.typography.h1 = {
      fontSize: '5.5rem',
      '@media (max-width: 630px)': {
        fontSize: '5rem',
        },
      "@media (max-width: 510px)": {
        fontSize: '3.5rem',
        },
      '@media (max-width: 400px)': {
        fontSize: '3.2rem',
        },
      '@media (max-width: 321px)': {
        fontSize: '2rem',
      },
    };
  const link = process.env.NEXT_PUBLIC_URL;
  const router = useRouter();
  const [userInfo, setUserInfo] = React.useState({});
  const [timedPopup, setTimedPopup] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [subjectArray, setSubjectArray] = React.useState([]);
  const userd = async () => {
    try {
      const res = await fetch(`${link}userdata`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();

      if (res.status === 200 || res.status === 201) {
        setUserInfo(data);
        if (data.Subject) {
          setSubjectArray(data.Subject);
        }
        setLoading(true);
      } else if (res.status === 422) {
        setTimeout(() => {
          setLoading(true);
          setTimedPopup(true);
        }, 1000);
      } else {
        setTimeout(() => {
          setLoading(true);
          setTimedPopup(true);
        }, 1000);
      }
    } catch (err) {}
  };
  var usern = userInfo;
  var userIds = usern._id;
  React.useEffect(() => {
    userd();
  }, []);

  let SubVal = [];
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
    if (
      subjectArray.length != 0 ||
      subjectArray.length != undefined ||
      subjectArray.length != null
    ) {
      for (let i = 0; i < subjectArray.length; i++) {
        SubVal.push(subjectArray[i].SubjectValue);
      }
      // console.log(SubVal);
    }
  };
  const [selectedSubject, setselectedSubject] = React.useState(1000);
  const handleSubjectChange = (event) => {
    setselectedSubject(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [Lobby, setLobby] = useState({
    lobbyId: "",
    lobbyName: "",
    lobbyDescription: "",
    studentformId: [],
    pollId: [],
    userId: "",
  });
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setLobby({ ...Lobby, [name]: value });
  };

  const Lob = async (e) => {
    var lobs = { ...Lobby };
    lobs.userId = userIds;
    setLobby(lobs);
    Lobby.userId = userIds;
    const d = new Date();
    let timex = d.toLocaleString();
    var xemit = "";
    for (var a = 0; a < timex.length; a++) {
      if (timex[a] == ":" || timex[a] == "," || timex[a] == "/") {
        if (timex[a] == ",") {
          xemit = xemit + "t";
        } else {
          xemit = xemit + "-";
        }
      } else {
        if (
          timex[a] == " " ||
          timex[a] == "P" ||
          timex[a] == "A" ||
          timex[a] == "M"
        ) {
          xemit = xemit + "";
        } else {
          xemit = xemit + timex[a];
        }
      }
    }
    if (Lobby.lobbyName == "" || Lobby.lobbyDescription == "") {
      swal("Warning", "Please Fill All The Details", "warning");
    } else if (selectedSubject != 1000) {
      let subject = selectedSubject;
      let subs = subject.trim();
      var finalid = xemit + "s" + subs;
      Lobby.lobbyId = finalid;
      const {
        lobbyId,
        lobbyName,
        lobbyDescription,
        studentformId,
        pollId,
        userId,
      } = Lobby;
      const res = await fetch(`${link}createnewlobby`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          lobbyId,
          lobbyName,
          lobbyDescription,
          studentformId,
          pollId,
          userId,
          subject,
        }),
      });
      const data = await res.json();
      if (res.status === 400 || !data) {
        swal("Error", "Lobby Not Created", "error");
      } else if (res.status === 200 || res.status === 201) {
        swal("Success", "Lobby Created", "success");
        router.push('/createpoll/'+Lobby.lobbyId);
      }
    } else {
      var finalid = xemit;
      Lobby.lobbyId = finalid;
      const {
        lobbyId,
        lobbyName,
        lobbyDescription,
        studentformId,
        pollId,
        userId,
      } = Lobby;
      const res = await fetch(`${link}createnewlobby`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          lobbyId,
          lobbyName,
          lobbyDescription,
          studentformId,
          pollId,
          userId,
        }),
      });
      const dat = await res.json();
      if (res.status === 400 || !dat) {
        swal("Error", "Lobby Not Created", "error");
      } else if (res.status === 200 || res.status === 201) {
        swal("Success", "Lobby Created", "success");
        router.push('/createpoll/'+Lobby.lobbyId);
      }
    }
  };
  return (
    <div>
      <Head>
        <title>PollApp</title>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Michroma&display=swap" rel="stylesheet"/>
      </Head>
      <div>
      <Grid container justifyContent="center"
  alignItems="center" direction='column'>
    <Grid item xs='auto' direction='row'>
      <div style={{display:"flex"}}>
      
    <ThemeProvider theme={theme}><Typography className={styles.mainTitle} variant='h1'>PO<LProg/>APP</Typography></ThemeProvider>
      </div>
      </Grid>
    <Grid item xs='auto'>
    <div className={styles.textAnimation}>
          <ul className={styles.typingTxt}>
            <li>
              <span>Create Multiple Polls In Seconds</span>
            </li>
            <li>
              <span>Organize Multiple Polls In Lobby</span>
            </li>
            <li>
              <span>Group Related Lobbies In Subject</span>
            </li>
          </ul>
        </div>
      </Grid>
      <Grid item>
      <button className={styles.button} onClick={handleClickOpen}>
          <span>Create&nbsp;Lobby</span>
        </button>
      </Grid>
      </Grid>
        <Dialog
          open={open}
          onClose={handleClose}
          style={{ width: { xs: "100vw" } }}
          fullWidth
        >
          <DialogTitle
            style={{
              display: "flex",
              flexWrap: "no-wrap",
              backgroundColor: "#E5B9A8",
              color:"#394F8A"
            }}
          >
            Create New LOBBY
          </DialogTitle>
          <DialogContent style={{backgroundColor:'#EAD6CD'}}>
            <DialogContentText>
              <TextField
                name="lobbyName"
                value={Lobby.lobbyName}
                autoFocus
                margin="dense"
                id="name"
                label="Lobby Title"
                variant="standard"
                onChange={handleInputs}
                inputProps={{ maxLength: 40 }}
              />
              <TextField
                name="lobbyDescription"
                value={Lobby.lobbyDescription}
                autoFocus
                margin="dense"
                id="name"
                label="Lobby Description"
                fullWidth
                variant="standard"
                multiline
                rows={2}
                onChange={handleInputs}
                inputProps={{ maxLength: 100 }}
              />
              {userInfo.Subject == undefined ? (
                <>
                  <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-filled-label">
                      Subject
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value="None"
                    >
                      <MenuItem value={1000}>None</MenuItem>
                    </Select>
                  </FormControl>
                  <marquee>
                    <em>You can create a subject in profile section</em>
                  </marquee>
                </>
              ) : (
                <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-filled-label">
                    Subject
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={selectedSubject}
                    onChange={handleSubjectChange}
                  >
                    <MenuItem value={1000}>None</MenuItem>
                    {userInfo.Subject.map((value, index) => (
                      <MenuItem value={value.SubjectValue}>
                        {value.SubjectValue}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{backgroundColor:'#EAD6CD'}}>
            <Button
              variant="contained"
              color="error"
              endIcon={<CloseOutlinedIcon />}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="success"
              endIcon={<AddOutlinedIcon />}
              onClick={Lob}
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Lobby;
