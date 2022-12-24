import React from 'react';
import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, Divider, Paper, Grid, Dialog, IconButton, Tooltip, DialogTitle, DialogContent, DialogContentText, Button, TextField, FormHelperText, DialogActions } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PreviewIcon from '@mui/icons-material/Preview';
import { Table, TableCell, TableRow, TableHead, TableBody, TableContainer } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Chip from '@mui/material/Chip';
import swal from 'sweetalert';
import { useRouter } from "next/router";
import * as XLSX from 'xlsx';
import instructions from '../assets/instructions.png';
import Image from 'next/image';
import Swal from 'sweetalert2';
import pollapp from '../assets/logo.png';
import polls from '../assets/pollapp.png';
import subs from '../assets/subjects.png';
import lobby from '../assets/lobby.png';
import PollIcon from '@mui/icons-material/Poll';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { motion } from 'framer-motion';
import LoadingComp from './LoadingComp.js';
import Footer from './Footer';
const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#6699ff',
	...theme.typography.body2,
	padding: theme.spacing(2),
	color: 'white',
}));

const Profile = () => {
	const [loading, setloading] = useState(true);
	const theme = createTheme();
	theme.typography = {
		fontFamily: ['"Inter"', "sans-serif"].join(","),
	};
	theme.typography.h1 = {
		fontSize: '5rem',
		'@media (max-width: 630px)': {
			fontSize: '4.5rem',
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
	theme.typography.h2 = {
		fontSize: '3rem',
		'@media (max-width: 400px)': {
			fontSize: '2.5rem',
		},
		'@media (max-width: 321px)': {
			fontSize: '1.5rem',
		},
	};
	theme.typography.h3 = {
		fontSize: "1rem",
		"@media (min-width:600px)": {
			fontSize: "1.2rem",
		},
		[theme.breakpoints.up("md")]: {
			fontSize: "1.5rem",
		},
	};
	theme.typography.h5 = {
		fontSize: "0.8rem",
		"@media (min-width:600px)": {
			fontSize: "1rem",
		},
		[theme.breakpoints.up("md")]: {
			fontSize: "1rem",
		},
	};
	const router = useRouter();
	const [userInfo, setUserInfo] = useState({});
	const link = process.env.NEXT_PUBLIC_URL;
	const [lobbies_no, setlobbies_no] = useState(0);
	let [lobbies, setLobbies] = useState([]);
	let [clobbies, setClobbies] = useState([]);
	let [pollies, setPollies] = useState([]);


	const callProfiles = async () => {
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
			let lob_no = lobbies.length + clobbies.length;
			setlobbies_no(lob_no);
			if (!res.status === 200) {
				window.alert("login first");
			}
		} catch (err) {
		}
	}

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
			allpolls(data._id);
			openlobbies(data._id, null);
			closelobbies(data._id, null);
			let lob_no = lobbies.length + clobbies.length;
			setlobbies_no(lob_no);
			setloading(false);
			if (!res.status === 200) {
				window.alert("login first");
			}
		} catch (err) {
		}
	}

	const allpolls = async (userIds, sub) => {
		const res = await fetch(`${link}usrpolls`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ tata: userIds }),
		})
		const data = await res.json();
		setPollies(data);
	};

	const openlobbies = async (userIds, sub) => {
		const res = await fetch(`${link}usrlobbies`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ tata: userIds, sub: sub }),
		})
		const data = await res.json();
		setLobbies(data);
	};

	const closelobbies = async (userIds, sub) => {
		const res = await fetch(`${link}clsrlobbies`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ tata: userIds, sub: sub }),
		})
		const data = await res.json();
		setClobbies(data);
	};

	const [openl, setOpenl] = React.useState(false);

	const handleClickOpenl = () => {
		setOpenl(true);
	};

	const handleClosel = () => {
		setOpenl(false);
	};

	const [openp, setOpenp] = React.useState(false);

	const handleClickOpenp = () => {
		setOpenp(true);
	};

	const handleClosep = () => {
		setOpenp(false);
	};
	useEffect(() => {
		callProfilePage();
	}, []);
	useEffect(() => {
		callProfiles();
	}, [userInfo]);
	/*Subject Button*/
	const [openps, setOpenps] = useState(false);
	const handleClickOpenps = () => {
		// // console.log("Hi");
		setOpenps(true);
	};
	const handleCloseps = () => {
		setOpenps(false);
	};

	/*Subject Name Setting */
	const [filename, setfilename] = useState("No File Chosen");
	const [subjectName, setsubjectName] = useState(null);
	const [helpTxt, setHelpTxt] = useState("Suject Name should not contain spaces");
	let value;
	const handlingSubject = (e) => {
		value = e.target.value;
		let firstchar = value.charAt(0);
		if (firstchar <= '9' && firstchar >= '0') {
			setHelpTxt("Name should not begin with number");
			setsubjectName("");
			e.target.value = "";
		}
		else if (firstchar == " ") {
			setsubjectName("");
			e.target.value = "";
		}
		else {
			setsubjectName(e.target.value);
			setHelpTxt("accepted");
		}
	};
	const handleSpace = (e) => {
		if (e.keyCode === 32) {
			setsubjectName("");
			e.target.value = "";
		}

	}


	/*Upload Function */
	const [excelFile, setExcelFile] = useState(null);

	// submit
	const [excelData, setExcelData] = useState();

	const [emailArray, setEmailArray] = useState([]);
	// it will contain array of objects
	const fileType = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
	const UploadFile = (e) => {
		// console.log("yes");
		let selectedFile = e.target.files[0];
		setfilename(e.target.files[0].name);
		// console.log(selectedFile);
		if (selectedFile) {
			// console.log(selectedFile.type);
			if (selectedFile && fileType.includes(selectedFile.type)) {
				let reader = new FileReader();
				reader.readAsArrayBuffer(selectedFile);
				reader.onload = (e) => {
					// console.log("Hi", e.target.result);
					setExcelFile(e.target.result);
				}
			}
			else {
				swal("Warning", "Upload Excel File Only", "warning");
				setExcelFile(null);
				setsubjectName('');
				setfilename(null);
				setExcelData(null);
				setEmailArray([]);
				setfilename("No File Chosen");
			}
			// console.log(excelFile);
		}
		else {
			// console.log("Please Select The File")
		}
	}


	/*Submit handler */
	const SubmitHandler = async () => {
		let subValArr = []
		let subVal = userInfo.Subject;
		let len = userInfo.Subject.length;
		if (len == 0 || len == undefined || len == null) {
			if (subjectName == '') {
				swal("Warning", "Please Fill All The Details", "warning");
			}
			else if (excelFile) {
				const workbook = XLSX.read(excelFile, { type: 'buffer' });
				// // console.log(workbook)
				const worksheetName = workbook.SheetNames[0];
				const worksheet = workbook.Sheets[worksheetName];
				const data = XLSX.utils.sheet_to_json(worksheet);
				setExcelData(data);
				for (let i = 0; i < data.length; i++) {
					emailArray.push(data[i].Email);
				}
				let mailid = userInfo.mail;
				const res = await fetch(`${link}createNewSubject`, {
					method: "POST",
					headers: {
						"Content-type": "application/json",
					},
					body: JSON.stringify({ subjectName, emailArray, mailid })
				});
				const dt = await res.json();
				// // console.log(dt);
				if (res.status === 400 || !dt) {
					swal("Warning", "Subject Creation Failed", "warning");
					setfilename("No File Chosen");
					setExcelFile(null);
					setsubjectName('');
					setfilename(null);
					setExcelData(null);
					setEmailArray([]);
				} else if (res.status === 200 || res.status === 201) {
					setOpenps(false);
					swal("Success", "Subject Created Successfully", "success");
				}
			}
			else {
				swal("Warning", "Kindly Upload Excel File Only", "warning");
			}
		}
		else {
			for (let i = 0; i < len; i++) {
				// // console.log(i);
				subValArr.push(userInfo.Subject[i].SubjectValue);
			}
			if (subValArr.includes(subjectName)) {
				swal("Warning", "Subject Already Exists", "warning");
				setfilename("No File Chosen");
				setExcelFile(null);
				setsubjectName('');
				setfilename(null);
				setExcelData(null);
				setEmailArray([]);
			}
			else if (subjectName == null || subjectName == '') {
				swal("Warning", "Please Fill All The Details", "warning");
			}
			else if (excelFile) {
				const workbook = XLSX.read(excelFile, { type: 'buffer' });
				// // console.log(workbook)
				const worksheetName = workbook.SheetNames[0];
				const worksheet = workbook.Sheets[worksheetName];
				const data = XLSX.utils.sheet_to_json(worksheet);
				setExcelData(data);
				for (let i = 0; i < data.length; i++) {
					// // console.log(data[i].Email);
					emailArray.push(data[i].Email);
				}
				let mailid = userInfo.mail;
				const res = await fetch(`${link}createNewSubject`, {
					method: "POST",
					headers: {
						"Content-type": "application/json",
					},
					body: JSON.stringify({ subjectName, emailArray, mailid })
				});
				const dt = await res.json();
				// // console.log(dt);
				if (res.status === 400 || !dt) {
					swal("Warning", "Subject Creation Failed", "warning");
					setfilename("No File Chosen");
					setExcelFile(null);
					setsubjectName('');
					setfilename(null);
					setExcelData(null);
					setEmailArray([]);
				} else if (res.status === 200 || res.status === 201) {
					setOpenps(false);
					swal("Success", "Subject Created Successfully", "success");
				}
			}
			else {
				swal("Warning", "Kindly Upload Excel File Only", "warning");
			}
		}

	}

	/*Preview */
	const [opentb, setOpentb] = React.useState(false);
	const handleClickOpentb = () => {
		setOpentb(true);
		if (excelFile) {
			const workbook = XLSX.read(excelFile, { type: 'buffer' });
			const worksheetName = workbook.SheetNames[0];
			const worksheet = workbook.Sheets[worksheetName];
			const data = XLSX.utils.sheet_to_json(worksheet);
			setExcelData(data);
		}
		else {
			Swal.fire({
				position: 'top-middle',
				icon: 'Error',
				title: 'Upload Excel File First',
				showConfirmButton: false,
				timer: 1500
			})
		}
	};
	const handleClosetb = () => {
		setOpentb(false);
	};

	/*Instructions */
	const [openi, setOpeni] = React.useState(false);
	const handleClickOpeni = () => {
		setOpeni(true);
	}
	const handleClosei = () => {
		setOpeni(false);
	}
	return (
		<>
		{loading ? <LoadingComp/> : 
		<div style={{ minHeight: '100vh', backgroundColor: '#FAF8F1' }}>
		<AppBar sx={{ backgroundColor: '#C58940' }}>
			<Toolbar>
				<Image src={pollapp} width={20} height={20} onClick={() => {
					router.push("/");
				}} />
				<Typography variant="h6" sx={{ display: { xs: "none", md: "flex" }, ml: 2 }} onClick={() => {
					router.push("/");
				}}>
					POLLAPP
				</Typography>
			</Toolbar>
		</AppBar>

		<Box sx={{ marginTop: '5rem', padding: '1rem' }}>
			<ThemeProvider theme={theme}>
				<Typography variant="h2" align="center" sx={{ mb: 2 }}>
					Welcome Back, {userInfo.givenName}!
				</Typography>
			</ThemeProvider>
			<Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, width: '100%', mb: 2 }}>
				<ThemeProvider theme={theme}>
					<Typography variant="h3" sx={{ mt: 2 }}>Email :&nbsp;</Typography>
					<TextField sx={{ width: { xs: '100%', sm: '50%', md: '25%' } }} id="outlined-basic" variant="outlined" value={userInfo.mail} disabled />
				</ThemeProvider>
			</Box>
			<Grid sx={{ width: '100%' }} container direction={{ xs: "column", md: "row" }} alignItems="center" justifyContent="center" rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 6 }} columns={{ xs: 4, sm: 8, md: 12 }}>
				<ThemeProvider theme={theme}>
					<Grid item xs={12} sm={6} md={2}>
						<Box component={motion.div} whileHover={{ scale: 1.055, boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)' }}
							onHoverStart={e => { }}
							onHoverEnd={e => { }}
							onClick={handleClickOpenl}
							sx={{ width: { xs: '200px', sm: '250px' }, cursor: 'pointer', borderRadius: '10px', height: { xs: '200px', sm: '250px' }, backgroundColor: "#CBEDD5", display: "flex", flexDirection: "column", alignItems: "center", padding: "7px" }}>
							<Image src={lobby} width={70} height={70} />
							<Typography sx={{ mt: 2 }} variant="h3" align="center">No. Of Lobbies Created</Typography>
							<Typography variant="h1">{lobbies_no}</Typography>
						</Box>
					</Grid>
					<Grid item xs={12} sm={6} md={2}>
						<Box component={motion.div} whileHover={{ scale: 1.055, boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)' }}
							onHoverStart={e => { }}
							onHoverEnd={e => { }}
							sx={{ width: { xs: '200px', sm: '250px' }, borderRadius: '10px', height: { xs: '200px', sm: '250px' }, backgroundColor: "#CBEDD5", display: "flex", flexDirection: "column", alignItems: "center", padding: "7px" }}>
							<Image src={subs} width={70} height={70} />
							<Typography sx={{ mt: 2 }} variant="h3" align="center">No. Of Subjects Created</Typography>
							<Typography variant="h1">
								{userInfo.Subject == undefined ? '0' : `${userInfo.Subject.length}`}
							</Typography>
						</Box>
					</Grid>
					<Grid item xs={12} sm={6} md={2}>
						<Box component={motion.div} whileHover={{ scale: 1.055, boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)' }}
							onHoverStart={e => { }}
							onHoverEnd={e => { }}
							onClick={handleClickOpenp}
							sx={{ width: { xs: '200px', sm: '250px' }, cursor: 'pointer', borderRadius: '10px', height: { xs: '200px', sm: '250px' }, backgroundColor: "#CBEDD5", display: "flex", flexDirection: "column", alignItems: "center", padding: "7px" }}>
							<Image src={polls} width={70} height={70} />
							<Typography sx={{ mt: 2 }} variant="h3" align="center">No. Of Polls Created</Typography>
							<Typography variant="h1">{pollies.length}</Typography>
						</Box>
					</Grid>
				</ThemeProvider>
			</Grid>
			<Divider sx={{ mt: 2 }}></Divider>
			<Box sx={{ flexGrow: 1 }}>
				<ThemeProvider theme={theme}>
					<Typography variant="h3" sx={{ mt: 3 }}>Subjects Created - </Typography>
				</ThemeProvider>
				<br />
				<Grid container direction={{ xs: "column", md: "row" }} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

					{userInfo.Subject == undefined ?
						<></>
						:
						userInfo.Subject.map((value, index) => <Grid item xs={12} sm={6} md={4} key={index}>
							<Item value={value} key={index} sx={{ backgroundColor: '#62B6B7', color: "#FAF8F1" }}>
								<ThemeProvider theme={theme}>

									<Typography variant='h3' sx={{ color: '#CBEDD5' }}>{value.SubjectValue}</Typography>
									<Typography variant="h5">Lobbies: {value.SubPollid.length}</Typography>
									<Typography variant="h5">Voters: {value.StuMail.length}</Typography>
								</ThemeProvider>
							</Item>
						</Grid>)}
				</Grid>
				<br />
				<Button variant="contained" sx={{ backgroundColor: '#C58940' }} onClick={handleClickOpenps}>Add New Subject</Button>
			</Box>



			<Dialog
				fullScreen
				open={openl}
				onClose={handleClosel}
			>
				<AppBar sx={{ position: 'relative',backgroundColor:'#439A97' }}>
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={handleClosel}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
						<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
							Lobby
						</Typography>
					</Toolbar>
				</AppBar>
				<Grid sx={{mt:5,mx:1}} container spacing={7} rowSpacing={3} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
					{lobbies.map(lobby => (
						<Grid item xs={12} sm={6} md={4} key={lobby._id} sx={{px:3}}>
							<div style={{ position: "relative", marginLeft:'7px', color: "#439A97", borderRadius: '20px', backgroundColor: "#97DECE" }}>
								<div style={{ display: "flex", position: "absolute", right: "-20px", top: "-22px" }}>
									<Chip style={{ backgroundColor: "#439A97" }} sx={{ color: "#CBEDD5" }} icon={<PollIcon sx={{ color: "#CBEDD5 !important" }} />} label={lobby.pollId ? lobby.pollId.length : ''} />
								</div>
								<ThemeProvider theme={theme}>
									<div style={{ position: "relative",borderBottom:'3px solid #439A97', height: "50px", overflow: "auto", marginTop: "8px", marginBottom: "7px", paddingTop: "5px", paddingLeft: "10px" }}>
										<Typography variant='h3'>{lobby.lobbyName}</Typography>
									</div>
									<div style={{ position: "relative", height: "60px", overflow: "auto", marginBottom: "7px", paddingTop: "3px", paddingLeft: "10px" }}>
										<Typography variant='h4'>{lobby.lobbyDescription}</Typography>
									</div>
								</ThemeProvider>
							</div>
						</Grid>
					))}
					{clobbies.map(lobby => (
						<Grid item xs={12} sm={6} md={4} key={lobby._id} sx={{px:3}}>
							<div style={{ position: "relative",  marginLeft:'10px',color: "#439A97", borderRadius: '20px', backgroundColor: "#97DECE" }}>
								<div style={{ display: "flex", position: "absolute", right: "-20px", top: "-22px" }}>
									<Chip style={{ backgroundColor: "#439A97" }} sx={{ color: "#CBEDD5" }} icon={<PollIcon sx={{ color: "#CBEDD5 !important" }} />} label={lobby.pollId ? lobby.pollId.length : ''} />
								</div>
								<ThemeProvider theme={theme}>
									<div style={{ position: "relative", height: "50px", overflow: "auto", marginTop: "8px", marginBottom: "7px", paddingTop: "5px", paddingLeft: "10px" }}>
										<Typography variant='h3'>{lobby.lobbyName}</Typography>
									</div>
									<div style={{ position: "relative", height: "60px", overflow: "auto", marginBottom: "7px", paddingTop: "3px", paddingLeft: "10px" }}>
										<Typography variant='h4'>{lobby.lobbyDescription}</Typography>
									</div>
								</ThemeProvider>
							</div>
						</Grid>
					))}
				</Grid>
			</Dialog>




			<Dialog
				fullScreen
				open={openp}
				onClose={handleClosep}
				
			>
				<AppBar sx={{ position: 'relative',backgroundColor:'#439A97' }}>
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={handleClosep}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
						<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
							Polls
						</Typography>
					</Toolbar>
				</AppBar>
				<Box sx={{backgroundColor:"#FAF8F1"}}>
				<Grid sx={{mt:5,mx:1}} container spacing={7} rowSpacing={3} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>

				{pollies.map(lobby => (
						<Grid item xs={12} sm={6} md={4} key={lobby._id} sx={{px:3}}>
							<div style={{ position: "relative", marginLeft:'10px',color: "#251749", borderRadius: '20px', backgroundColor: '#62B6B7' }}>
								
								<ThemeProvider theme={theme}>
									<div style={{ position: "relative",height: "40px", overflow: "auto", marginTop: "8px", marginBottom: "7px", paddingTop: "5px", paddingLeft: "10px", borderBottom:'3px solid #439A97' }}>
										<Typography variant='h3' sx={{color:'#CBEDD5'}} >{lobby.pollQuestion}</Typography>
									</div>
									<div style={{ position: "relative", height: "30px", overflow: "auto", marginBottom: "7px", paddingTop: "3px", paddingLeft: "10px" }}>
										<Typography variant='h4'>Options : {lobby.pollOption.length}</Typography>
									</div>
									<div style={{ position: "relative", height: "40px", overflow: "auto", marginBottom: "7px", paddingTop: "3px", paddingLeft: "10px" }}>
										{lobby.pollOption.map(opt=>(
											<Typography variant='h4'>
											{opt.optionCorrect===true ? `Correct Option :  ${opt.optionValue}`:''}
										</Typography>
										))}
									</div>
								</ThemeProvider>
							</div>
						</Grid>
					))}
					</Grid>
					</Box>
			</Dialog>




			<Dialog style={{ width: { xs: '100vw' } }} open={openps} fullWidth>
				<DialogTitle>Create New Subject</DialogTitle>
				<DialogContent>
					<DialogContentText>

					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Subject Name"
						fullWidth
						variant="standard"
						onChange={handlingSubject} helperText={helpTxt} onKeyDown={handleSpace} required
					/>
					<div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
						<label htmlFor="contained-button-file">
							<input style={{ display: 'none' }} accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" id="contained-button-file" type="file" aria-describedby="my-helper-text" onChange={UploadFile} required />
							<Button variant="contained" component="span">Upload</Button>
							<FormHelperText id="my-helper-text">{filename}</FormHelperText>
						</label>
					</div>
					<marquee>Kindly Go Through The Instructions and ALso watch the preview before adding new subject</marquee>
					<Button variant="contained" onClick={handleClickOpeni}>Instructions</Button>
					<Tooltip title="Preview of excel uploaded" >
						<IconButton >
							<PreviewIcon fontSize='large' onClick={handleClickOpentb} />
						</IconButton>
					</Tooltip>
				</DialogContent>
				<DialogActions>
					<Button variant="contained" color="error" onClick={handleCloseps} >Cancel</Button>
					<Button variant="contained" color="success" endIcon={<AddCircleOutlineIcon />} onClick={SubmitHandler}>Create</Button>
				</DialogActions>
			</Dialog>

			<Dialog open={opentb}>
				<DialogTitle style={{ display: "flex", justifyContent: "space-between", flexWrap: "no-wrap", backgroundColor: "#DAECFF" }}>Uploaded Xlsx File
					<Tooltip title="Close" style={{ position: "absolute", right: 0 }}>
						<IconButton >
							<CloseIcon fontSize='medium' onClick={handleClosetb} />
						</IconButton>
					</Tooltip>
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						<h3 style={{ fontWeight: "normal" }}><u>Subject Name</u>: {subjectName}</h3>
						<TableContainer component={Paper}>
							<Table sx={{ minWidth: 650 }} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Name</TableCell>
										<TableCell align="right">Roll No</TableCell>
										<TableCell align="right">Email</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{excelData == undefined ? <>No enteries filled</> : <>
										{excelData.map((row, i) => (
											<TableRow key={excelData.Name}
												sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
												<TableCell component="th" scope="row">{excelData[i].Name}
												</TableCell>
												<TableCell align="right">{excelData[i].RollNo}</TableCell>
												<TableCell align="right">{excelData[i].Email}</TableCell></TableRow>
										))}
									</>}
								</TableBody>
							</Table>
						</TableContainer>
					</DialogContentText>
				</DialogContent>
				<DialogActions></DialogActions>
			</Dialog>

			<Dialog open={openi}>
				<DialogTitle style={{ display: "flex", justifyContent: "space-between", flexWrap: "no-wrap", backgroundColor: "#DAECFF" }}>Excel File Format
					<Tooltip title="Close" style={{ position: "absolute", right: 0 }}>
						<IconButton >
							<CloseIcon fontSize='medium' onClick={handleClosei} />
						</IconButton>
					</Tooltip>
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						<Image src={instructions} />
					</DialogContentText>
				</DialogContent>
			</Dialog>
		</Box>
	</div>
	}
	<Footer/>
		</>
	)
}

export default Profile