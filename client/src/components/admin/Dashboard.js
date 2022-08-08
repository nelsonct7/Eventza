import { Box, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import { TrafficByDevice } from './admindashboard/TrafficByDevice'


const Dashboard = () => {
  return (
    <Box flex={6} p={2}>
      <Grid container>
        <Grid item><Typography variant='h2'>Dash Board</Typography></Grid>
      </Grid>
      
    </Box>
  )
}

export default Dashboard