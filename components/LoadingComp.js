import * as React from 'react';
import Box from '@mui/material/Box';
import SyncLoader from "react-spinners/SyncLoader";
import loader from '../assets/loader.svg'
const LoadingComp = () => {
  return (
    <div
      style={{ width: "100%", height: "100%", position: "fixed", zIndex: "70",backgroundColor:"white",left:-1,}}
    >
      <Box sx={{ display:{xs:'none',md:'flex'},alignItems:'center',justifyContent:'center',width:'100vw',height:'50vh'}}>
        
<SyncLoader
  color="#4A5FC1"
  margin={5}
  size={20}
/>
      </Box>
      <Box sx={{ display:{xs:'flex',md:'none'},alignItems:'center',justifyContent:'center',width:'100vw',height:'70vh'}}>
      <SyncLoader
  color="#4A5FC1"
  margin={2}
  size={10}
/>
      </Box>
    </div>
  );
}

export default LoadingComp;
