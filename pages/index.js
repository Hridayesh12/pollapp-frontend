import React from 'react';
import styles from "../styles/Home.module.css";
import { GoogleLogin } from "react-google-login";
import { useState, useEffect } from "react";
import Homepage from "../components/Homepage";
import Dialog from '@mui/material/Dialog';
import Swal from 'sweetalert2';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import LoadingComp from '../components/LoadingComp.js';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
  

export default function Home() {
  const [open, setOpen] = React.useState(false);
	const [userInfo, setUserInfo] = useState({});
  const [loading, setloading] = useState(true);
  const link = process.env.NEXT_PUBLIC_URL;
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
      setloading(false);
			if (res.status === 200 || res.status===201) {
                setUserInfo(data);

			}
            else if (res.status === 422) {
                    setOpen(true);
            }
            else
            {
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
			const res = await fetch(`${link}login`, {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
                    mail,
                    name,
                    givenName,
				}),
        credentials: "include",
			});
            const data= await res.json();
			if (res.status === 400 || !data) {
                window.alert('Something went wrong')
			} else if (res.status === 200 || res.status === 201) {
        window.alert('Logged In Successful');
                setOpen(false);
                userd();
			} 
            else if(res.status === 422)
                {
                  window.alert('Signup First')
			}
            else
            {
              window.alert('Invalid USER')
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
			const res = await fetch(`${link}u`, {
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
        window.alert('Signed Up Successfull Login To Continue')
			} 
            else if(res.status === 422)
            
            {
              window.alert('User Already Exist')
            }
            else {
			}
		}
	};
  var usern = userInfo;
  var userIds = usern._id;
  useEffect(() => {
      userd();
      }, [])

  return (
    <>
		{loading ? <LoadingComp/> : 
    <div className={styles.container}>
      {userInfo ? <Homepage />:<></>}
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
}
</>
  );
}
