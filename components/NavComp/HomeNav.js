import React from "react";
import { Box, Button } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/router";
import { motion } from 'framer-motion';
const HomeNav = () => {
  const router=useRouter();
  return (
    <Box sx={{ marginLeft: "auto", display: { xs: "none", md: "flex" } }}>
      <Button
        variant="text"
        style={{color:'#251749'}}
        component={motion.div}
        initial={{y:-250}} animate={{y:0}} transition={{type: 'spring', stiffness: 300}}
        startIcon={<DashboardIcon />}
        onClick={() => {
          router.push("/dashboard/info");
        }}
      >
        Dashboard
      </Button>
      <Button
        variant="text"
        style={{color:'#251749'}}
        component={motion.div}
        initial={{y:-250}} animate={{y:0}} transition={{type: 'spring', stiffness: 300,delay:0.3}}
        startIcon={<AccountCircleIcon />}
        onClick={() => {
          router.push("/auth/profile");
        }}
      >
        Account
      </Button>
      <Button variant="text" style={{color:'#251749'}}  component={motion.div}
  initial={{y:-250}} animate={{y:0}} transition={{type: 'spring', stiffness: 300,delay:0.5}} startIcon={<LogoutIcon />}>
        Logout
      </Button>
    </Box>
  );
};

export default HomeNav;