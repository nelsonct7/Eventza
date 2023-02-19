import { Box, Stack } from '@mui/material'
import React,{useState,useEffect} from 'react'
import VendorFeed from './VendorFeed'
import VendorLeft from './VendorLeft'
import VendorRight from './VendorRight'

function VendorHomeLayout() {
  const [visibility,setVisibility]=useState("feeds")
  return (
    <div>
      <Box>
        <Stack direction='row' spacing={2} justifyContent='space-between'>
            <VendorLeft/>
            {visibility==="feeds" && <VendorFeed/>}
            <VendorRight/>
        </Stack>
    </Box>
    </div>
  )
}

export default VendorHomeLayout
