import React,{useState,useEffect} from "react";
import HomeIcon from '@mui/icons-material/Home';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EmailIcon from '@mui/icons-material/Email';
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  useTheme,
  useMediaQuery,
  Button,
  Avatar,  
  Menu,
  MenuItem
} from "@material-ui/core";
import { Link } from "react-router-dom";
import DrawerComponent from "./Drawer";
import { Grid } from "@mui/material";
import { userLogout } from "../store/features/authSlice";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(1),
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "15px",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
}));

function Navbar(props) {
  const {loading,userRedux,companyRedux,error} =useSelector((state)=>({...state.auth}))
  const navigate=useNavigate()
  const [isOpen,setIsOpen]=useState(false)
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch=useDispatch()
  let navColor=props.navColor
  const handleLogout=()=>{
    if(userRedux){
      dispatch(userLogout(navigate))
    }
  }

  const handleProfile=()=>{
    navigate('/userprofile')
  }
  
  return ( 
    <AppBar position="sticky" 
    
    style={userRedux?(userRedux.userRoll==="manager")? {backgroundColor:'green'}:{backgroundColor:"#283c86"}:companyRedux? {backgroundColor:"#F77F00"}:{backgroundColor:"#283c86"}}>
      <CssBaseline /> 
      <Toolbar>
        <Typography variant="h5" className={classes.logo} style={{display:"flex"}}>
          <div style={{backgroundColor:'black',color:'white',borderRadius:20,marginRight:50}}>EZ</div>
          Eventza
        </Typography>
        
        {isMobile ? (
          <DrawerComponent />
        ) : (
          <>{userRedux && <Typography variant="h6">{(userRedux.userRoll==="manager")?"Loged in as : Manager":"Loged in as : User"}</Typography>}
          <div className={classes.navlinks}>
            <Link to=
                    {(userRedux && "/")||(companyRedux&&'/vendorhome')||('/')}  className={classes.link}>
              <HomeIcon/>
            </Link>
            {userRedux && <Link to="/about" className={classes.link}>
              <NotificationsActiveIcon/>
            </Link>} 
            {userRedux && <Link to="/messenger" className={classes.link}>
              <EmailIcon/>
            </Link>}
            {(userRedux||companyRedux)?
            
            <Grid container gap={2}>
              <Grid item>
              <Avatar 
            alt={userRedux?.userName || companyRedux?.companyName} 
            src={
              userRedux?.profilepicture?
              "http://localhost:5000/profile-images/"+userRedux.profilepicture
              :companyRedux?.profilepicture?
              "http://localhost:5000/profile-images/"+companyRedux.profilepicture
              :'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
            }
            
            onClick={e=>setIsOpen(true)}
            />
              </Grid>
              <Grid item><Typography variant="h5" sx={{color:'white',p:2,marginLeft:2}}>{userRedux?userRedux.userName:companyRedux.companyName}</Typography></Grid>
              <Grid item>
              {
          userRedux?
          <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={isOpen}
        onClose={e=>setIsOpen(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem><Link to={'/userprofile'} sx={{textDecoration:"none"}}>Profile</Link></MenuItem>
        <MenuItem ><Link to={'/messenger'} sx={{textDecoration:"none"}}>Messages</Link></MenuItem>
        <MenuItem ><Link to={'/userprofile'} sx={{textDecoration:"none"}}>Notification</Link></MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
          :
          ''
        }
              </Grid>
            </Grid>
            
            
            :
            <Link to="/loginas">
            <Button variant="contained">Log In</Button>
          </Link>
            }  

          </div>
          </>
        )}
       
        
      </Toolbar>
      
    </AppBar>
  );
}
export default Navbar;