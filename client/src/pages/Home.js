import React, { useEffect } from 'react'
import HomeLayout from '../components/homepage/HomeLayout'
import Navbar from '../components/Navbar'
import {useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'

function Home() {
  const navigate=useNavigate()
  const {loading,userRedux,companyRedux,adminRedux,error} =useSelector((state)=>({...state.auth}))
  useEffect(()=>{
  
    companyRedux && navigate('/vendorhome')
    adminRedux && navigate('/adminhome')
  }) 
  return (
    <>
    <Navbar navColor='navy'/>
    <HomeLayout/>
    </> 
  )
}

export default Home
