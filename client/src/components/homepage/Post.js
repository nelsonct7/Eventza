import React,{useState,useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material';
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../store/features/postSlice';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import LiveTvIcon from '@mui/icons-material/LiveTv';
import AddEvents from '../vendors/AddEvents';

function AddPost() {
    const {loading,userRedux,companyRedux,adminRedux,error} =useSelector((state)=>({...state.auth}))
    const [image,setImage]=useState("")
    const [post,setPost]=useState('')
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const handlePostChange=(e)=>{
        setPost(e.target.value)
    }

    const handleSubmit=async()=>{
        if(post===""){
            alert('Add Some Post')
        }else{               
               const formData=new FormData()
               formData.append("postCreator",userRedux?userRedux.userName:companyRedux.companyName)
               formData.append("creatorId",userRedux?userRedux._id:companyRedux._id)
               formData.append("creatorType",userRedux?"user":"company")
               formData.append("post",post)
               formData.append("postImage",image)              
            dispatch(createPost({formData,navigate}))  
            setPost("")   
            setImage("")     
        }
    }
    const handleImage=(e)=>{
        setImage(e.target.files[0])
    }


  return (
    <Card sx={{  }}>
      
      <CardContent>
        
        <Typography gutterBottom variant="h5" component="div">
          Add Post
        </Typography>
        <TextField
          id="outlined-multiline-flexible"
          label="Say Something....!"
          multiline
          maxRows={6}
          sx={{mt:2}}
          fullWidth
          name='post'
          value={post}
          onChange={handlePostChange}
        /> 
        
      </CardContent>
      <CardActions sx={{display:'flex',justifyContent:'end',gap:2}}>
        {companyRedux?<><AddEvents/>
        <Button variant="contained" component="label"><LiveTvIcon/>Go live</Button></>:""}
          <Button variant="contained" component="label">
            <AddPhotoAlternateIcon/>
          Upload Image
          <input
            type="file"
            filename='postImage'
            onChange={handleImage}
            hidden
          /></Button>
        <Button variant="contained" onClick={handleSubmit}>Post</Button>
      </CardActions>
    </Card>
 
    
  )
}

export default AddPost

