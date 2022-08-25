import React, {useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Grid,
  Container,
  Box,
  Typography,
  TextField,
  Button
} from '@mui/material'

const LoginCard = (props) => {
const navigate=useNavigate()
const handleNavigate=()=>{
  navigate(props.link)
}
  return (
    <>
    <Grid container>
      <Grid item>
      <Container component="main" maxWidth="xs" >
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius:3,
            boxShadow:6,
            padding:8,
            background: '#1954E8',
	          border: 'solid #6EA5E0 25px', 
	          opacity: '0.6',
          }}
        >
          <Typography component="h1" variant="h5">
            Log in as {props.heading}
          </Typography>
           <Button variant='contained' sx={{ mt: 3, mb: 2 }} onClick={handleNavigate}>Log In</Button> 
          
        </Box>
      </Container>
      </Grid>
    </Grid>
    </>
  )
}

export default LoginCard
