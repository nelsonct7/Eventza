import { Box, Typography,Avatar,AvatarGroup,ImageList,ImageListItem, } from '@mui/material'
import React from 'react'
import Chatox from '../chatbox/Chatox'
import ImageListComponent from './ImageListComponent'
import './RightSidebarProfile.css'

function RightSideBarProfile() {
  return (
    <Box flex={1} p={2} 
    sx={{display:{xs:'none',sm:'block'}}}>
      <Box  p={3}>
      <Box>
      <h4 className='rightbarTitle'> User Info</h4>
      <div className='rightbarInfo'>
        <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>City</span>
            <span className='rightbarInfoValue'>New york</span>
        </div>
        <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>from</span>
            <span className='rightbarInfoValue'>Madrid</span>
        </div>
      </div>
      <h4 className='rightbarTitle'> User Following</h4>
        <div className='rightbarFollowings'>
            <div className='rightbarFollowing'>
                <img className='rightbarFollowingImage' src='https://www.whatsappimages.in/wp-content/uploads/2021/12/girl-New-Superb-Whatsapp-Dp-Profile-Images-photo.jpg'></img>
                <span className='rightbarFollowingName'>John Carter</span>
            </div>
            <div className='rightbarFollowing'>
                <img className='rightbarFollowingImage' src='https://www.whatsappimages.in/wp-content/uploads/2021/12/girl-New-Superb-Whatsapp-Dp-Profile-Images-photo.jpg'></img>
                <span className='rightbarFollowingName'>John Carter</span>
            </div>
            <div className='rightbarFollowing'>
                <img className='rightbarFollowingImage' src='https://www.whatsappimages.in/wp-content/uploads/2021/12/girl-New-Superb-Whatsapp-Dp-Profile-Images-photo.jpg'></img>
                <span className='rightbarFollowingName'>John Carter</span>
            </div>
            <div className='rightbarFollowing'>
                <img className='rightbarFollowingImage' src='https://www.whatsappimages.in/wp-content/uploads/2021/12/girl-New-Superb-Whatsapp-Dp-Profile-Images-photo.jpg'></img>
                <span className='rightbarFollowingName'>John Carter</span>
            </div>
            <div className='rightbarFollowing'>
                <img className='rightbarFollowingImage' src='https://www.whatsappimages.in/wp-content/uploads/2021/12/girl-New-Superb-Whatsapp-Dp-Profile-Images-photo.jpg'></img>
                <span className='rightbarFollowingName'>John Carter</span>
            </div>
            <div className='rightbarFollowing'>
                <img className='rightbarFollowingImage' src='https://www.whatsappimages.in/wp-content/uploads/2021/12/girl-New-Superb-Whatsapp-Dp-Profile-Images-photo.jpg'></img>
                <span className='rightbarFollowingName'>John Carter</span>
            </div>

        </div>
        <h4 className='rightbarTitle'>Followers</h4>
        <div className='rightbarFollowings'>
            <div className='rightbarFollowing'>
                <img className='rightbarFollowingImage' src='https://www.whatsappimages.in/wp-content/uploads/2021/12/girl-New-Superb-Whatsapp-Dp-Profile-Images-photo.jpg'></img>
                <span className='rightbarFollowingName'>John Carter</span>
            </div>
            <div className='rightbarFollowing'>
                <img className='rightbarFollowingImage' src='https://www.whatsappimages.in/wp-content/uploads/2021/12/girl-New-Superb-Whatsapp-Dp-Profile-Images-photo.jpg'></img>
                <span className='rightbarFollowingName'>John Carter</span>
            </div>
            <div className='rightbarFollowing'>
                <img className='rightbarFollowingImage' src='https://www.whatsappimages.in/wp-content/uploads/2021/12/girl-New-Superb-Whatsapp-Dp-Profile-Images-photo.jpg'></img>
                <span className='rightbarFollowingName'>John Carter</span>
            </div>
            <div className='rightbarFollowing'>
                <img className='rightbarFollowingImage' src='https://www.whatsappimages.in/wp-content/uploads/2021/12/girl-New-Superb-Whatsapp-Dp-Profile-Images-photo.jpg'></img>
                <span className='rightbarFollowingName'>John Carter</span>
            </div>
            <div className='rightbarFollowing'>
                <img className='rightbarFollowingImage' src='https://www.whatsappimages.in/wp-content/uploads/2021/12/girl-New-Superb-Whatsapp-Dp-Profile-Images-photo.jpg'></img>
                <span className='rightbarFollowingName'>John Carter</span>
            </div>
            <div className='rightbarFollowing'>
                <img className='rightbarFollowingImage' src='https://www.whatsappimages.in/wp-content/uploads/2021/12/girl-New-Superb-Whatsapp-Dp-Profile-Images-photo.jpg'></img>
                <span className='rightbarFollowingName'>John Carter</span>
            </div>

        </div>
      </Box>


      <Box sx={{marginTop:2}}>
      <Typography variant={'h6'} m={2}>Images</Typography>
        <ImageListComponent/>
      </Box>

      <Chatox/>
      </Box>
      
    
    </Box>
  )
}

export default RightSideBarProfile
