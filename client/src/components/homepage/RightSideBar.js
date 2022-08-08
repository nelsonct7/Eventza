import { Box, Typography,Avatar,AvatarGroup,ImageList,ImageListItem, } from '@mui/material'
import React from 'react'
import Chatox from '../chatbox/Chatox'
import ImageListComponent from './ImageListComponent'


const RightSideBar = () => {
  return (
      <Box flex={1} p={2} 
      sx={{display:{xs:'none',sm:'block'}}}>
        <Box sx={{position:'fixed',overflowY:'scroll',maxHeight:'80vh'}} p={3}>
        <Box>
        <Typography variant={'h6'}>Followers</Typography>
        <AvatarGroup max={7}>
        <Avatar alt="Remy Sharp" src="https://www.whatsappimages.in/wp-content/uploads/2021/12/girl-New-Superb-Whatsapp-Dp-Profile-Images-photo.jpg" />
        <Avatar alt="Travis Howard" src="https://i2-prod.walesonline.co.uk/news/uk-news/article23927263.ece/ALTERNATES/s1200c/0_F038F02A-D11F-11EC-A042-0A2111BCB09D.jpg" />
        <Avatar alt="Cindy Baker" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvxDrCR5SfO2zzeBNLF9U9xbjlC8-ToAA68g&usqp=CAU" />
        <Avatar alt="Agnes Walker" src="https://www.syracuse.com/resizer/plLj5BdGDIr3VfdFvegOQyiBugM=/arc-anglerfish-arc2-prod-advancelocal/public/EAACMW43EZAVNDPNCAV26JZAFI.jpg" />
        <Avatar alt="Trevor Henderson" src="https://pbs.twimg.com/media/FSXn9kkWYAA_gc2?format=jpg&name=360x360" />
        </AvatarGroup>
        </Box>
        <Box sx={{marginTop:5}}>
        <Typography variant={'h6'}>Following</Typography>
        <AvatarGroup max={7}>
        <Avatar alt="Remy Sharp" src="https://www.whatsappimages.in/wp-content/uploads/2021/12/girl-New-Superb-Whatsapp-Dp-Profile-Images-photo.jpg" />
        <Avatar alt="Travis Howard" src="https://i2-prod.walesonline.co.uk/news/uk-news/article23927263.ece/ALTERNATES/s1200c/0_F038F02A-D11F-11EC-A042-0A2111BCB09D.jpg" />
        <Avatar alt="Cindy Baker" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvxDrCR5SfO2zzeBNLF9U9xbjlC8-ToAA68g&usqp=CAU" />
        <Avatar alt="Agnes Walker" src="https://www.syracuse.com/resizer/plLj5BdGDIr3VfdFvegOQyiBugM=/arc-anglerfish-arc2-prod-advancelocal/public/EAACMW43EZAVNDPNCAV26JZAFI.jpg" />
        <Avatar alt="Trevor Henderson" src="https://pbs.twimg.com/media/FSXn9kkWYAA_gc2?format=jpg&name=360x360" />
        </AvatarGroup>
        </Box>
        <Box sx={{marginTop:5}}>
        <Typography variant={'h6'} m={2}>Images</Typography>
          <ImageListComponent/>
        </Box>
        <Chatox/>
        </Box>
        
      
      </Box>
  )
}

export default RightSideBar
