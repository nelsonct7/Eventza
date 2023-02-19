import { Box, Stack } from '@mui/material'
import React,{useEffect} from 'react'
import CompanyList from '../../components/admin/CompanyList'
import Dashboard from '../../components/admin/Dashboard'
import ManagerList from '../../components/admin/ManagerList'
import Sidebar from '../../components/admin/Sidebar'
import UserList from '../../components/admin/UserList'
import {useNavigate} from 'react-router-dom' 
import {useSelector,useDispatch} from 'react-redux'
import PostList from '../../components/admin/PostList'


function AdminHome() {
  const isUser=localStorage.getItem('profile')
  const isCompany=localStorage.getItem('company')
  const isAdmin=localStorage.getItem('adminProfile')
  const {showDash,showUser,showManager,showCompany,showPost}=useSelector((state)=>({...state.click}))
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {loading,userRedux,companyRedux,adminRedux,error} =useSelector((state)=>({...state.auth}))
  useEffect(()=>{
    userRedux && navigate('/')
    companyRedux && navigate('/vendorhome')
    !adminRedux && navigate('/loginas')
  },[])
 
  return (
    <Box>
        <Stack direction='row' spacing={2} justifyContent='space-between'>
            <Sidebar/>
            {showDash && <Dashboard/>}
            {showUser && <UserList/>}
            {showManager&&<ManagerList/>}
            {showCompany&&<CompanyList/>}
            {showPost && <PostList/>}
        </Stack>
    </Box>
  )
}

export default AdminHome
