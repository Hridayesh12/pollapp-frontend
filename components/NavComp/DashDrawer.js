import React from "react";
import {
  Box,
  Menu,
  MenuItem,
  Tooltip,
  IconButton,
  Avatar,
} from "@mui/material";
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
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useRouter } from 'next/router';
import MenuIcon from '@mui/icons-material/Menu';
const DashDrawer = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
  const [opened, setOpened] = React.useState(false);
const handleClickOpen = () => {
  setOpened(true);
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

const handleClosed = () => {
  setOpened(false);
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
    <Box sx={{display: { xs: "flex", md: "none" } }}>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          {open ? <CloseOutlinedIcon/>: <MenuIcon/> }
        </IconButton>
      </Tooltip>
      <Menu
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            display: { xs: "flex", md: "none" },
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.0,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 10,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <MenuItem  onClick={handleClickOpen}>
          <AddOutlinedIcon />
          Create Lobby
        </MenuItem>
        <MenuItem  onClick={() => {
          router.push("/auth/profile");
        }}>
          <AddOutlinedIcon />
          Create Subject
        </MenuItem>
      </Menu>
      <Dialog
          open={opened}
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
          >
            Create New&nbsp;<span style={{ color: "#003399" }}>LOBBY</span>
          </DialogTitle>
          <DialogContent>
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
          <DialogActions style={{ backgroundColor: "#FFFAFA" }}>
            <Button
              variant="contained"
              color="error"
              endIcon={<CloseOutlinedIcon />}
              onClick={handleClosed}
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
    </Box>
  )
}

export default DashDrawer