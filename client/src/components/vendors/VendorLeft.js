import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import SupervisedUserCircleRoundedIcon from '@mui/icons-material/SupervisedUserCircleRounded';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded';
import SummarizeRoundedIcon from '@mui/icons-material/SummarizeRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { vendorLogout } from '../../store/features/authSlice';
import { sidebarClick } from '../../store/features/clickSlice';

function VendorLeft() {
  const {loading,userRedux,companyRedux,error} =useSelector((state)=>({...state.auth}))
  
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleLogout=()=>{
    const stringValue="showDash"
    dispatch(sidebarClick(stringValue))
    dispatch(vendorLogout({navigate}))
  }
  const profileClick=()=>{
    const stringValue="showDash"
    dispatch(sidebarClick(stringValue))
    navigate("/vendorprofile")
  }
  const homeClick=()=>{
    const stringValue="showDash"
    dispatch(sidebarClick(stringValue))
    navigate('/vendorhome')
  }
  const handleMessage=()=>{
    const stringValue="showDash"
    dispatch(sidebarClick(stringValue))
    navigate('/messenger')
  }
  const handleClick=(stringValue)=>{
    dispatch(sidebarClick(stringValue))
  }

  return (
    <Box flex={1} sx={{display:{xs:'none',sm:'none',md:'block',pb:3}}}>
      <Box flex={12} sx={{bgcolor:'#f4a261',position:'fixed',height:'100%',borderRadius:2,p:2,m:3}}>
      <nav aria-label="main mailbox folders">
      <List sx={{marginTop:2}}>
        <ListItem disablePadding>
          <ListItemButton onClick={homeClick}> 
            <ListItemIcon>
              <DashboardCustomizeRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <SupervisedUserCircleRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Managers" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={profileClick}>
            <ListItemIcon>
              <StoreRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <PeopleAltRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={()=>handleClick("showPost")}>
            <ListItemIcon>
              <PostAddRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Posts" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleMessage}>
            <ListItemIcon>
              <PostAddRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Messages" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={handleLogout}>
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItemButton>
        </ListItem>
      </List>
    </nav>
    </Box>
    </Box>
  )
}

export default VendorLeft
