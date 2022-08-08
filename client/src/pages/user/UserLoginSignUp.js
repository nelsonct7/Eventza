import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Navbar from '../../components/Navbar'
import LoginSignup from '../../components/user/LoginSignup'
import {Grid} from '@mui/material'
import {useSelector,useDispatch} from 'react-redux'
const UserLoginSignUp = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {loading,userRedux,companyRedux,adminRedux,error} =useSelector((state)=>({...state.auth}))
  useEffect(()=>{
    userRedux && navigate('/')
    companyRedux && navigate('/vendorhome')
    adminRedux && navigate('/adminhome')
  })


  return (
    <>
    <Navbar/>
    <Grid container
    sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
        <Grid item>
        <LoginSignup></LoginSignup>
        </Grid>
    </Grid>
    
    </>
  )
}

export default UserLoginSignUp
