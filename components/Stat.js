import React from 'react'
import { useState, useEffect } from 'react';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import TabContext from '@mui/lab/TabContext';
import { Button } from '@mui/material';
import TabPanel from '@mui/lab/TabPanel';
import GraphComp from './StatComp/GraphComp';
import { useRouter } from 'next/router';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import DownloadIcon from '@mui/icons-material/Download';
import Swal from 'sweetalert2';
import Footer from './Footer';
const Stat = ({ id }) => {
  const lobbyuuid = id;
  const router = useRouter();
  const link = process.env.NEXT_PUBLIC_URL;
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [polldes, setItems] = useState([]);
  const [lobbydes, setTritems] = useState([]);
  useEffect(() => {
    fetch(`${link}bobs`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ data: lobbyuuid })
    }).then((res) => res.json())
      .then((ret) => {
        setItems(ret.myitem);

      })
  }, [lobbydes]);

  useEffect(() => {
    fetch(`${link}ross`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ data: lobbyuuid })
    }).then((res) => res.json())
      .then((rte) => {
        setTritems(rte.myitem[0]);

      })
  }, [polldes]);

  const downloadd = () => {


    excel();

  }
  const excel = async () => {
    await fetch(`${link}excel`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        giorno: polldes,
        dio: lobbydes,
      }),

    }).then((response) => {
      console.log(response);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "export.xlsx");
      document.body.appendChild(link);
      link.click();
    });

  }
  return (
    <>
      <div style={{ minHeight: "100vh", backgroundColor: "#FAF8F1" }}>
        <div style={{ display: "flex", width: "100vw", justifyContent: "space-between", flexWrap: "wrap" }}>
          <Button
            variant="contained"
            sx={{ margin: '1%', backgroundColor: '#C58940', color: '#FAF8F1' }}
            startIcon={<ArrowBackIosIcon />}
            onClick={() => router.push("/dashboard/info")}
          >
            Dashboard
          </Button>
          <Button variant="contained"
            sx={{ margin: '1%', backgroundColor: '#C58940', color: '#FAF8F1' }} startIcon={<DownloadIcon />} onClick={downloadd}>DOWNLOAD Excel</Button>
        </div>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs textColor="secondary"
              indicatorColor="secondary" onChange={handleChange} variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              aria-label="scrollable force tabs example">
              {polldes.map((polls, x) => (
                <Tab label={`Poll ${x + 1}`} value={`${x + 1}`} />
              ))}
            </Tabs>
          </Box>
          {polldes.map((polls, x) => (
            <TabPanel value={`${x + 1}`}><GraphComp poll={polls} sr={x + 1} /></TabPanel>
          ))}
        </TabContext>
      </div>
      <Footer />
    </>
  )
}

export default Stat;