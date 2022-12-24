import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import ActiveLobby from './DashComp/ActiveLobby';
import CloseLobby from './DashComp/CloseLobby'
import DashNav from './NavComp/DashNav';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import PollIcon from '@mui/icons-material/Poll';
import DashDrawer from './NavComp/DashDrawer';
import { useRouter } from 'next/router';
import Checkbox from '@mui/material/Checkbox';
import swal from 'sweetalert';
import styles from '../styles/Dashboard.module.css';
import LoadingComp from './LoadingComp.js';
import pollapp from '../assets/logo.png';
import Image from 'next/image';
import Footer from './Footer';
const Dashboard = () => {
  const router = useRouter();
  const [value, setValue] = React.useState('1');
  const [loading, setloading] = useState(true);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [showDownload, setshowDownload] = useState(false);
  const [selectedSubject, setselectedSubject] = React.useState(1000);
  const link = process.env.NEXT_PUBLIC_URL;
  const [userInfo, setUserInfo] = useState({});
  const [userIds, setuserIds] = useState();
  let [lobbies, setLobbies] = useState([]);
  let [clobbies, setClobbies] = useState([]);
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
        setuserIds(data._id);
        openlobbies(data._id, null);
        closelobbies(data._id, null);
        setselectedSubject(1000);
      }
      else if (res.status === 422) {
      }
      else {
      }
    } catch (err) {
    }
  };
  var usern = userInfo;

  useEffect(() => {
    userd();
  }, [])



  const handleSubjectChange = (event) => {
    setselectedSubject(event.target.value);
    if (event.target.value == 1000) {
      openlobbies(userIds, null);
      closelobbies(userIds, null);
      setshowDownload(false);
    }
    else {
      let sub;
      if (userInfo.Subject.length > 0) {
        let tp = userInfo.Subject;
        // console.log("tp", tp);
        for (let i = 0; i < userInfo.Subject.length; i++) {
          if (tp[i].SubjectValue == event.target.value) {
            sub = tp[i];
          }
        }
      }
      setloading(true);
      openlobbies(userIds, sub);
      closelobbies(userIds, sub);
      setshowDownload(true);
    }
  }
  const openlobbies = async (userIds, sub) => {
    await fetch(`${link}usrlobbies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tata: userIds, sub: sub }),
    }).then(res => res.json()).then(data => {
      setLobbies(data);
      // console.log(data);
      setloading(false);
    })
  };

  const closelobbies = async (userIds, sub) => {
    fetch(`${link}clsrlobbies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tata: userIds, sub: sub }),
    }).then(res => res.json()).then(data => {
      for (let i = 0; i < data.length; i++) {
        data[i].selected = false;
      }
      // console.log(data);
      setClobbies(data);
      setloading(false);
    })
  };
  let finalizedArray = [];
  const BundleDownload = (id, no) => {
    // console.log(id, no);
    var lobs = [...clobbies];
    if (lobs[no].selected) {
      lobs[no].selected = false;
    }
    else {
      lobs[no].selected = true;
    }
    Something(lobs);
   // console.log(lobs);
  }
  const Something = (lobs) => {
    setClobbies([...lobs]);
  }
  const SubmitDownload = async () => {
    let clob = [...clobbies];
    let leng = clob.length;
    // console.log(clob);
    // console.log(leng);
    if (leng <= 0) {
      swal("Warning", "You Haven't Selected Any Subject", "warning");
    }
    else {
      for (let i = 0; i < leng; i++) {
        if (clob[i].selected) {
          finalizedArray.push(clob[i].lobbyId);
        }
      }
      // console.log(finalizedArray);
      // console.log(selectedSubject);
      const files = await fetch(`${link}getMarks`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ finalizedArray, subject: selectedSubject })
      })
      const rata = await files.json();
      // console.log(rata);
      if (files.status === 200 || files.status === 201) {
        // console.log("it worked", rata);
        const res = await fetch(`${link}downloadExcel`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ finalizedArray, subject: selectedSubject, studata: rata })
        });
        const data = await res.json();
        // console.log(link + "downloadzip/" + finalizedArray.length + "/" + selectedSubject);
        if (res.status === 200 || res.status === 201) {
          fetch(`${link}downloadzip/` + finalizedArray.length + "/" + selectedSubject, {
            method: "GET",
            headers: {},
          })
          window.open(`${link}downloadzip/` + finalizedArray.length + "/" + selectedSubject);
        }
      }
      finalizedArray.splice(0, finalizedArray.length);
    }
  }
  const [checked, setChecked] = useState(false);
  const handleChanges = (event) => {
    setChecked(event.target.checked);
  }
  return (
    <>
    <div style={{ minHeight: '100vh', backgroundColor: '#FAF8F1' }}>
      <AppBar sx={{ color: '#FAEAB1', backgroundColor: '#C58940' }}>
        <Toolbar>
        <Image  src={pollapp} width={20} height={20}  onClick={() => {
          router.push("/");
        }}/>
          <Typography variant="h6" sx={{ display: { xs: "none", md: "flex" },ml:2 }} onClick={() => {
            router.push("/");
          }}>
            POLLAPP
          </Typography>
          <Box sx={{marginLeft: "auto",display:'flex'}}>
            {userInfo.Subject == undefined ? (
              <>
               <FormControl variant="filled" sx={{ marginLeft: 'auto', maxWidth: { xs: 100, md: 150 }, minWidth: { xs: 100, md: 150 }, color: '#FAEAB1', backgroundColor: '#C58940 !important' }}>
                <InputLabel id="demo-simple-select-filled-label" sx={{color:'white !important'}}>
                  Subject
                </InputLabel>
                <Select
                sx={{color:'white !important'}}
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value="None"
                  >
                    <MenuItem value={1000}>Create a subject in profile section</MenuItem>
                  </Select>
                </FormControl>
              </>
            ) : (
              <FormControl variant="filled" sx={{ marginLeft: 'auto', maxWidth: { xs: 100, md: 150 }, minWidth: { xs: 100, md: 150 }, color: '#FAEAB1', backgroundColor: '#C58940 !important' }}>
                <InputLabel id="demo-simple-select-filled-label" sx={{color:'white !important'}}>
                  Subject
                </InputLabel>
                <Select
                sx={{color:'white !important'}}
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
            <DashNav />
            <DashDrawer />
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ width: '100%', typography: 'body1', marginTop: "70px" }}>

        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList 
         textColor="secondary"
               TabIndicatorProps={{
                style: {
                  backgroundColor: "#D97D54"
                }
              }}  onChange={handleChange} variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              aria-label="scrollable force tabs example">
              <Tab label="Active Lobby" value="1" />
              <Tab label="Closed Lobby" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            {loading ? <LoadingComp /> : <>
              {lobbies.length==0 ? <Typography variant="h4">No Lobbies Created</Typography>
            :<Grid container spacing={7} rowSpacing={3} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
            {lobbies.map(events => (
              <Grid item xs={12} sm={6} md={4} key={events._id}>
                <ActiveLobby lobby={events} />
              </Grid>
            ))} 
            </Grid> 
            }
            </>}
          </TabPanel>
          <TabPanel value="2">
            {showDownload ? <div sx={{ display: "flex", width: "100%", justifyContent: "space-around" }}>
              <Checkbox
                checked={checked}
                onChange={handleChanges}
                inputProps={{ 'aria-label': 'controlled' }}
                label='Download Data Of Multiple Lobbies'
              />
              <Button onClick={SubmitDownload}>DOWNLOAD</Button>
            </div> : <></>}
            {loading ? <LoadingComp /> :
            <>
             {clobbies.length==0 ? <Typography variant="h4">No Lobbies Created</Typography>
             : <Grid container spacing={7} rowSpacing={3} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
             {clobbies.map((events, x) => (
               <Grid item xs={12} sm={6} md={4} key={events._id}>
                 {checked ? <>
                   {events.selected ? <Checkbox
                     defaultChecked
                     className={styles.chh}
                     onClick={() => BundleDownload(events, x)}
                   /> : <Checkbox
                     className={styles.chh}
                     onClick={() => BundleDownload(events, x)}
                   />}
                 </> : <></>}
                 <CloseLobby className={checked ? styles.size : ''} lobby={events} />
               </Grid>
             ))}
           </Grid>}
            </>
             }</TabPanel>
        </TabContext>
      </Box>
    </div>
    <Footer/>
    </>
  );
}

export default Dashboard;
