import { Box, Typography,Avatar,AvatarGroup,ImageList,ImageListItem, } from '@mui/material'
import React,{useState,useEffect} from 'react'
import Chatox from '../chatbox/Chatox'
import ImageListComponent from './ImageListComponent'
import {useSelector,useDispatch} from 'react-redux'
import { getUserById } from '../../store/api'
import { display } from '@mui/system'


const RightSideBar = () => {
  const {loading,userRedux,companyRedux,error} =useSelector((state)=>({...state.auth}))
  const [follower,setFollower]=useState([])
  const [following,setFollowing]=useState([])

  useEffect(()=>{
    setFollower([])
    userRedux?.followers.map(async(userId)=>{
      const resp=await getUserById(userId)
      setFollower(current=>[...current,resp.data])
    })
    
  },[userRedux])

  useEffect(()=>{
    setFollowing([])
    userRedux?.followings.map(async(userId)=>{
      const resp=await getUserById(userId)
      setFollowing(current=>[...current,resp.data])
    })
    
  },[userRedux])

  return (
      <Box flex={1} p={3} 
      sx={{display:{xs:'none',sm:'block'}}}>
        <Box sx={{position:'fixed',overflowY:'scroll',maxHeight:'80vh'}} p={3}>
        <Box>
        <Typography variant={'h6'}>Followers</Typography>
        <AvatarGroup max={3} sx={{alignItems:'center',m:4}}>
          {follower.map((fellow,index)=>{
            return(
            <Avatar key={index} alt={fellow.userName} src={fellow?.profilepicture!==""?"http://localhost:5000/profile-images/"+fellow.profilepicture
            :"https://www.whatsappimages.in/wp-content/uploads/2021/12/girl-New-Superb-Whatsapp-Dp-Profile-Images-photo.jpg"} />
            )})
          }
        </AvatarGroup>
        </Box>
        <Box sx={{marginTop:5}}>
        <Typography variant={'h6'}>Following</Typography>
        <AvatarGroup max={7}>
        {following.map((fellow,index)=>{
            return(
            <Avatar key={index} alt={fellow.userName} src={fellow?.profilepicture!==""?"http://localhost:5000/profile-images/"+fellow.profilepicture
            :"https://www.whatsappimages.in/wp-content/uploads/2021/12/girl-New-Superb-Whatsapp-Dp-Profile-Images-photo.jpg"} />
            )})
          }
        
        </AvatarGroup>
        </Box>
        <Box sx={{marginTop:5}}>
        <Typography variant={'h6'} m={2}>Images</Typography>
          <ImageListComponent/>
        </Box>
        <Chatox/>
        </Box>
        
      
      </Box>
  )
}

export default RightSideBar
