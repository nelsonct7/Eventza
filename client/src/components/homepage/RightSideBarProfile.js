import { Box, Typography,Avatar,AvatarGroup,ImageList,ImageListItem, Button, Modal, TextField, MenuItem, Grid, } from '@mui/material'
import React,{useState,useEffect} from 'react'
import Chatox from '../chatbox/Chatox'
import ImageListComponent from './ImageListComponent'
import './RightSidebarProfile.css'
import {useSelector,useDispatch} from 'react-redux'
import { getUserById, updateUser,updateUserProfilePic,updateUserCoverPic } from '../../store/api'
import {Link,useNavigate} from 'react-router-dom'
import { Select } from '@material-ui/core'
import { userTockenValidator } from '../../store/features/authSlice'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function BasicModal({user}) {
  const [open, setOpen] =useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [userName,setUserName]=useState("")
  const [desc,setDescription]=useState("")
  const [city,setCity]=useState("")
  const [from,setFrom]=useState("")
  const [relationship,setRelation]=useState("")

  const navigate=useNavigate()
  const dispatch=useDispatch()
useEffect(()=>{ 
  setUserName(user?.userName)
  setDescription(user?.desc)
  setCity(user?.city)
  setFrom(user?.from)
  setRelation(user?.relationship)
},[user])


const handleSubmit=async()=>{
  if(userName==="" || desc==="" || city==="" || from==="" || relationship===""){
      alert('Fill up all the fields')
  }else{      
                 
        //  const formData=new FormData()
        //  formData.append("creatorId","props.editdata._id")
        //  formData.append("post","editPost")
        const formData={
          userName,
          desc,
          city,
          from,
          relationship
        }
        const userId=user?._id
        await updateUser(userId,formData)
        const userTocken=JSON.parse(localStorage.getItem('userTocken'))
        dispatch(userTockenValidator({userTocken}))
         handleClose()
         alert('Updated Successfully')       
  }
}

const handleDelete=()=>{
  handleClose() 
}

  return (
    <div>
      <Button onClick={handleOpen} variant={'contained'} sx={{m:2}} size="small">Edit User</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{display:'flex'}}>
          <TextField 
          id="outlined-basic" 
          label="User Name" 
          variant="outlined" 
          value={userName} 
          sx={{m:2}}
          onChange={(e)=>{setUserName(e.target.value)}}
          fullWidth
          />
          </Box>
          <Box sx={{display:'flex'}}>
          <TextField 
          id="outlined-basic" 
          label="Description" 
          variant="outlined" 
          value={desc} 
          sx={{m:2}}
          onChange={(e)=>{setDescription(e.target.value)}}
          fullWidth
          />
          </Box>
          <Box sx={{display:'flex'}}>
          <TextField 
          id="outlined-basic" 
          label="City" 
          variant="outlined" 
          value={city} 
          sx={{m:2}}
          onChange={(e)=>{setCity(e.target.value)}}
          fullWidth
          />
          </Box>
          <Box sx={{display:'flex'}} >
          <TextField 
          id="outlined-basic" 
          label="From" 
          variant="outlined" 
          value={from} 
          sx={{m:2}}
          onChange={(e)=>{setFrom(e.target.value)}}
          fullWidth
          />
          </Box>
          <Box sx={{display:'flex'}} >
          <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={relationship}
          label="Relational Status"
          onChange={(e)=>{setRelation(e.target.value)}}
          fullWidth
          >
          <MenuItem value=""><em>None</em></MenuItem>
          <MenuItem value={"Single"}>Single</MenuItem>
          <MenuItem value={"Married"}>Married</MenuItem>
          <MenuItem value={"It's Complicated"}>It's Complicated</MenuItem>
        </Select>
          </Box>

          <Box sx={{display:'flex',margin:2}} gap={2}>
          <Button variant="contained" component="label" sx={{maxHeight:40}} onClick={handleSubmit} color="success">Update</Button>
          <Button variant="contained" component="label" sx={{maxHeight:40}} onClick={handleClose} color="error">Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
} 


function EditCoverPic(){
  const {loading,userRedux,companyRedux,adminRedux,error} =useSelector((state)=>({...state.auth}))
  const [covImage,setCovImage]=useState("")
  const [openCovPic, setCovpic] =useState(false);
  const handleOpenCov = () => setCovpic(true);
  const handleCloseCov = () => setCovpic(false);
  const dispatch=useDispatch()
  const handleCovImage=(e)=>{
    setCovImage(e.target.files[0])
}
const uploadCoverImage=async()=>{
  if(covImage===""){
    alert("Upload Image")
  }else{
    const formData=new FormData()
    formData.append("coverpicture",covImage)
    const userId=userRedux._id
    await updateUserCoverPic(userId,formData).then(async(data)=>{
      const userTocken=JSON.parse(localStorage.getItem('userTocken'))
      dispatch(userTockenValidator({userTocken}))
        handleCloseCov()
        setCovImage("")
        alert('Updated Successfully') 
    }).catch((err)=>{
      alert("Error")
    })
  }
}
  return(
    <>
            <Button onClick={handleOpenCov} variant={'contained'} sx={{m:2}} size="small">Edit Cover Pic</Button>
            <Modal
            open={openCovPic}
            onClose={handleCloseCov}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Update Cover Pic
              </Typography>
              <Grid container sx={{display: 'flex'}} gap={3}>
                <Grid item>
                <img width={'50px'} height={'50px'} src={
                  userRedux?.coverpicture?
                  "http://localhost:5000/cover-images/"+userRedux?.coverpicture
                  : 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_509107562_2000133320009280346_351827.jpg'
                }></img>
                </Grid>
                <Grid item>
                <Button variant="contained" component="label">
                  Upload Image
                  <input
                    type="file"
                    filename='postImage'
                    onChange={handleCovImage}
                    hidden
                  /></Button>
                </Grid>
                <Grid item>
                <Button variant="contained" color="success" onClick={uploadCoverImage}>
                    Upload
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Modal>
    </>
  )
}

function EditProfilePic(){
  const {loading,userRedux,companyRedux,adminRedux,error} =useSelector((state)=>({...state.auth}))
  const [proImage,setProImage]=useState("")
  const [openProPic, setOpenPropic] =useState(false);
  const handleOpenPro = () => setOpenPropic(true);
  const handleClosePro = () => setOpenPropic(false);
  const dispatch=useDispatch() 
  const handleProImage=async(e)=>{
    setProImage(e.target.files[0])
  }
  const uploadProfileImage=async()=>{
    if(proImage===""){
      alert("Upload Image")
    }else{
      const formData=new FormData()
      formData.append("profilepicture",proImage)
      const userId=userRedux?._id
      await updateUserProfilePic(userId,formData).then((data)=>{
        const userTocken=JSON.parse(localStorage.getItem('userTocken'))
        dispatch(userTockenValidator({userTocken}))
        handleClosePro()
         alert('Updated Successfully') 
      }).catch((err)=>{
        alert("Error")
      })
    }
  }

  return(
    <>
            <Button onClick={handleOpenPro} variant={'contained'} sx={{m:2}} size="small">Edit Profile Pic</Button>
            <Modal
            open={openProPic}
            onClose={handleClosePro}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Update Profile Pic
              </Typography>
              <Grid container sx={{display: 'flex'}} gap={3}>
                <Grid item>
                <img width={'50px'} height={'50px'} src={
                  userRedux?.profilepicture?
                  "http://localhost:5000/profile-images/"+userRedux?.profilepicture
                  : 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_509107562_2000133320009280346_351827.jpg'
                }></img>
                </Grid>
                <Grid item>
                <Button variant="contained" component="label">
                  Upload Image
                  <input
                    type="file"
                    filename='postImage'
                    onChange={handleProImage}
                    hidden
                  /></Button>
                </Grid>
                <Grid item>
                <Button variant="contained" color="success" onClick={uploadProfileImage}>
                    Upload
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Modal>
    </>
  )
}

function RightSideBarProfile({profileview,userId}) {
    const navigate=useNavigate()
    const {loading,userRedux,companyRedux,error} =useSelector((state)=>({...state.auth}))
    const [follower,setFollower]=useState([])
    const [following,setFollowing]=useState([])
    const [profileUser,setProfilUser]=useState(null)
    
    useEffect(()=>{
      if(profileview && userId){
        const invoke=async()=>{
          setFollower([])
          setFollowing([])
          const resp=await getUserById(userId).then((res)=>{
            res.data.followers.map(async(user)=>{
              await getUserById(user).then((resp)=>{
                setFollower(current=>[...current,resp.data])
              }).catch((err)=>{
                console.log(err);
              })              
            })
            res.data.followings.map(async(user)=>{
              await getUserById(user).then((resp)=>{
                setFollowing(current=>[...current,resp.data])
              }).catch((err)=>{
                console.log(err);
              })
            })
          }).catch((err)=>{
            console.log(err);
          })
      
        }
        setTimeout(invoke(),2000)
        
      }else{
        const invoke=()=>{
        userRedux?.followers?.map(async(userId)=>{
          await getUserById(userId).then((resp)=>{
            setFollower(current=>[...current,resp.data])
          }).catch((err)=>{
            console.log(err);
          })
        })
          userRedux?.followings?.map(async(userId)=>{
          const resp=await getUserById(userId)
          setFollowing(current=>[...current,resp.data])
        })
        
      }
      setTimeout(invoke(),2000)
    }
    
      },[userRedux,userId])

    useEffect(()=>{
      if(profileview && userId){
      const getUserInfo=async()=>{
        await getUserById(userId).then((resp)=>{
          setProfilUser(resp.data)
        })
      }
      getUserInfo()
      }else{
        setProfilUser(userRedux)
      }
    },[userId,userRedux])
   const gotoUser=(id)=>{
        navigate("/viewuserprofile/"+id)
      }

  return (
    <Box flex={1} p={2} 
    sx={{display:{xs:'none',sm:'block'}}}>
      <Box  p={3}>
      <Box>
      <h4 className='rightbarTitle'> User Info</h4>
      <div className='rightbarInfo'>
        <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>City</span>
            <span className='rightbarInfoValue'>{profileUser?.city?profileUser.city:"Undefined"}</span>
        </div>
        <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>from</span>
            <span className='rightbarInfoValue'>{profileUser?.from?profileUser.from:"Undefined"}</span>
        </div>
        <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>Relationship</span>
            <span className='rightbarInfoValue'>{profileUser?.relationship?profileUser.relationship:"Undefined"}</span>
        </div>
        {!profileview && <><BasicModal user={profileUser}/><EditProfilePic/>
        <EditCoverPic/></>}

      </div>
      <h4 className='rightbarTitle'> User Following</h4>
        <div className='rightbarFollowings'>
        
        {following.map((fellow,index)=>{
            return(
                <div key={index} className='rightbarFollowing' onClick={()=>{gotoUser(fellow._id)}}>
                <img className='rightbarFollowingImage' src={fellow?.profilepicture!==""?"http://localhost:5000/profile-images/"+fellow.profilepicture
            :"https://www.whatsappimages.in/wp-content/uploads/2021/12/girl-New-Superb-Whatsapp-Dp-Profile-Images-photo.jpg"}></img>
                <span className='rightbarFollowingName'>{fellow.userName}</span>
            </div>
            )})
          }
            
        </div>
        <h4 className='rightbarTitle'>Followers</h4>
        <div className='rightbarFollowings'>
        {follower.map((fellow,index)=>{
            return(
                <div key={index} className='rightbarFollowing'>
                <img className='rightbarFollowingImage' src={fellow?.profilepicture!==""?"http://localhost:5000/profile-images/"+fellow.profilepicture
            :"https://www.whatsappimages.in/wp-content/uploads/2021/12/girl-New-Superb-Whatsapp-Dp-Profile-Images-photo.jpg"}></img>
                <span className='rightbarFollowingName'>{fellow.userName}</span>
            </div>
            )})
          }

        </div>
      </Box>


      <Box sx={{marginTop:2}}>
      <Typography variant={'h6'} m={2}>Images</Typography>
        <ImageListComponent profileview userId/>
      </Box> 
      <Chatox/>
      </Box>
      
    
    </Box>
  )
}

export default RightSideBarProfile
