import React, {useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import {Grid,
  Container,
  Box,
  Typography,
  TextField,
  Button
} from '@mui/material'

const LoginCard = (props) => {

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
            border:'solid',
            padding:8
          }}
        >
          <Typography component="h1" variant="h5">
            Log in as {props.heading}
          </Typography>
          <Link to={props.link}> <Button variant='contained' sx={{ mt: 3, mb: 2 }}>Log In</Button> </Link>
          
        </Box>
      </Container>
      </Grid>
    </Grid>
    </>
  )
}

export default LoginCard
