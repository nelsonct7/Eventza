import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import {DateTimePicker} from '@mui/x-date-pickers-pro';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import {useSelector,useDispatch} from 'react-redux'

 
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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () =>{
    setOpen(false);
    setCompanyName("")
    setEventDate("")
    setEventName("")
    setEventType("")
  } 
  const [eventName,setEventName]=React.useState("")
  const [eventType,setEventType]=React.useState("")
  const [eventDate,setEventDate]=React.useState("")
  const [eventLocation,setEventLocation]=React.useState(null)
  const [companyName,setCompanyName]=React.useState("")
  const {loading,userRedux,companyRedux,adminRedux,error} =useSelector((state)=>({...state.auth}))

  const handleDate = (newValue) => {
    setEventDate(newValue);
  };

  const handleSubmit=()=>{
    alert(eventName+" "+eventType+" "+eventDate+" "+companyName)
    handleClose() 
  }
  useEffect(()=>{
    setCompanyName(companyRedux?.companyName)
  })
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
        <LocalizationProvider dateAdapter={AdapterMoment} >
        <DateTimePicker
          label="Event Date"
          value={eventDate}
          onChange={handleDate}
          renderInput={(params) => <TextField {...params} fullWidth sx={{mb:2}} variant="outlined" />}
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
        <Box sx={{display:'flex',margin:2}} gap={2}>
          <Button variant="contained" component="label" sx={{maxHeight:40}} onClick={handleSubmit} color="success">Update</Button>
          <Button variant="contained" component="label" sx={{maxHeight:40}} onClick={handleClose} color="error">Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

