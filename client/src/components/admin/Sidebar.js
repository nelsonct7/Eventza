
import { Box, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography,} from '@mui/material'
import React from 'react'
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import SupervisedUserCircleRoundedIcon from '@mui/icons-material/SupervisedUserCircleRounded';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded';
import SummarizeRoundedIcon from '@mui/icons-material/SummarizeRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import {useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { sidebarClick } from '../../store/features/clickSlice';
import { adminLogout } from '../../store/features/authSlice';



const Sidebar = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const handleLogout=()=>{
    dispatch(adminLogout(navigate))
  }

  const handleClick=(stringValue)=>{
    dispatch(sidebarClick(stringValue))
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 200,padding:5, height:'100%',marginBottom:1,boxShadow:10,bgcolor:'#613dc1',borderRadius:2,display:{xs:'none',sm:'block',m:2}}} >
    <Box sx={{position:'fixed',}}>
    <Box sx={{p:1}}>
    <Grid container bgcolor={'#4e148c'} sx={{border:'GrayText', borderRadius:1,width:'100%',marginTop:2,height:50,p:1}}>
        <Grid item><ManageAccountsIcon/> </Grid>
        <Grid item>
            <Typography variant='h6'>Eventza Admin</Typography>
        
        </Grid>
    </Grid> 
    </Box>
    <nav aria-label="main mailbox folders">
      <List sx={{marginTop:2}}>
        <ListItem disablePadding onClick={()=>handleClick("showDash")}>
          <ListItemButton>
            <ListItemIcon>
              <DashboardCustomizeRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="DashBoard" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={()=>handleClick("showManager")}>
          <ListItemButton>
            <ListItemIcon>
              <SupervisedUserCircleRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Managers" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={()=>handleClick("showCompany")}>
          <ListItemButton>
            <ListItemIcon>
              <StoreRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Companies" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={()=>handleClick("showUser")}>
          <ListItemButton>
            <ListItemIcon>
              <PeopleAltRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={()=>handleClick("showPost")}>
          <ListItemButton>
            <ListItemIcon>
              <PostAddRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Posts" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={()=>handleClick("showReports")}>
          <ListItemButton>
            <ListItemIcon>
              <SummarizeRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={handleLogout}>
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItemButton>
        </ListItem>
      </List>
    </nav>
  </Box>
  </Box>
  )
}

export default Sidebar
