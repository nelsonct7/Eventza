import React,{useEffect,useState} from 'react';
import { Navigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import moment from 'moment'

export default function Listcomponent({list,vendorEvents,events}) {
  return (
    <List sx={{  bgcolor:'lightskyblue', borderRadius:3, opacity:3}}>
      {list && list?.map((item,index)=>{
        return(
          <div key={index}>
          <ListItem alignItems="flex-start" sx={{cursor:'pointer'}}>
          <ListItemAvatar>
            <Avatar alt={item?.companyName||item?.userName} src={item?.profilepicture!==""?"http://localhost:5000/profile-images/"+item.profilepicture
            :"https://www.whatsappimages.in/wp-content/uploads/2021/12/girl-New-Superb-Whatsapp-Dp-Profile-Images-photo.jpg"} />
          </ListItemAvatar>
          <ListItemText
            primary={item?.userRoll==="manager"?"Manager":"Company"}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {item?.companyName||item?.userName}
                </Typography>
              </React.Fragment>
            }
          />
        
        </ListItem>
        <Divider variant="inset" component="li" />
        </div>)
      })}
      {vendorEvents && vendorEvents?.map((item,index)=>{
        return(
          <div key={index}>
          <ListItem alignItems="flex-start" sx={{cursor:'pointer'}}>
          <ListItemAvatar>
            <Avatar  sx={{cursor:'pointer'}} alt={item?.companyName} src={item?.posterImage!==""?"http://localhost:5000/event-images/"+item?.posterImage
            :"https://www.whatsappimages.in/wp-content/uploads/2021/12/girl-New-Superb-Whatsapp-Dp-Profile-Images-photo.jpg"} 
            />
          </ListItemAvatar>
          <ListItemText
            primary={item?.eventName}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {item?.companyName}
                </Typography>
                <br></br>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {item?.eventType}
                </Typography>
                <br></br>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {moment(item?.eventDate).format("MMM Do YY")}
                </Typography>
              </React.Fragment>
            }
          />
        
        </ListItem>
        <Divider variant="inset" component="li" />
        </div>)
      })}
      {events && events?.map((item,index)=>{
        return(
          <div key={index}>
          <ListItem alignItems="flex-start" sx={{cursor:'pointer'}}>
          <ListItemAvatar>
            <Avatar  sx={{cursor:'pointer'}} alt={item?.companyName} src={item?.posterImage!==""?"http://localhost:5000/event-images/"+item?.posterImage
            :"https://www.whatsappimages.in/wp-content/uploads/2021/12/girl-New-Superb-Whatsapp-Dp-Profile-Images-photo.jpg"} 
            />
          </ListItemAvatar>
          <ListItemText
            primary={item?.eventName}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {item?.companyName}
                </Typography>
                <br></br>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {item?.eventType}
                </Typography>
                <br></br>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {moment(item?.eventDate).format("MMM Do YY")}
                </Typography>
              </React.Fragment>
            }
          />
        
        </ListItem>
        <Divider variant="inset" component="li" />
        </div>)
      })}
    </List>
  );
}
