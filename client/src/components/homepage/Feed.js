import { Box } from '@mui/material'
import React,{useState,useEffect} from 'react'
import Post from './Card'
import AddPost from './Post'
import {useSelector,useDispatch} from 'react-redux'
import * as api from '../../store/api'

const Feed = ({profileview,userId}) => {
  const {loading,userRedux,companyRedux,adminRedux,error} =useSelector((state)=>({...state.auth}))
  const {posts}=useSelector((state)=>({...state.post}))
  const dispatch=useDispatch()
  const [feeds,setFeeds]=useState([])
  const getData=async()=>{
    const data=await api.getPost()
    setFeeds(data.data.feeds)
  }
  const getDataById=async (userId)=>{
    const data=await api.getPostbyId(userId).then((data)=>{
      setFeeds(data.data.feeds)
    }).catch((err)=>{
      console.log(err);
    })
  }
  useEffect(()=>{
    if(profileview&&userId){
      getDataById(userId)
    }else{
      getData()
    }
    
  },[posts,userId])
  return (
      <Box flex={3} p={2} marginLeft={'20px'}>
        {userRedux && !profileview && <AddPost/>}
        {feeds.map((fee,index)=> <Post key={index} data={fee}/>)}
        
      </Box>   
  )
}

export default Feed
