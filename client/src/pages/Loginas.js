import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {Link,useNavigate} from 'react-router-dom'
import Loginas from '../components/loginas/Loginas'
import Navbar from '../components/Navbar'

function LoginAsMain() {
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
    <Navbar navColor='navy'></Navbar>
    <Loginas></Loginas>
    </>
  )
}

export default LoginAsMain
