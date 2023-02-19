import React, {useEffect,useState} from 'react'
import {Grid,
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  FormHelperText,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material'

import {useSelector,useDispatch} from 'react-redux'
import {Link,useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import { login,signup } from '../../store/features/authSlice'
const formValue={
  userEmail:"",
  userPassword:"",
  userName:"",
  conPassword:"",
  userRoll:""
}

function LoginSignup() {
  const {loading,userRedux,companyRedux,adminRedux,error} =useSelector((state)=>({...state.auth}))
  const [isSignup,setIsSignup]=useState(false)
  const [formData,setFormData]=useState(formValue)
  const [emailError,setemailError]=useState('')
  const [passwordError,setpasswordError]=useState('')
  const [nameError,setNameError] = useState('')
  const [conPsdError,setConPsdError]=useState('')
  const [userRollError,setUserRollError]=useState()
  const [isError,setisError]=useState('')
  const [user,setUser]=useState(null)
  const [profilePic,setProfilePic]=useState("")
  const [profilePicError,setProfilePicError]=useState("")
  const [coverPic,setCoverPic]=useState("")
  const [coverPicError,setCoverPicError]=useState("")
  
  const dispatch=useDispatch()
  const navigate=useNavigate()
  


  useEffect(()=>{
    userRedux && navigate('/')
    adminRedux && navigate('/adminhome')
    companyRedux && navigate('/vendorhome')
    
  },[userRedux,adminRedux,companyRedux])
  useEffect(()=>{
    error && setisError(error)
  },[error])


  const validImage=()=>{

  }

  const validEmail=()=>{ 
    const {userEmail}=formData
    if(userEmail==='' || /^\s*$/.test(userEmail)){
      setemailError('Email required')
      return false
    }else if(!userEmail.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)){
      setemailError('Email Invalid')
      return false
    }else{
      setemailError('')
      return true
    }
  }
  const validPassword=()=>{
    const {userPassword}=formData
    if(userPassword===''){
      setpasswordError('Password required')
      return false
    }else if(userPassword.length<3){
      setpasswordError('Password atleast 3')
      return false
    }else{
      setpasswordError('')
      return true
    }
  }
  const validUserName=()=>{
    const {userName}=formData
    if(userName===''){
      setNameError('User Name required')
      return false
    }else if(!userName.match(/^[A-Za-z]*$/)){
      setNameError('Numbers Not Allowded')
      return false
    }else{
      setNameError('')
      return true
    }
  }

  const validConPassword=()=>{
    const {userPassword,conPassword} = formData
    if(conPassword===''){
      setConPsdError('Field is required')
      return false
    }else if(conPassword!=userPassword){
      setConPsdError('Password Miss match')
      return false
    }else{
      setConPsdError('')
      return true
    }
  }

  const validRoll=()=>{
    const {userRoll}=formData
    if(userRoll===""){
      setUserRollError('This field is required')
      return false
    }else{
      setUserRollError('')
      return true 
    }
  }

  const validProfilePic=()=>{
    if(profilePic===""){
      setProfilePicError("Profile Pic required")
      return false
    }else{
      setProfilePicError("")
      return true
    }
  }

  const validCoverPic=()=>{
    if(coverPic===""){
      setCoverPicError("Cover pic Required")
      return false
    }else{
      setCoverPicError("")
      return true
    }
  }

  const changeStatus=()=>{
    setIsSignup(!isSignup)
    setConPsdError('')
    setNameError('')
    setisError('')
    setemailError('')
    setpasswordError('')
  }
  const handleLoginSubmit=(e)=>{
    e.preventDefault()
    if(!validEmail() && !validPassword()){
      setisError('Please fill up the form')
    }else{
      dispatch(login({formData,navigate,toast}))
    }

  }
  const onInputChange=(e)=>{
    const {name,value}=e.target
    setFormData({...formData,[name]:value})
  }

  const handleChange = (event) => {
    setFormData({...formData,userRoll:event.target.value})
  };

  const handleProfilePic=(e)=>{
      setProfilePic(e.target.files[0])
  }
  const handleCoverPic=(e)=>{
    setCoverPic(e.target.files[0])
  }

  const handleSignupSubmit=(e)=>{
    e.preventDefault()
    if(!validUserName() || !validEmail() || !validPassword() ||  !validConPassword() || !validRoll() || !validProfilePic() || !validCoverPic()){
      setisError('Please fill up the form')
    }else{
      setisError('')
        const formData1=new FormData()
        formData1.append("profilepicture",profilePic) 
        formData1.append("coverpicture",coverPic)
      
      dispatch(signup({formData,navigate,formData1}))
      

    }
  }

  return (
    <Container sx={{
      marginTop: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom:5,
      paddingBottom:3,
	    border: 'solid #283c86 25px', 
	    opacity: '0.8',
      borderRadius:3
    }}>
    {isSignup?<Grid container sx={{marginBottom:5}}>
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
          <Typography component="h1" variant="h5" color={'primary'}>
            User Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSignupSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="userName"
                  required
                  fullWidth
                  id="usertName"
                  label="User Name"
                  autoFocus
                  onChange={onInputChange}
                  onKeyUp={validUserName}
                />
                {nameError?<Alert severity="error">{nameError}</Alert>:''}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="userEmail"
                  label="Email Address"
                  name="userEmail"
                  autoComplete="email"
                  onChange={onInputChange}
                  onKeyUp={validEmail}
                /><br/>
                {emailError?<Alert severity="error">{emailError}</Alert>:''}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="userPassword"
                  label="Password"
                  type="password"
                  id="userPassword"
                  autoComplete="new-password"
                  onChange={onInputChange}
                  onKeyUp={validPassword}
                /><br/>
                {passwordError?<Alert severity="error" >{passwordError}</Alert>:''}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="conPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  onChange={onInputChange}
                  onKeyUp={validConPassword}
                /><br/>
                {conPsdError?<Alert severity="error" >{conPsdError}</Alert>:''}
              </Grid>
              <Grid item xs={12}>
              <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">User Roll</InputLabel>
              <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Roll"
              onChange={handleChange}
              name='userRoll'
              onSelect={validRoll}
               >
              <MenuItem value={""}><em>None</em></MenuItem>
              <MenuItem value={'user'}>User</MenuItem>
              <MenuItem value={'manager'}>Manager</MenuItem>
              </Select>
              <FormHelperText>You are signin up as</FormHelperText>
              </FormControl><br/>
              {userRollError?<Alert severity="error" >{userRollError}</Alert>:''}
              </Grid>
              <Grid item xs={12}>
              <Button variant="outlined" component="label" fullWidth>
              Upload Profile Picture
              <input
              type="file"
              filename='profilepicture'
              onChange={handleProfilePic}
              hidden
              /></Button>
              {profilePicError?<Alert severity="error">{profilePicError}</Alert>:''}
              </Grid>
              <Grid item xs={12}>
              <Button variant="outlined" component="label" fullWidth>
              Upload Cover Image
              <input
              type="file"
              filename='coverpicture'
              onChange={handleCoverPic}
              hidden
              /></Button>
              {coverPicError?<Alert severity="error">{coverPicError}</Alert>:''}
              </Grid>
              
            </Grid>
            <Grid item xs={12}> 
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            {isError?<Alert severity="error">{isError}</Alert>:''}
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography onClick={changeStatus} variant="body2">
                  Already have an account? Log in
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
      </Grid>
    </Grid>
    :
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
          <Typography component="h1" variant="h5" color={'primary'}>
            User Log in
          </Typography>
          <Box component="form" onSubmit={handleLoginSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="userEmail"
              autoComplete="email"
              type='email'
              validation='Please provide valid email'
              autoFocus
              onChange={onInputChange}
              onKeyUp={validEmail} 
            />
            {emailError?<Alert severity="error">{emailError}</Alert>:''}
            <TextField
              margin="normal"
              required
              fullWidth
              name="userPassword"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              validation="Pleasse provide your password"
              onChange={onInputChange}
              onKeyUp={validPassword}
            />
            {passwordError?<Alert severity="error" >{passwordError}</Alert>:''}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 4}}
            >
              {loading && (<CircularProgress />)}
              Log In
            </Button>
            {isError?<Alert severity="error">{isError}</Alert>:''}
            <Grid container >
              <Grid item>
              <Typography onClick={changeStatus} variant="body2">
                  Don't have an account? Sign Up
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      </Grid>
    </Grid>
    }
    </Container>
  )
}

export default LoginSignup
