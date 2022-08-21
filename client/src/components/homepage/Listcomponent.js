import React,{useEffect,useState} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export default function Listcomponent({list}) {
  return (
    <List sx={{  bgcolor:'lightskyblue', borderRadius:3, opacity:3}}>
      {list?.map((item,index)=>{
        return(
          <div key={index}>
          <ListItem alignItems="flex-start" >
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
    </List>
  );
}
