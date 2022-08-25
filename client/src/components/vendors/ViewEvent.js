import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import React,{useEffect,useState} from 'react'
import moment from 'moment'

function ViewEvent({event}) {
  const [item,setItem]=useState(null)

  useEffect(()=>{
    event && setItem(event)
  },[event])

  return (
    <Grid container xs={12}>
        <Grid item xs={12} sx={{m:2}}>
        <Card >
                      <CardMedia
                        component="img"
                        height="400"
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
                        {moment(item?.eventDate).format("MMM Do YY")}
                        </Typography>
                      </CardContent>
                    </Card>
        </Grid>
    </Grid>
  )
}

export default ViewEvent
