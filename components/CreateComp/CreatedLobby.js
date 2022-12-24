import * as React from "react";
import { useEffect } from "react";
import {
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import {Typography,Divider,IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import swal from "sweetalert";
import io from 'socket.io-client';
let socket
const CreatedLobby = ({ lobbies ,x,lobId}) => {
  const ENDPOINT = process.env.NEXT_PUBLIC_URL;
  const link = process.env.NEXT_PUBLIC_URL;
    const theme = createTheme();
theme.typography ={
    fontFamily: ['"Roboto"', "sans-serif"].join(","),
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
  const DeletetingPoll = async()=>{
    let pollId = lobbies._id;
    let lobbyId = lobId;
    // console.log(lobbyId);
    const res = await fetch(`${link}deletePoll`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({pollId,lobbyId})
    });
    if (res.status === 200 ) { 
      swal("Success", "Poll Deleted", "success");
      socket.emit('deletepoll',{lobbyuuid:lobbyId,poll:lobbies,pollId:pollId},(error)=>{
        if(error){alert(error);}
    });
  }

}
  const DeletePoll=async()=>{
    Swal.fire({
      title: 'Are You Sure You Want To Delte The Poll ?',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      icon: 'warning'
  }
  ).then((result) => {
      if (result.isConfirmed) {
        DeletetingPoll();
      } })
    
  }
  useEffect(()=>{
    socket = io(ENDPOINT)
    return()=>{
      socket.off();
  }
},[ENDPOINT, 'dashboard/info']);
  return (
    <div>
         <div style={{position:'relative',width:'90%',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
         <ThemeProvider theme={theme}>
         <Typography variant="h3" sx={{color:"#C58940"}}>
                Q{x + 1}.
          </Typography>
          </ThemeProvider>
          <IconButton>
            <DeleteIcon onClick={DeletePoll}/>
          </IconButton>
         </div>
              <br />
          
              <ThemeProvider theme={theme}>
            <div style={{position:"relative",height:"50px",color:"#C58940",width: "90%",overflow:"auto",marginBottom:"7px", borderBottom:"3px solid #C58940"}}>
              <Typography variant="h3">
                {lobbies.pollQuestion}
              </Typography>
            </div>
              <div>
                {lobbies.pollOption.map((oop, y) => (
                  <>
                    {oop.optionValue == "" && <></>}
                    {!oop.optionValue == "" && (
                        <>
                      {oop.optionCorrect=="" &&  (<div
                        style={{
                          color: "rgb(73 73 73 / 87%)",
                          width: "90%",
                          height:"60px",
                          position: "relative",
                          overflow:"auto",
                          border: "3px solid #ccc",
                          padding: "12px 20px"
                        }}
                        sx={{mb:5}}
                      ><Typography variant="h5" title={oop.optionValue}>
                      {y + 1}. {oop.optionValue}
                    </Typography></div>)}
                    {!oop.optionCorrect=="" && (<div
                        style={{
                          color: "rgb(73 73 73 / 87%)",
                          width: "90%",
                          height:"60px",
                          position: "relative",
                          overflow:"auto",
                          border: "3px solid green",
                          padding: "12px 20px"
                        }}
                        sx={{mb:5}}
                      ><Typography variant="h5" title={oop.optionValue} style={{color: 'green'}}>
                      {y + 1}. {oop.optionValue}
                    </Typography></div>)}
                        
                    </>
                    )}
                    <br/>
                  </>
                ))}
              </div>
              </ThemeProvider>
              <Divider sx={{ marginLeft: "auto", display: { xs: "flex",sm:"none", md: "none" } }}></Divider><br/>
    </div>
  );
};

export default CreatedLobby;
