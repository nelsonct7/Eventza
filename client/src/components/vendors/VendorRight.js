import { Box, ImageList, ImageListItem, Typography } from '@mui/material'
import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import * as api from '../../store/api'
import ChatOnline from '../chatonline/ChatOnline';
import Listcomponent from '../homepage/Listcomponent';

const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
      title: 'Bed',
    },
    {
      img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
      title: 'Kitchen',
    },
    {
      img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
      title: 'Sink',
    },
    {
      img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
      title: 'Books',
    },
    {
      img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
      title: 'Chairs',
    },
    {
      img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
      title: 'Candle',
    },
    {
      img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
      title: 'Laptop',
    },
    {
      img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
      title: 'Doors',
    },
    {
      img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
      title: 'Coffee',
    },
    {
      img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
      title: 'Storage',
    },
    {
      img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
      title: 'Coffee table',
    },
    {
      img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
      title: 'Blinds',
    },
  ];


function VendorRight1(){
  return (
    
    <Box flex={1} p={2} m={2} sx={{display:{xs:'none',sm:'block'}}}>
    <Box sx={{position:'fixed',bgcolor:'#f4a261',p:2,m:2,borderRadius:2}}>
    <ImageList sx={{ width: 'auto', height: 'auto' }} variant="woven" cols={3} gap={8}>
  {itemData.map((item) => (
    <ImageListItem key={item.img}>
      <img
        src={`${item.img}?w=161&fit=crop&auto=format`}
        srcSet={`${item.img}?w=161&fit=crop&auto=format&dpr=2 2x`}
        alt={item.title}
        loading="lazy"
      />
    </ImageListItem>
  ))}
</ImageList>
    </Box>
</Box>
)
} 
function VendorRight2(props){
  const {posts}=useSelector((state)=>({...state.post}))
  const [photos,setPhotos]=useState([])
  const getData=async()=>{
    const userId=props.company._id
    const photos=await api.getUserImages(userId)
    setPhotos(photos.data.feeds)
    
  }

  useEffect(()=>{
    getData()
  },[posts])

  return (
    
    <Box flex={1} p={2} m={2} sx={{display:{xs:'none',sm:'block'}}}>
      <Box sx={{position:'fixed',overflowY:'scroll',maxHeight:'90vh',pb:3}}>
    <Box sx={{bgcolor:'#f4a261',p:2,mt:2,borderRadius:2}}>
    <Typography variant='h6'>Images</Typography>
    <ImageList sx={{ width: 'auto', height: 'auto' }} variant="woven" cols={3} gap={8}>
  {photos.map((item,index) => (
      <ImageListItem key={index}>
      <img
        src={`http://localhost:5000/post-images/${item.postImage}?w=161&fit=crop&auto=format`}
        srcSet={`http://localhost:5000/post-images/${item.postImage}?w=161&fit=crop&auto=format&dpr=2 2x`}
        alt={item.title}
        loading="lazy"
      />
    </ImageListItem>
  ))}
</ImageList>

  </Box>
  <Box sx={{bgcolor:'#f4a261',p:2,mt:2,borderRadius:2}}>
  <Box sx={{borderRadius:2,p:1}}>
        <Typography variant='h6'>Events</Typography>
        <Listcomponent />
        </Box>
  </Box>
  <Box sx={{bgcolor:'#f4a261',p:2,mt:2,borderRadius:2}}>
  <Typography variant='h6'>Online Followers</Typography>
  <ChatOnline/>
  </Box>
  </Box>
</Box>
)
} 
function VendorRight() {
  const {loading,userRedux,companyRedux,adminRedux,error} =useSelector((state)=>({...state.auth}))
  return (
    <>
    {companyRedux?<VendorRight2 company={companyRedux}/>:<VendorRight1/>}
    </>
  )
}

export default VendorRight
