import { Grid, Stack } from '@mui/material'
import { Box } from '@mui/system'
import React,{useContext,useState,createContext} from 'react'
import Navbar from '../../../components/Navbar'
import VendorLeft from '../../../components/vendors/VendorLeft'
import VendorFeed from '../../../components/vendors/VendorFeed'
import VendorRight from '../../../components/vendors/VendorRight'


function VendorProfile() {

  return (
    <>
    <Navbar/>
    <Box>
        <Stack direction='row' spacing={2} justifyContent='space-between'>
            <VendorLeft/>
            <VendorFeed profile={true}/>
            <VendorRight profile={true}/> 
        </Stack>
    </Box>
    </>
  )
}

export default VendorProfile
