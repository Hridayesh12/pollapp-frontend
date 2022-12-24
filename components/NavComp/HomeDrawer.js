import React from "react";
import {
  Box,
  Menu,
  MenuItem,
  Tooltip,
  IconButton,
  Avatar,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useRouter } from "next/router";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
const HomeDrawer = () => {
 
    const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  /*First Character Data*/
 
  return (
    <Box sx={{ marginLeft: "auto", display: { xs: "flex", md: "none" } }}>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar sx={{ width: 32, height: 32 }}><PermIdentityIcon/> </Avatar>
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
            mt: 6.0,
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
         <MenuItem onClick={() => {
          router.push("/dashboard/info");
        }}>
          <DashboardIcon />
          Dashboard
        </MenuItem>
        <MenuItem onClick={() => {
          router.push("/auth/profile");
        }}>
          <AccountCircleIcon />
          Account
        </MenuItem>
        <MenuItem>
          <LogoutIcon />
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default HomeDrawer;