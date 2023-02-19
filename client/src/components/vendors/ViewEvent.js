import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import React,{useEffect,useState} from 'react'
import moment from 'moment'

function ViewEvent({event}) {
  const [item,setItem]=useState(null)

  useEffect(()=>{
    event && setItem(event)
  },[event])

  return (
    <Grid container xs={12} sx={{display:'flex',justifyContent:'center'}}>
        <Grid item xs={8} sx={{m:2,
        border: 'solid #283c86 25px', 
	      opacity: '0.8',
        borderRadius:3,
        }}>
        <Card >
                      <CardMedia
                        component="img"
                        
                        image={"http://localhost:5000/event-images/"+item?.posterImage}
                        alt="Event Image"
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
                            {item?.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        {moment(item?.eventDate).format("MMM Do YY")}
                        </Typography>
                      </CardContent>
                    </Card>
        </Grid>
    </Grid>
  )
}

export default ViewEvent
