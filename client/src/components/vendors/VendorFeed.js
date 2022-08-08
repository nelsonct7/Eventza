import { Avatar, Box, Grid, Paper, Typography } from '@mui/material'
import React,{useEffect,useState} from 'react'
import AddPost from '../homepage/Post'
import VendorCard from './VendorCard'
import {useSelector,useDispatch} from 'react-redux'
import * as api from '../../store/api'


function VendorFeed({profile}) {
  const {loading,userRedux,companyRedux,adminRedux,error} =useSelector((state)=>({...state.auth}))
  const {showDash,showUser,showManager,showCompany,showPost}=useSelector((state)=>({...state.click}))
  const {posts}=useSelector((state)=>({...state.post}))

  const [feeds,setFeeds]=useState([])
  const getData=async()=>{
    if(showPost){
      const data=await api.getPostbyId(companyRedux._id)
    setFeeds(data.data.feeds)
    }else{
      const data=await api.getPost()
    setFeeds(data.data.feeds)
    } 
  }
  useEffect(()=>{
    getData()
  },[posts,showPost])
  return (
    <Box flex={4} p={2}>
        {profile && 
        <Grid container sx={{width:'100%',alignItems:'center'}}>
          <Grid item sx={{width:'100%'}}>
          <img className='profileCoverImage' src=
            {
              
              companyRedux?.coverpicture?
              "http://localhost:5000/cover-images/"+companyRedux?.coverpicture
              : 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_509107562_2000133320009280346_351827.jpg'

            } sx={{width:'100%'}}>
              </img> 
              
          </Grid>
          <Grid item sx={{position:'absolute',marginLeft:'50px',display:"flex", flexDirection:'row'}}>
          <Avatar
            alt={companyRedux?.companyName}
            src={companyRedux?.profilepicture?"http://localhost:5000/profile-images/"+companyRedux?.profilepicture
            :"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
            sx={{ width: '100px', height: '100px', }}
          />
          <Box sx={{margin:2}}>
            <Typography variant='h4'>{companyRedux?.companyName}</Typography>
            <Typography variant='h6'>Description</Typography>
          </Box>
          </Grid>
        </Grid>  }
        {companyRedux && <AddPost/>}
        {feeds.map((fee,index)=> <VendorCard key={index} data={fee}/>)}
    </Box>
  )
}

export default VendorFeed
