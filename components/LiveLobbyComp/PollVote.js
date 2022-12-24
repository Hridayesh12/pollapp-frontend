import React from 'react';
import styles from "../../styles/Home.module.css";
import { GoogleLogin } from "react-google-login";
import { useState, useEffect } from "react";
import VotePage from "./PollVoteComp/VotePage";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Footer from '../Footer';
import LoadingComp from '../LoadingComp.js';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
  
const PollVote = ({id}) => {
  const lobid = id;
  const lobbyuuid = id;
  const [open, setOpen] = React.useState(false);
  const [loading, setloading] = useState(true);
  const subjectpolladd = async (mail) => {
    let subject = '';
    let subexist =  '';
      if(id){
        subexist=id.includes('s');
       if(subexist){
           subject = id.slice(19);
           // console.log(subject,id);
       }
       else{
        subject='general';
        // console.log(subject);
       }
     }
    // console.log(subject);
    try {
      // console.log("Hi",mail);
        await fetch(`${link}subjectpolladd`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                mail,
                subject,
                luuid:id,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
        if (data.error) {
            // console.log(data.error);
        } else {
            // console.log(data);
        }
        })
    }
    catch(err) {
      // console.log(err);
    };
}
  const [timedPopup, setTimedPopup] = useState(false);
	const [userInfo, setUserInfo] = useState(null);
  const link = process.env.NEXT_PUBLIC_URL;
  const suserd = async () => {
		try {
			const res = await fetch(`${link}suserdata`, {
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				credentials: "include",
			});
			const data = await res.json();
		
            setloading(false);
			if (res.status === 200 || res.status===201) {
			
                setUserInfo(data);
			}
            else if (res.status === 422) {
              // console.log("ERROR 422");
              setTimedPopup(true);
              setOpen(true);
            }
            else
            {
                // console.log("ERROR 400");
                setTimedPopup(true);
                setOpen(true);
            
            }
		} catch (err) {
		}
	};
    const responseGoogle = async (response) => {
        const mail=response.profileObj.email
        const name=response.profileObj.name
        const givenName=response.profileObj.givenName
   
        if (
			!mail ||
			!name ||
			!givenName 
		) {
		} else {
      let subject = '';
    let subexist =  '';
      if(id){
        subexist=id.includes('s');
       if(subexist){
           subject = id.slice(19);
           // console.log(subject,id);
       }
       else{
        subject='general';
        // console.log(subject);
       }
     }
    // console.log(subject);
			const res = await fetch(`${link}slogin`, {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
                    mail,
                    name,
                    givenName,
                    subject,
                    luuid:id,
				}),
        credentials: "include",
			});
            const data= await res.json();
			if (res.status === 400 || !data) {
                window.alert('Something went wrong')
			} else if (res.status === 200 || res.status === 201){
      suserd();
      subjectpolladd(mail);
      window.alert("SUCCESSFULLY LOGGED IN");
      setOpen(false);
      setTimedPopup(false);
} 
            else if(res.status === 422)
                {
                    // console.log("ERROR 422")
			}
            else
            {
                window.alert("INVALID USER")
            }
		}
	};
    const responseeGoogle = async (response) => {
        
        const mail=response.profileObj.email
        const name=response.profileObj.name
        const givenName=response.profileObj.givenName
        
        if (
			!mail ||
			!name ||
			!givenName 
		) {
		} else {
			const res = await fetch(`${link}su`, {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
                    mail,
                    name,
                    givenName,
				}),
			});
            const data= await res.json();
			if (res.status === 400 || !data) {
                window.alert('Something went wrong')
			} else if (res.status === 200 || res.status === 201) {
                // console.log("SIGNED IN");
			} 
            else if(res.status === 422)
            {
               // console.log("Poppy");
            }
            else {
			}
		}
	};
  var usern = userInfo;
  useEffect(() => {
      suserd();
      }, [])
    function view(){
        // console.log(usern);
    }
    
   
  return (
    <>
		{loading ? <LoadingComp/> : 
    <>
    <div style={{backgroundColor:"#FAF8F1",minHeight:'100vh'}}>
              
      <VotePage usern={userInfo} lobbyid={lobid}/>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"SIGN UP OR LOGIN TO CONTINUE"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          <div style={{display:"flex",width:"100%",alignItems:"center",justifyContent:"center",flexWrap:"wrap"}}>
                <GoogleLogin id="log" className={styles.log} 
                            clientId="399611436919-fo4n24pr7bpmslat5vamj5u8rc5q0v6f.apps.googleusercontent.com"
                            buttonText="LOGIN IN"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            color="primary"
                        />&nbsp;&nbsp;
                   <GoogleLogin id="sign" className={styles.sign} 
                            clientId="399611436919-fo4n24pr7bpmslat5vamj5u8rc5q0v6f.apps.googleusercontent.com"
                            buttonText="SIGN UP"
                            onSuccess={responseeGoogle}
                            onFailure={responseeGoogle}
                            cookiePolicy={'single_host_origin'}
                            color="primary"
                        />
                </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
    <Footer/>
    </>
}</>
  );
}

export default PollVote;
