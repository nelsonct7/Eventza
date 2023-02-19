import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography , Modal, TextField} from '@mui/material'
import React,{useEffect, useState} from 'react';


import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { deletePost, updatePost } from '../../store/features/postSlice';
import {format} from 'timeago.js'
import * as api from '../../store/api'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [editPost,setEditPost]=useState(props.editdata.post) 
  const [image,setImage]=useState("")
  const navigate=useNavigate()
  const dispatch=useDispatch()
  

  const handleImage=(e)=>{
    setImage(e.target.files[0])
  }

const handleSubmit=async()=>{
  if(editPost===""){
      alert('Add Some Post')
  }else{     
        const postId=props.editdata._id          
         const formData=new FormData()
         formData.append("creatorId",props.editdata._id)
         formData.append("post",editPost)
          formData.append("postImage",image)
         console.log(editPost);
         console.log(image);
         handleClose()
        dispatch(updatePost({formData,postId}))          
  }
}

const handleDelete=()=>{
  const postId=props.editdata._id
  handleClose()
  dispatch(deletePost({postId}))
  
}

  return (
    <div>
      <Button onClick={handleOpen} variant={'contained'}>Edit Post</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.editdata.postCreator}
          </Typography>
          <TextField 
          id="outlined-basic" 
          label="Edit Post" 
          variant="outlined" 
          value={editPost} 
          sx={{m:2}}
          onChange={(e)=>{setEditPost(e.target.value)}}
          fullWidth
          />
          <Box sx={{display:'flex'}} gap={2}>
          {(props.editdata.postImage)? 
          <><img alt="Remy Sharp" src={"http://localhost:5000/post-images/"+props.editdata.postImage} 
          style={{height:100,width:100}}/>
          <Button variant="contained" component="label" sx={{maxHeight:40}}>
          Upload Image
          <input
            type="file"
            filename='postImage'
            onChange={handleImage}
            hidden
          /></Button>
          </>
          :
          ""}
          </Box>
          <Box sx={{display:'flex',margin:2}} gap={2}>
          <Button variant="contained" component="label" sx={{maxHeight:40}} onClick={handleSubmit}>Update</Button>
          <Button variant="contained" component="label" sx={{maxHeight:40}} onClick={handleDelete}>Delete</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

function VendorCard(props) {
  const navigate=useNavigate()
  const {loading,userRedux,companyRedux,adminRedux,error} =useSelector((state)=>({...state.auth}))
  const [user,setUser]=useState(null)
  const getUser=async()=>{
    const userId=props.data.creatorId
    const data=await api.getUserById(userId)
    setUser(data.data)
  
  };
  const getVendorBy=async()=>{
    const vendorId=props.data.creatorId
    const data=await api.getVendorById(vendorId)
    setUser(data.data)
  
  }
  useEffect(()=>{
    const type=props.data.creatorType
    console.log(type);
    (type==="company")?getVendorBy():getUser()
  },[companyRedux])
  
  return (
    <Box sx={{p:2,boxShadow:10,m:4,borderRadius:4,bgcolor:'#f4a261'}}>
      <Card sx={{p:2,boxShadow:10}}>
      {
        props.data.postImage?
        <CardMedia
        component="img"
        height='300'
        image={"http://localhost:5000/post-images/"+props.data.postImage}
        alt="green iguana"
      />
      :
      ""
      }
      
      <CardContent>
      <Avatar sx={{ bgcolor: red[500],cursor:'pointer' }} aria-label="recipe" src={user?"http://localhost:5000/profile-images/"+user.profilepicture:""} onClick={()=>{navigate("/viewuserprofile/"+user?._id)}}>
            R
          </Avatar>
        <Typography gutterBottom variant="h5" component="div">
          {props.data.postCreator}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {format(props.data.postDate)}
        </Typography>
        <Typography variant="h6" color="text.secondary">
        {props.data.post}
        </Typography>
      </CardContent>
      <CardActions>
      {(companyRedux && (companyRedux._id===props.data.creatorId))?(<BasicModal editdata={props.data}/>):""}
      </CardActions>
    </Card>
    </Box>
  )
}

export default VendorCard
