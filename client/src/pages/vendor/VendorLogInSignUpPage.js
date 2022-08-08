import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Navbar from '../../components/Navbar'
import {Grid} from '@mui/material'
import VendorLogInSignup from '../../components/vendors/VendorLogInSignup'
import {useSelector,useDispatch} from 'react-redux'

const VendorLogInSignUpPage = () => {
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
        <VendorLogInSignup/>
        
        </Grid>
    </Grid>
    
    </>
  )
}

export default VendorLogInSignUpPage
