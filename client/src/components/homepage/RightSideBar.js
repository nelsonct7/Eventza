import { Box, Typography,Avatar,AvatarGroup,ImageList,ImageListItem, } from '@mui/material'
import React,{useState,useEffect} from 'react'
import Chatox from '../chatbox/Chatox'
import ImageListComponent from './ImageListComponent'
import {useSelector,useDispatch} from 'react-redux'
import { getUserById } from '../../store/api'
import { display } from '@mui/system'
import RightSideAvatar from './RightSideAvatar'


const RightSideBar = () => {
  const {loading,userRedux,companyRedux,error} =useSelector((state)=>({...state.auth}))
  const [follower,setFollower]=useState([])
  const [following,setFollowing]=useState([])

  useEffect(()=>{
    setFollower([])
    userRedux?.followers.map(async(userId)=>{
      const resp=await getUserById(userId).then((data)=>{
        setFollower(current=>[...current,data.data])
      }).catch((err)=>{
        console.log(err);
      })
      
    })},[userRedux])

  useEffect(()=>{
    setFollowing([])
    userRedux?.followings.map(async(userId)=>{
      const resp=await getUserById(userId)
      setFollowing(current=>[...current,resp.data])
    })
    
  },[userRedux])

  return (
      <Box flex={1} pe={2}
      sx={{display:{xs:'none',sm:'block'}}}>
        <Box sx={{position:'fixed',overflowY:'scroll',maxHeight:'80vh'}} p={3}>
        <Box sx={{boxShadow:4,borderRadius:2,m:2}}>
        <Typography variant={'h6'}>Followers</Typography>
        <RightSideAvatar follower={follower}/>
        </Box>
        <Box sx={{boxShadow:4,borderRadius:2,m:2}}>
        <Typography variant={'h6'}>Following</Typography>
        <RightSideAvatar follower={following}/> 
        </Box>
        <Box sx={{boxShadow:4,borderRadius:2,m:2}}>
        <Typography variant={'h6'} m={2}>Images</Typography>
          <ImageListComponent/>
        </Box>
        </Box>
        
      
      </Box>
  )
}

export default RightSideBar
