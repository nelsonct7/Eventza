import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import {useSelector,useDispatch} from 'react-redux'
import Feed from '../../../components/homepage/Feed'
import RightSideBarProfile from '../../../components/homepage/RightSideBarProfile'
import Navbar from '../../../components/Navbar';
import { getUserById } from '../../../store/api';
import { Typography } from '@material-ui/core';

function ViewProfile() {
  const [userId,setUserId]=useState("")
  const [userProfile,serUserProfile]=useState(null)
  const { id } = useParams();
  const {loading,userRedux,companyRedux,adminRedux,error} =useSelector((state)=>({...state.auth}))
  useEffect(()=>{
    setUserId(id)
    const getUser=async()=>{
      await getUserById(id).then((data)=>{
        serUserProfile(data.data)
      }).catch((err)=>{
        console.log(err);
      })
    }
    getUser()
  },[id])
  return (
    <>
    <Navbar/>
  <Grid container spacing={3}>
  <Grid item xs={12} sx={{height:'400px',display:'flex',justifyContent:'center',flexDirection:'row'}}>
    <div style={{position:'absolute',margin:0,width:'100%'}}>
    <img
    width={'100%'}
    height={'300px'}
    src={userProfile?.coverpicture!==""?"http://localhost:5000/cover-images/"+userProfile?.coverpicture:'https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg'}></img>
    </div>
    <div style={{position:'relative',marginTop:50,alignContent:'center', textAlign:'center'}}>
    <img
    style={{borderRadius:'50%'}}
    width={'200px'}
    height={'200px'} 
    src={userProfile?.profilepicture!==""?"http://localhost:5000/profile-images/"+userProfile?.profilepicture:'https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg'}/>
    <Typography variant='h4' >{userProfile?.userName}</Typography>
    <Typography variant='h6' >{userProfile?.desc?userProfile.desc:"Undefined"}</Typography>
    </div>

    
  </Grid>
  <Grid item xs={8}>
    
    <Feed profileview={true} userId={userId}/>
  </Grid>
  <Grid item xs={3}>
    <RightSideBarProfile profileview={true} userId={userId}/>
  </Grid>
</Grid>
</>
  )
}

export default ViewProfile
