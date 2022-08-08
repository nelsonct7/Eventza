import React ,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {Link,useNavigate} from 'react-router-dom'

import {Grid,
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Alert,
  } from '@mui/material'
import { adminLogin } from '../../store/features/authSlice'
 
  const formValue={
    admin:'',
    adminpassword:""
  }

  

const AdminLogin = () => {

  const [formData,setFormData]=useState(formValue)
  const [adminError,setAdminError]=useState('')
  const [adminPasswordError,setAdminPasswordError]=useState('')
  const [formError,setFormError]=useState("")
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {loading,error} =useSelector((state)=>({...state.auth}))



  const onInputChange=(e)=>{
    const {name,value}=e.target
    setFormData({...formData,[name]:value})
  }

const validAdmin=()=>{
const {admin}=formData
if(admin===""){
setAdminError('This field is required')
return false
}else{
  setAdminError('')
  return true
}
}

const validPassword=()=>{
const {adminpassword}=formData
if(adminpassword===""){
  setAdminPasswordError('This field is required')
  return false
}else if(adminpassword.length<3){
  setAdminPasswordError("Password must be atleast 3 charectors")
  return false
}else{
setAdminPasswordError('')
return true
}
}

const handleSubmit=(e)=>{
  e.preventDefault()
if(!validAdmin() || !validPassword()){
setFormError('Please Fill up the form')
}else{
  setFormError("")
  dispatch(adminLogin({formData,navigate}))
}
}

useEffect(()=>{
  error && setFormError(error)
},[error])

  return (
    <Container sx={{
        marginTop: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom:5,
        border : 2,
        bgcolor:'darkgray',
        paddingBottom:5
      }}>
           <Grid container>
      <Grid item>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h3" color={'primary'}>
            Admin Log in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="admin"
              label="Admin"
              name="admin"
              autoComplete="admin"
              onChange={onInputChange}
              onKeyUp={validAdmin}
              autoFocus
            />
            <br/>
            {adminError?<Alert severity="error">{adminError}</Alert>:''}
            <TextField
              margin="normal"
              required
              fullWidth
              name="adminpassword"
              label="Admin Password"
              type="password"
              id="adminpassword"
              onChange={onInputChange}
              onKeyUp={validPassword}
              autoComplete="current-password"
            />
            <br/>
            {adminPasswordError?<Alert severity="error">{adminPasswordError}</Alert>:''}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 4}}
            >
              Sign In
            </Button>
            {formError?<Alert severity="error">{formError}</Alert>:''}
          </Box>
        </Box>
      </Container>
      </Grid>
    </Grid>
        </Container>
  )
}

export default AdminLogin
