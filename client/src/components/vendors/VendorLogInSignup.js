
import React, {useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {Link,useNavigate} from 'react-router-dom'
import { vendorLogin,vendorSignup } from '../../store/features/authSlice'
import {Grid,
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material'
 
const formValue={
  companyEmail:"",
  companyPassword:"",
  companyName:"",
  conPassword:""
}

const VendorLogInSignup = () => {

  const [isSignup,setIsSignup]=useState(false)
  const [formData,setFormData]=useState(formValue)
  const [emailError,setemailError]=useState('')
  const [passwordError,setpasswordError]=useState('')
  const [nameError,setNameError] = useState('')
  const [conPsdError,setConPsdError]=useState('')
  const [isError,setisError]=useState('')
  const [user,setUser]=useState(null)
  const [profilePic,setProfilePic]=useState("")
  const [profilePicError,setProfilePicError]=useState("")
  const [coverPic,setCoverPic]=useState("")
  const [coverPicError,setCoverPicError]=useState("") 
  
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {loading,error} = useSelector((state)=>({...state.auth}))
    const validEmail=()=>{ 
      const {companyEmail}=formData
      if(companyEmail==='' || /^\s*$/.test(companyEmail)){
        setemailError('Email required')
        return false
      }else if(!companyEmail.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)){
        setemailError('Email Invalid')
        return false
      }else{
        setemailError('')
        return true
      }
    }
    const validPassword=()=>{
      const {companyPassword}=formData
      if(companyPassword===''){
        setpasswordError('Password required')
        return false
      }else if(companyPassword.length<3){
        setpasswordError('Password atleast 3')
        return false
      }else{
        setpasswordError('')
        return true
      }
    }
    const validCompanyName=()=>{
      const {companyName}=formData
      if(companyName===''){
        setNameError('User Name required')
        return false
      }else if(!companyName.match(/^[A-Za-z]*$/)){
        setNameError('Numbers Not Allowded')
        return false
      }else{
        setNameError('')
        return true
      }
    }
  
    const validConPassword=()=>{
      const {companyPassword,conPassword} = formData
      if(conPassword===''){
        setConPsdError('Field is required')
        return false
      }else if(conPassword!=companyPassword){
        setConPsdError('Password Miss match')
        return false
      }else{
        setConPsdError('')
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

    const handleProfilePic=(e)=>{
      setProfilePic(e.target.files[0])
  }
  const handleCoverPic=(e)=>{
    setCoverPic(e.target.files[0])
  }

    const handleLoginSubmit=(e)=>{
      e.preventDefault()
      if(!validEmail() && !validPassword()){
        setisError('Please fill up the form')
      }else{
        setisError('')
        dispatch(vendorLogin({formData,navigate}))
      }
  
    }
    const onInputChange=(e)=>{
      const {name,value}=e.target
      setFormData({...formData,[name]:value})
    }
  
    const handleSignupSubmit=(e)=>{
      e.preventDefault()
      if(!validCompanyName() || !validEmail() || !validPassword() ||  !validConPassword() || !validProfilePic() || !validCoverPic() ){
        setisError('Please fill up the form')
      }else{
        setisError('')
        const formData1=new FormData()
        formData1.append("profilepicture",profilePic) 
        formData1.append("coverpicture",coverPic)

        dispatch(vendorSignup({formData,navigate,formData1}))
      }
    }
    useEffect(()=>{
      error && setisError(error)
    },[error])


    return (
      <Container sx={{
        marginTop: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom:5,
        border : 2,
        paddingBottom:3
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
              Vendor Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSignupSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="companyName"
                    required
                    fullWidth
                    id="companyName"
                    label="Company Name"
                    autoFocus
                    onChange={onInputChange}
                    onKeyUp={validCompanyName}
                  />
                  {nameError?<Alert severity="error">{nameError}</Alert>:''}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="companyEmail"
                    label="Email Address"
                    name="companyEmail"
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
                    name="companyPassword"
                    label="Password"
                    type="password"
                    id="CompanyPassword"
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
              </Grid>
              
              <Grid container justifyContent="flex-end">
                <Grid item sx={{ mt: 3, mb: 2 ,cursor:'pointer'}}>
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
              Vendor Log in
            </Typography>
            <Box component="form" onSubmit={handleLoginSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="companyEmail"
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
                name="companyPassword"
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
                Log In
              </Button>
              {isError?<Alert severity="error">{isError}</Alert>:''}
              <Grid container >
                <Grid item sx={{ mt: 3, mb: 2 ,cursor:'pointer'}}>
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

export default VendorLogInSignup
