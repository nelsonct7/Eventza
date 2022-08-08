import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export default function Listcomponent() {
  return (
    <List sx={{ width: '100%', bgcolor:'#9f86c0', borderRadius:3}}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30163537/7_big7.png" />
        </ListItemAvatar>
        <ListItemText
          primary="Company"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Company Name
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="https://dcassetcdn.com/design_img/3672331/127652/127652_21325353_3672331_4533acb9_image.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Summer BBQ"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Company 
              </Typography>
              
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="https://images-platform.99static.com//41A1yjIzR5EUzkOw7vEdOt9A5mg=/179x24:897x742/fit-in/500x500/99designs-contests-attachments/111/111202/attachment_111202231" />
        </ListItemAvatar>
        <ListItemText
          primary="Oui Oui"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Name
              </Typography>
             
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}
