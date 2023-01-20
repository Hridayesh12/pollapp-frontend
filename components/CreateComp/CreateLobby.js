import React from "react";
import { useState, useEffect } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import PollIcon from '@mui/icons-material/Poll';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { TextField, Button, IconButton, Grid, Box, Typography, AppBar, Toolbar } from "@mui/material";
import CreatedLobby from "./CreatedLobby";
import styles from '../../styles/CreateLobby.module.css';
import swal from "sweetalert";
import Swal from "sweetalert2";
import pollapp from '../../assets/logo.png';
import Image from 'next/image';
import {
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import { useRouter } from "next/router";
import Footer from "../Footer";
const CreateLobby = ({ id }) => {
  const router = useRouter();
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
  const [polldes, setItems] = useState([]);
  const [lobbydes, setTritems] = useState([]);
  const [addPoll, setAddPoll] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const callProfilePage = async () => {
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
      setUserInfo(data);
      if (!res.status === 200) {
        window.alert("login first");
      }
    } catch (err) {
    }
  }
  const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT;
  const link = process.env.NEXT_PUBLIC_URL;
  useEffect(() => {
    callProfilePage();
  }, []);
  useEffect(() => {
    fetch(`${link}bobs`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ data: id }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((ret) => {
        setItems(ret.myitem);
      });
  }, [polldes]);
  useEffect(() => {
    fetch(`${link}ross`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ data: id }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((rte) => {
        setTritems(rte.myitem[0]);
      });
  }, [lobbydes]);
  const [lobbybutton, setlobbybutton] = useState(true);
  function ViewData() {
    Swal.fire({
      position: 'top-middle',
      icon: 'success',
      title: 'Lobby Saved',
      showConfirmButton: false,
      timer: 1500
    })
    setlobbybutton(true);
  }

  const [opt, setopt] = useState([{
    optionValue: "",
    optionArray: [],
    optionCorrect: false,
  }]);
  const [poll, setPoll] = useState(
    [{
      lobbyUniqueId: id,
      pollQuestion: "",
      pollOption: [
        { optionValue: "", optionArray: [], optionCorrect: false },
        { optionValue: "", optionArray: [], optionCorrect: false },
        { optionValue: "", optionArray: [], optionCorrect: false },
        { optionValue: "", optionArray: [], optionCorrect: false },
        { optionValue: "", optionArray: [], optionCorrect: false },
      ],
      userId: userInfo._id
    }]
  );
  function ChangePollQuestion(question) {
    var newPollQuestion = [...poll];
    newPollQuestion.pollQuestion = question;
    setPoll(newPollQuestion);
  }
  function ChangePollOption(option, place) {
    var newOption = [...opt];
    newOption[place].optionValue = option;
    setopt(newOption);
  }
  function removeOption(i) {
    if (i != 0) {
      var removeOpt = [...opt];
      removeOpt.splice(i, 1);
      setopt({ optionValue: "", optionArray: [], optionCorrect: false })
      setopt(removeOpt);
    }
  }
  function addOption(i) {
    var j = i + 1;
    var addOption = [...opt];
    if (opt.length < 5) {
      addOption[i] = { optionValue: "", optionArray: [], optionCorrect: false };
    } else {
    }
    setopt(addOption);
  }
  function selectCorrectOption(corOpt, i) {
    var selectedOption = [...opt];
    var j = selectedOption.length;
    for (let k = 0; k < j; k++) {
      if (k == i) {
        selectedOption[i].optionCorrect = true;
      }
      else {
        selectedOption[k].optionCorrect = false;
      }


    }
  }

  const CreatePoll = async (e) => {
    var options = [...opt];
    var question = [...poll];
    var userId = userInfo._id;
    for (let i = 0; i < options.length; i++) {
      question[0].pollOption[i].optionValue = options[i].optionValue;
      question[0].pollOption[i].optionCorrect = options[i].optionCorrect;
    }
    setPoll(question);
    const pollOption = [{ optionValue: "", optionArray: [], optionCorrect: false }]
    for (let j = 0; j < 5; j++) {
      pollOption[j] = poll[0].pollOption[j];
    }
    const lobbyUniqueId = poll[0].lobbyUniqueId;
    var pollQuestion = poll.pollQuestion;
    if (options.length < 2) {
      swal("Warning", "Atleast 2 options required", "warning");
      setPoll.pollQuestion = "";
      var setPollQuestion = [...poll];
      // console.log(setPollQuestion);
      setPoll(setPollQuestion);
      setopt([{
        optionValue: "",
        optionArray: [],
        optionCorrect: false,
      }]);
      for (let i = 0; i < options.length; i++) {
        question[0].pollOption[i].optionValue = "";
        question[0].pollOption[i].optionCorrect = false;
      }
      setPoll(question);
    }
    else if (pollQuestion == undefined || options[0].optionValue == "" || options[1].optionValue == "") {
      swal("Warning", "Please Fill All The Details", "warning");
      var setPollQuestion = [...poll];
      setPollQuestion[0].pollQuestion = "";
      setPoll(setPollQuestion);
      setPoll.pollQuestion = "";
      setopt([{
        optionValue: "",
        optionArray: [],
        optionCorrect: false,
      }]);
      for (let i = 0; i < options.length; i++) {
        question[0].pollOption[i].optionValue = "";
        question[0].pollOption[i].optionCorrect = false;
      }
      setPoll(question);
    }
    else {
      const res = await fetch(`${link}createnewpoll`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ id, pollQuestion, pollOption, userId }),
        credentials: "include",
      });
      const data = await res.json();
      if (res.status === 400 || !data) {
        swal("Error", "Poll Creation Failed Try Again", "error");
      } else if (res.status === 200 || res.status === 201) {
        Swal.fire({
          position: 'top-middle',
          icon: 'success',
          title: 'Poll Created',
          showConfirmButton: false,
          timer: 1500
        })
        setlobbybutton(false);
      }
      setAddPoll(false);
      var setPollQuestion = [...poll];
      setPollQuestion.pollQuestion = "";
      setPoll(setPollQuestion);
      setPoll.pollQuestion = "";
      setopt([{
        optionValue: "",
        optionArray: [],
        optionCorrect: false,
      }]);
      for (let i = 0; i < options.length; i++) {
        question[0].pollOption[i].optionValue = "";
        question[0].pollOption[i].optionCorrect = false;
      }
      setPoll(question);
    }
  }
  function addPollButton() {
    setAddPoll(!addPoll);
    var setPollQuestion = [...poll];
    setPollQuestion.pollQuestion = "";
    setPoll(setPollQuestion);
    setPoll.pollQuestion = "";
    setopt([{
      optionValue: "",
      optionArray: [],
      optionCorrect: false,
    }]);
    for (let i = 0; i < opt.length; i++) {
      poll[0].pollOption[i].optionValue = "";
      poll[0].pollOption[i].optionCorrect = false;
    }

  }
  return (
    <>
      <div style={{ minHeight: "100vh", backgroundColor: "#FAF8F1" }}>
        <AppBar sx={{ backgroundColor: "#439A97" }}>
          <Toolbar>
            <Image src={pollapp} width={20} height={20} onClick={() => {
              router.push("/");
            }} />
            <Typography variant="h6" sx={{ ml: 1, display: { xs: "none", md: "flex" } }}>
              POLLAPP
            </Typography>
            <Button
              variant="text"
              style={{ marginLeft: "auto", color: 'white' }}
              startIcon={<DashboardIcon />}
              onClick={() => {
                router.push("/dashboard/info");
              }}
            >
              Dashboard
            </Button>
          </Toolbar>
        </AppBar>
        <Box sx={{ marginTop: '5rem', width: '100%', py: 2, display: 'fit-content', px: { xs: 1, md: 12, sm: 6 } }}>
          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: "3px" }}>
            <ThemeProvider theme={theme}>
              <Typography variant="h2" sx={{ color: "#439A97", borderBottom: "3px solid #439A97" }}>{lobbydes.lobbyName}</Typography>
            </ThemeProvider>
            <Button disabled={lobbybutton} variant="contained"
              color="error" onClick={ViewData}>Save Lobby</Button>
          </div>
          <Grid container >
            {polldes == undefined ? <></> :
              <>
                {polldes.map((lob, x) => (
                  <Grid xs={12} sm={6} md={6} key={x}>
                    <CreatedLobby x={x} lobbies={lob} lobId={lobbydes._id} />
                  </Grid>
                ))}
              </>
            }
            {addPoll ?
              <Grid xs={12} sm={6} md={6}>
                <div style={{ position: 'relative', width: '90%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <ThemeProvider theme={theme}>
                    <Typography variant="h3" sx={{ color: "#C58940" }}>Q{polldes.length + 1}.</Typography>
                  </ThemeProvider>
                  <IconButton aria-label="delete" style={{ color: "red" }}>
                    <CloseIcon onClick={addPollButton} />
                  </IconButton>
                </div>
                <br />
                <TextField style={{ position: 'relative', width: '90%' }} value={poll.pollQuestion} inputProps={{ maxLength: 85 }} placeholder="Question" id="filled-basic" label="Filled" variant="filled" onChange={(e) => { ChangePollQuestion(e.target.value) }} />

                {opt.map((op, i) => (
                  <div style={{ display: "flex", width: "100%", marginBottom: "1%" }} key={i}>
                    <input type="radio" id="optionentry" name="contact" value={opt[i].optionValue} style={{ marginBottom: "10px", marginTop: "2%", color: "green", marginLeft: "2%", marginRight: "3%" }} onClick={(e) => { selectCorrectOption(e.target.value, i) }} />
                    <label for="optionentry" style={{ display: "flex", width: "100%", }}>
                      <input className={styles.input_option} type="text" value={opt[i].optionValue} placeholder="option" maxlength="75" onChange={(e) => { ChangePollOption(e.target.value, i) }}></input>
                      <IconButton aria-label="delete" style={{ color: "red" }}>
                        <CloseIcon onClick={() => { removeOption(i) }} />
                      </IconButton>
                    </label>
                  </div>
                ))}
                {opt.length < 5 ? (
                  <Button variant="contained" endIcon={<AddIcon />} onClick={() => addOption(opt.length)}>Add Option</Button>) : ""}
                <br /><br />
                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Button endIcon={<AddCircleOutlineIcon />} onClick={CreatePoll} variant="contained"
                    color="success">Create Poll</Button>
                </div>
              </Grid>
              :
              <Grid xs={12} sm={12} md={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Button onClick={addPollButton} variant="contained" sx={{ backgroundColor: '#C58940', color: '#FAF8F1' }}>Add Poll</Button></Grid>

            }


          </Grid>

        </Box>
      </div>
      <Footer />
    </>
  );
};

export default CreateLobby;
