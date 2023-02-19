import { Avatar, Box, Button, Grid, MenuItem, Modal, Paper, Select, TextField, Typography } from '@mui/material'
import React,{useEffect,useState} from 'react'
import AddPost from '../homepage/Post'
import VendorCard from './VendorCard'
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as api from '../../store/api'
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';


import EditIcon from '@mui/icons-material/Edit';
import {vendorTockenValidator } from '../../store/features/authSlice'

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,

  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

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

function BasicModal({company}) {
  const [open, setOpen] =useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [companyName,setCompanyName]=useState("")
  const [desc,setDescription]=useState("")
  const [city,setCity]=useState("")
  const [from,setFrom]=useState("")

  const navigate=useNavigate()
  const dispatch=useDispatch()
useEffect(()=>{
  setCompanyName(company?.companyName)
  setDescription(company?.desc)
  setCity(company?.city)
  setFrom(company?.from)
},[company])


const handleSubmit=async()=>{
  if(companyName==="" || desc==="" || city==="" || from===""){
      alert('Fill up all the fields')
  }else{      
    
        //  const formData=new FormData()
        //  formData.append("creatorId","props.editdata._id")
        //  formData.append("post","editPost")
        const formData={
          companyName,
          desc,
          city,
          from
        }
        const vendorId=company?._id
        await api.updateVendor(vendorId,formData).then((data)=>{
          const vendorTocken=JSON.parse(localStorage.getItem('vendorTocken'))
          dispatch(vendorTockenValidator({vendorTocken}))
          handleClose()
          alert('Updated Successfully') 
        }).catch((err)=>{
          console.log(err);
        })
              
  }
}

const handleDelete=()=>{
  handleClose() 
}

  return (
    <div>
      <EditIcon onClick={handleOpen}  sx={{m:2,cursor:'pointer'}} size="small"/>
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
          value={companyName} 
          sx={{m:2}}
          onChange={(e)=>{setCompanyName(e.target.value)}}
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
          <Box sx={{display:'flex',margin:2}} gap={2}>
          <Button variant="contained" component="label" sx={{maxHeight:40}} onClick={handleSubmit} color="success">Update</Button>
          <Button variant="contained" component="label" sx={{maxHeight:40}} onClick={handleClose} color="error">Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}


function VendorFeed({profile}) {
  const [proImage,setProImage]=useState("")
  const [covImage,setCovImage]=useState("")
  const [openProPic, setOpenPropic] =useState(false);
  const handleOpenPro = () => setOpenPropic(true);
  const handleClosePro = () => setOpenPropic(false);
  const [openCovPic, setCovpic] =useState(false);
  const handleOpenCov = () => setCovpic(true);
  const handleCloseCov = () => setCovpic(false);
  const {loading,userRedux,companyRedux,adminRedux,error} =useSelector((state)=>({...state.auth}))
  const {showDash,showUser,showManager,showCompany,showPost}=useSelector((state)=>({...state.click}))
  const {posts}=useSelector((state)=>({...state.post}))
  const dispatch=useDispatch()
  const [feeds,setFeeds]=useState([])
  const getData=async()=>{
    if(showPost){
      const data=await api.getPostbyId(companyRedux._id)
    setFeeds(data.data.feeds)
    }else{
      const data=await api.getPost()
    setFeeds(data.data.feeds)
    } 
  }

  const handleProImage=async(e)=>{
    setProImage(e.target.files[0])
  }

const uploadProfileImage=async()=>{
  if(proImage===""){
    alert("Upload Image")
  }else{
    const formData=new FormData()
    formData.append("profilepicture",proImage)
    const vendorId=companyRedux._id
    await api.updateVendorProfilePic(vendorId,formData).then((data)=>{
      const vendorTocken=JSON.parse(localStorage.getItem('vendorTocken'))
        dispatch(vendorTockenValidator({vendorTocken}))
        handleClosePro()
        setProImage("")
        alert('Updated Successfully') 
    }).catch((err)=>{
      alert("Error")
    })
  }
}
  
  const handleCovImage=(e)=>{
    setCovImage(e.target.files[0])
}
const uploadCoverImage=async()=>{
  if(covImage===""){
    alert("Upload Image")
  }else{
    const formData=new FormData()
    formData.append("coverpicture",covImage)
    const vendorId=companyRedux._id
    await api.updateVendorCoverPic(vendorId,formData).then(async(data)=>{
      const vendorTocken=JSON.parse(localStorage.getItem('vendorTocken'))
        dispatch( vendorTockenValidator({vendorTocken}))
        handleCloseCov()
        setCovImage("")
        alert('Updated Successfully') 
    }).catch((err)=>{
      alert("Error")
    })
  }
}

  useEffect(()=>{
    getData()
  },[posts,showPost,companyRedux])


  return (
    <Box flex={4} p={2}>
        {profile && 
        <Grid container sx={{width:'100%',alignItems:'center'}}>
        <Grid item sx={{width:'100%',position:'relatieve'}}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' ,}}>
        {
        <ImageButton
          focusRipple
          style={{
            width: '100%', 
          }}
        >
          <ImageSrc style={{ backgroundImage: `url(
            ${companyRedux?.coverpicture?
            "http://localhost:5000/cover-images/"+companyRedux?.coverpicture
            : 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_509107562_2000133320009280346_351827.jpg'})`
          }} />
          <ImageBackdrop className="MuiImageBackdrop-root"/>
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
              onClick={handleOpenCov}
            >
              Edit
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>}
          </Box>
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
                  companyRedux?.coverpicture?
                  "http://localhost:5000/cover-images/"+companyRedux?.coverpicture
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
          </Grid>
          <Grid item sx={{position:'absolute',marginLeft:'50px'}}>
          <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                minWidth: 300,
                borderRadius: "50%",
                
              }}
            >
              {
                <ImageButton
                  focusRipple
                  style={{
                    width: 200,
                    borderRadius: "50%"
                  }}
                >
                  <ImageSrc
                    style={{
                      backgroundImage: `url(
            ${
              companyRedux?.profilepicture
                ? "http://localhost:5000/profile-images/" +
                  companyRedux?.profilepicture
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            })`,
                      borderRadius: "50%",
                    
                    }}
                  />
                  <ImageBackdrop className="MuiImageBackdrop-root" sx={{borderRadius: "50%"}}/>
                  <Image sx={{ borderRadius: "50%"}} >
                    <Typography
                      component="span"
                      variant="subtitle1"
                      color="inherit"
                      sx={{
                        position: "relative",
                        p: 4,
                        pt: 2,
                        pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                      }}
                      onClick={handleOpenPro}
                    >
                      Edit
                      <ImageMarked className="MuiImageMarked-root"/>
                    </Typography>
                  </Image>
                </ImageButton>
              }
            </Box>
            <Modal
            open={openProPic}
            onClose={handleClosePro}
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
                  companyRedux?.coverpicture?
                  "http://localhost:5000/profile-images/"+companyRedux?.profilepicture
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
          </Grid>
          <Grid item sx={{textAlign:'end'}} xs={12}>
          <Box sx={{marginTop:4,textAlign:'end'}}>
            <Typography variant='h4'>{companyRedux?.companyName}</Typography>
            <Typography variant='h6'>{companyRedux?.desc?companyRedux.desc:"Undefined"}</Typography>
            <Typography variant='h6'>From : {companyRedux?.from?companyRedux.from:"Undefined"}</Typography>
            <Typography variant='h6'>City : {companyRedux?.city?companyRedux.city:"Undefined"}</Typography>
          </Box>
            <BasicModal company={companyRedux}/>
          </Grid>
        </Grid>  }
        {companyRedux && <AddPost/>}
        {feeds.map((fee,index)=> <VendorCard key={index} data={fee}/>)}
    </Box>
  )
}

export default VendorFeed
