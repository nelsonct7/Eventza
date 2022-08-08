import React,{useState,useEffect} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Grid, Typography } from '@mui/material';
import * as api from '../../store/api'
import {Link} from 'react-router-dom'
import Swal from "sweetalert2"; 
import {useSelector,useDispatch} from 'react-redux'
import { deletePost,changeStatus } from '../../store/features/postSlice';

function PostList() {
  const [postList,setPostList]=useState([])
  const dispatch=useDispatch()
  const {posts}=useSelector((state)=>({...state.post}))
  const getPosts=async()=>{
    const list=await api.getAdminPost()
    console.log(list);
    setPostList(list.data.feeds)
  }
  const changeStat=(postId,stat)=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "Going to Change Status!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then(async (result) => {
      if (result.isConfirmed) {
       dispatch(changeStatus({postId,stat})).then(async(data)=>{
          Swal.fire({  
            title: 'Success',  
            type: 'success',
            text: 'Status Updated ',  
          }); 
        }).catch((err)=>{
          Swal.fire({  
            icon: 'error',  
            title: 'Oops...',  
            text: 'Something went wrong!',   
          }); 
        })
      }
    })

  }


    const deletePosts=(postId)=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async(result) => {
      if (result.isConfirmed) {
        dispatch(deletePost({postId})).then(async(data)=>{
          Swal.fire({  
            title: 'Success',  
            type: 'success',
            text: 'Post Deleted ',  
          }); 
        }).catch((err)=>{
          Swal.fire({  
            icon: 'error',  
            title: 'Oops...',  
            text: 'Something went wrong!',   
          }); 
        })
      }
    })
  };

  useEffect(()=>{
     getPosts() 
  },[posts])

  return (
    <Grid container spacing={2} sx={{p:3}} marginTop={400}>
        <Grid item xs={12}><Typography variant='h4'>Post List</Typography></Grid>
        <Grid item xs={10}>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Creator</TableCell>
            <TableCell align="right">Roll</TableCell>
            <TableCell align="right">Post</TableCell>
            <TableCell align="right">Post Image</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {postList.map((post,index) => (
            <TableRow
              key={post._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {post.postCreator}
              </TableCell>
              <TableCell align="right">{post.creatorType}</TableCell>
              <TableCell align="right">{post.post}</TableCell>
              <TableCell align="right">{post.postImage?<img style={{width:50,height:50}} src={"http://localhost:5000/post-images/"+post.postImage}/>:"No image"}</TableCell>
              <TableCell align="right">{post.postDate}</TableCell>
              <TableCell align="right">{post.blocked?<Box onClick={()=>{changeStat(post._id,post.blocked)}}><Typography style={{color:'red'}}>Blocked</Typography></Box>:<Box onClick={()=>{changeStat(post._id,post.blocked)}}><Typography style={{color:'green'}}>Active</Typography></Box>}</TableCell>
              <TableCell align="right"><Button variant="contained" color="secondary" onClick={()=>deletePosts(post._id)}>Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Grid>
    </Grid>

  ) 
}

export default PostList
