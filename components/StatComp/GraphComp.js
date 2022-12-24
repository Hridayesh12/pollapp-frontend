import React from 'react'
import Chart from "chart.js/auto";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid,Card,Typography } from '@mui/material';
import { Bar,Doughnut} from "react-chartjs-2";
import { useEffect,useState } from 'react';
const GraphComp = ({poll,sr}) => {
  const link = process.env.NEXT_PUBLIC_URL;
  const theme = createTheme();
  theme.typography = {
    fontFamily: ['"Roboto"', "sans-serif"].join(","),
  };
  theme.typography.h3 = {
    fontSize: "1.2rem",
    "@media (min-width:600px)": {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "2rem",
    },
  };
  theme.typography.h5 = {
    fontSize: "1rem",
    "@media (min-width:600px)": {
      fontSize: "1.2rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.2rem",
    },
  };
  theme.typography.h6 = {
    fontSize: "0.8rem",
    "@media (min-width:600px)": {
      fontSize: "1rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1rem",
    },
  };
  const [datass, setdatass] = useState([]);
  const usinnname= async()=>{
    await  fetch(`${link}mailName`,{method:"POST",
    headers: {
        "Content-type": "application/json",
    },
    body: JSON.stringify({data:poll.pollOption})
}).then((res)=>res.json())
    .then((rte)=>{
      if(datass!=rte.Data){
        setdatass(rte.Data);
      }
    })
  }
  useEffect(() => {
      usinnname();
  }, [poll])
    const qb = poll.pollQuestion;
    const [lb, setlb] = useState([]);
    const [db, setdb] = useState([]);
    const [pr,setpr] = useState([]);
    let pe=[];
    const [optT, setoptT] = useState(false);
    useEffect(() => {
        let r1=[]
        let r2=[]
        let r3=[]
        let r4=[]
        let r5=[]
        let galaat,corr;
        for(var i=0;i<5;i++){
            if(poll.pollOption[i].optionValue!=0){
                r1.push(poll.pollOption[i].optionValue);
                r2.push(poll.pollOption[i].optionArray.length);
            }
        }
        for(var i=0;i<5;i++){
          if(poll.pollOption[i].optionCorrect){
              setoptT(true);
          }
      }
      if(optT){
        for(var i=0;i<5;i++){
          if(poll.pollOption[i].optionCorrect){
              r3.push(poll.pollOption[i].optionArray.length);
          }
          else{
            r4.push(poll.pollOption[i].optionArray.length);
          }
          r5.push(poll.pollOption[i].optionArray.length);
      }
      var wrong = r4.reduce(function (x, y) {
        return x + y;
    }, 0);
      var sum = r5.reduce(function (x, y) {
        return x + y;
    }, 0);
    corr = (r3[0]/sum)*100;
    galaat = (wrong/sum)*100;
    // console.log("pe",pe);
      }
      pe.push(corr);
      pe.push(galaat);
      setpr(pe);
        setlb(r1);
        setdb(r2);
    }, [usinnname])

    const options1 = {
      responsive: true,
      
      maintainAspectRatio:false,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: poll.pollQuestion,
        },
      },
    };
    const options2 = {
      responsive: true,
      maintainAspectRatio:false,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Percent of Voters Selected Correct Option',
        },
      },
      
    };
  const data = {
    labels: lb,
    options:{
      maintainAspectRatio: false
    },
    datasets: [
      {
        label: qb,
        data: db,
        options: {
            animation: false
        },
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(77, 255, 77)',
          'rgb(166, 77, 255)'
        ],
        hoverOffset: 4
      
      },
    ],
  };
  const data2 = {
    labels: ['correct option','wrong option'],
    options:{
      maintainAspectRatio: false
    },
    datasets: [
      {
        label: ['correct option','wrong option'],
        data: pr,
        options: {
            animation: false
        },
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(77, 255, 77)',
          'rgb(166, 77, 255)'
        ],
        hoverOffset: 4
      
      },
    ],
  };
  return (
    <div> <ThemeProvider theme={theme}> <Typography variant="h3"  sx={{color:"#439A97"}}>Poll&nbsp;{sr}.<br/>{poll.pollQuestion}</Typography></ThemeProvider>
    <br/>
    <Grid container justifyContent="space-around" alignItems="flex-start"
   direction="column">
     <Grid container justifyContent="space-around" alignItems="flex-start"
   direction={{sm:'column',md:'row'}}>
     <Grid >
        <Card
            raised
            sx={{
              width: {sm:'95vw',md:'45vw'},
              backgroundColor: '#fff',
              borderRadius: '10px',
              padding: '1rem',
              height:'50vh',
              overflow:"auto",
              marginBottom:'5%',
            }}
          >
            <Doughnut
              options={options1}
              data={data}
            />
          </Card>
   </Grid>
   <Grid >
        <Card
            raised
            sx={{
              width: {sm:'95vw',md:'45vw'},
              backgroundColor: '#fff',
              borderRadius: '10px',
              padding: '1rem',
              height:'50vh',
              overflow:"auto"
            }}
          >
            <Bar
              options={options1}
              data={data}
            />
          </Card>
   </Grid>

     </Grid>
   <Grid xs={12} sm={6} md={6}>
   <Card
            raised
            style={{
              width: '95vw',
              backgroundColor: '#fff',
              borderRadius: '10px',
              padding: '1rem',
              height:'50vh',
              marginTop:"15px"
            }}
          >
   <ThemeProvider theme={theme}>
    
        <div
          style={{
            position: "relative",
            height: "50px",
            width: "100%",
            overflow: "auto",
            marginBottom: "7px",
            borderBottom: "3px solid #439A97",
            marginLeft:'2%'
          }}
        >
          <Typography variant="h3" sx={{color:"#439A97"}}>Detailed Information</Typography>
        </div>
        
         {datass.map((ops,s)=>(<div style={{marginLeft:'2%'}}>
                  <Typography variant="h5" sx={{color:"#251749"}}>{s+1}. {ops.value}</Typography>
                  {ops.voters.map((zpx,d)=>( <div style={{marginLeft:'3%',maxHeight:'70px',overflow:'auto'}}>
                  <Typography variant="h6" sx={{color:"#62B6B7"}}>{zpx}</Typography>
                  </div>))}
                </div>))}
            </ThemeProvider>
            </Card>

   </Grid>
   </Grid>
    </div>
  )
}

export default GraphComp