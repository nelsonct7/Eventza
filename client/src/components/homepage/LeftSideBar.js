import { Box, Typography } from '@mui/material'
import React,{useEffect,useState} from 'react'
import { getAllUserList, getAllVendors } from '../../store/api'
import Listcomponent from './Listcomponent'
import {useSelector,useDispatch} from 'react-redux'

const LeftSideBar = () => {
  const {loading,userRedux,companyRedux,adminRedux,error} =useSelector((state)=>({...state.auth}))
  const [manager,setManager]=useState([])
  const [companies,setCompanies]=useState([])

  useEffect(()=>{
    const getter=async ()=>{
      await getAllUserList().then((resp)=>{

        setManager((resp.data).filter((item)=>{return item.userRoll==="manager"}))
      }).catch((err)=>{
        console.log(err);
      })
      await getAllVendors().then((resp)=>{
        setCompanies(resp.data)
      }).catch((err)=>{
        console.log(err);
      })
    };
    getter()
    
  },[userRedux])

  return (
      <Box flex={1}  p={2} 
      sx={{display:{xs:'none',sm:'none',md:'none',lg:'block'}}}>
        <Box sx={{position:'fixed',overflowY:'scroll',maxHeight:'80vh' }}>
        <Box boxShadow={5} sx={{borderRadius:2,p:1,m:2}}>
        <Typography variant='h6'>Events</Typography>
        <Listcomponent list={companies}/>
        </Box>
        <Box boxShadow={5} sx={{borderRadius:2,p:1,m:2}}>
        <Typography variant='h6'>Managers</Typography>
        <Listcomponent list={manager}/>
        </Box>
        {/* <Box bgcolor={'#0077b6'} sx={{borderRadius:2,p:1,m:2}}>
        <Typography variant='h6'>Companies</Typography>
        <Listcomponent />
        </Box> */}
        </Box>
      </Box>
      
      
      )
}

export default LeftSideBar
