import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { FormControl, InputLabel, MenuItem, Select, TextareaAutosize, TextField } from '@mui/material';
import {DateTimePicker} from '@mui/x-date-pickers-pro';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import {useSelector,useDispatch} from 'react-redux'
import { addEventVendor } from '../../store/features/eventSlice';

 
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4, 
};

 
export default function AddEvents() {
  const dispatch=useDispatch()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () =>{
    setOpen(false);
    setCompanyName("")
    setEventDate("")
    setEventName("")
    setEventType("")
  } 
  const [description,setDescription]=React.useState("")
  const [eventName,setEventName]=React.useState("")
  const [eventType,setEventType]=React.useState("")
  const [eventDate,setEventDate]=React.useState("")
  const [eventLocation,setEventLocation]=React.useState(null)
  const [companyName,setCompanyName]=React.useState("")
  const [companyId,setCompanyId]=React.useState("")
  const [posterImage,setPostImage]=React.useState(null)
  const {loading,userRedux,companyRedux,adminRedux,error} =useSelector((state)=>({...state.auth}))

  const handleDate = (newValue) => {
    setEventDate(newValue);
  }; 
  const handleImage=(e)=>{
    setPostImage(e.target.files[0])
  }
  const handleSubmit=()=>{
    if(eventName==="" || eventType==="" || eventDate==="" || posterImage===null){
      alert("Add all filds")
    }else{
      const formData=new FormData()
      formData.append('eventName',  eventName)
      formData.append('eventType',  eventType)
      formData.append('eventDate',  eventDate)
      formData.append('companyName',companyName)
      formData.append('companyId',  companyId)
      formData.append('description',  description)
      formData.append('posterImage',posterImage)
      dispatch(addEventVendor({formData}))
      alert("Event added")
      handleClose()
    }
  }
  useEffect(()=>{
    setCompanyName(companyRedux?.companyName)
    setCompanyId(companyRedux?._id)
  },[])
  return (
    <div>
    <Button variant="contained" component="label" onClick={handleOpen}><AddLocationAltIcon />Add Events</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{mb:2}}>
            Add Events
          </Typography>
          <TextField 
          id="outlined-basic" 
          label="Event Name" 
          variant="outlined" 
          value={eventName} 
          onChange={(e)=>{setEventName(e.target.value)}}
          fullWidth
          sx={{mb:2}}
          />

        <TextField 
          id="outlined-basic" 
          label="Company Name" 
          variant="outlined" 
          value={companyRedux?.companyName} 
          disabled
          fullWidth
          sx={{mb:2}}
          />

          <TextareaAutosize
            aria-label="Description"
            minRows={3}
            placeholder="Description"
            onChange={(e)=>{setDescription(e.target.value)}}
            style={{ width: '100%' }}
            sx={{mb:2}} 
          />
        <LocalizationProvider dateAdapter={AdapterMoment} >
        <DateTimePicker
          label="Event Date"
          value={eventDate}
          onChange={handleDate}
          renderInput={(params) => <TextField {...params} fullWidth sx={{mb:2,mt:2}} variant="outlined" />}
        />
        </LocalizationProvider>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Event Type</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={eventType} 
          label="Event Type"
          onChange={(e)=>{setEventType(e.target.value)}}
          fullWidth
          sx={{mb:2}}
          >
          <MenuItem value={"wedding"}>Wedding Events</MenuItem>
          <MenuItem value={"Stage"}>Stage Events</MenuItem>
          <MenuItem value={"Corporate"}>Corporate Events</MenuItem>
        </Select>
        </FormControl>
        <Button variant="contained" component="label" fullWidth>
                  Upload Poster
                  <input
                    type="file"
                    filename='postImage'
                    onChange={handleImage}
                    hidden
                    
                  /></Button>
        <Box sx={{display:'flex',margin:2}} gap={2}>
          <Button variant="contained" component="label" sx={{maxHeight:40}} onClick={handleSubmit} color="success">Update</Button>
          <Button variant="contained" component="label" sx={{maxHeight:40}} onClick={handleClose} color="error">Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

