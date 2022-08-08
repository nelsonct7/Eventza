import { Box, Stack } from '@mui/material'
import React from 'react'
import VendorFeed from './VendorFeed'
import VendorLeft from './VendorLeft'
import VendorRight from './VendorRight'

function VendorHomeLayout() {
  return (
    <div>
      <Box>
        <Stack direction='row' spacing={2} justifyContent='space-between'>
            <VendorLeft/>
            <VendorFeed/>
            <VendorRight/>
        </Stack>
    </Box>
    </div>
  )
}

export default VendorHomeLayout
