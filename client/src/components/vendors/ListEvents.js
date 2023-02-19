import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { getAllEvents, getEventByVendorId } from '../../store/api'
import moment from 'moment'

function ListEvents() {
const navigate=useNavigate()
const [events,setEvents]=useState()
const {loading,userRedux,companyRedux,adminRedux,error} =useSelector((state)=>({...state.auth}))
const getDataById=async()=>{
    await getEventByVendorId(companyRedux?._id).then((data)=>{
        setEvents(data.data)
    }).catch((err)=>{
        console.log(err);
    })
}
const getAllEventsToComponent=async()=>{
    await getAllEvents().then((data)=>{
        setEvents(data.data)
    }).catch((err)=>{
        console.log(err);
    })
    }
useEffect(()=>{
    companyRedux ? getDataById()
    : getAllEventsToComponent()
},[companyRedux,userRedux])

const handleClick=(eventId)=>{
navigate('/viewevent/'+eventId)
}
  return (
    <>
    {
    companyRedux && 
    <Grid container sx={{gap:2, display:'flex', justifyContent:'space-around',mt:4}}> 
        {events?.map((item,index)=>{
            return (
                <Grid item xs={3} key={index}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={"http://localhost:5000/event-images/"+item?.posterImage}
                        alt="Event Image"
                        sx={{cursor:'pointer'}}
                        onClick={()=>handleClick(item._id)}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {item?.eventName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {item?.companyName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {item?.eventType}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        {moment(item?.eventDate).format("MMM Do YY")}
                        </Typography>
                      </CardContent>
                    </Card>
                </Grid>
            )
        })
        
        }
    </Grid>
    }
    </>
  )
}

export default ListEvents
