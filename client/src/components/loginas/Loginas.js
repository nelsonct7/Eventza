import React,{useEffect} from 'react'
import LoginCard from './card/LoginCard';
import {Grid} from '@mui/material'

import useStyles from './style';

function Loginas() {
  const classes = useStyles();
  useEffect(()=>{
  })
  
  return (

    <Grid container spacing={2} className={classes.maindiv}>
  <Grid item xs={6} md={3}>
    <LoginCard heading={'Admin'} link={'/adminlogin'}/>
  </Grid>
  <Grid item xs={6} md={3}>
    <LoginCard heading={'User'} link={'/userlogin'}/>
  </Grid>
  <Grid item xs={6} md={3}>
    <LoginCard heading={'Vendor'} link={'/vendorlogin'}/>
  </Grid>
</Grid>

  )
}

export default Loginas
