import { Box, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import { TrafficByDevice } from './admindashboard/TrafficByDevice'


const Dashboard = () => {
  return (
    <Box flex={6} p={2} m={2}>
      <Grid container sx={{display:'flex', flexDirection:'column'}}>
        <Grid item><Typography variant='h2'>Dash Board</Typography></Grid>
        <Grid item>
          <TrafficByDevice/>
        </Grid>
      </Grid>
      
    </Box>
  )
}

export default Dashboard