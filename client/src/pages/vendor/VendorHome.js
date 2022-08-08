import React,{useEffect} from 'react'
import Navbar from '../../components/Navbar'
import VendorHomeLayout from '../../components/vendors/VendorHomeLayout'
import {useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'

function VendorHome() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {loading,userRedux,companyRedux,adminRedux,error} =useSelector((state)=>({...state.auth}))
  useEffect(()=>{
    userRedux && navigate('/')
    adminRedux && navigate('/adminhome')
    !companyRedux && navigate('/loginas')
  })
  return (
    <div>
      <Navbar navColor='#F77F00'/>
      <VendorHomeLayout/>
    </div>
  )
}

export default VendorHome
