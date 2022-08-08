import React,{useEffect} from 'react'
import AdminLogin from '../../components/admin/AdminLogin'
import Navbar from '../../components/Navbar'
import {Grid} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'

const AdminLogInPage = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {loading,userRedux,companyRedux,adminRedux,error} =useSelector((state)=>({...state.auth}))
  useEffect(()=>{
    userRedux && navigate('/')
    companyRedux && navigate('/vendorhome')
    adminRedux && navigate('/adminhome')
  })
 
  return (
    <div>
      <Navbar></Navbar>
      <Grid container
    sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }} 
    >
        <Grid item>
        <AdminLogin/>
        </Grid>
    </Grid>
    </div>
  )
}

export default AdminLogInPage
