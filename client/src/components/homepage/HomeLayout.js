import { Box, Stack } from '@mui/material'
import React from 'react'
import Feed from './Feed'
import LeftSideBar from './LeftSideBar'
import RightSideBar from './RightSideBar'
import {useSelector,useDispatch} from 'react-redux'

const HomeLayout = () => {
  const {loading,userRedux,companyRedux,error} =useSelector((state)=>({...state.auth}))
  return (
    <Box>
        <Stack direction='row' spacing={1} justifyContent='space-between'>
            <LeftSideBar/>
            <Feed/>
            {userRedux&&<RightSideBar/>}
        </Stack>
    </Box>
  )
}

export default HomeLayout
