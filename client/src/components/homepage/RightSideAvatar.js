import { Avatar, AvatarGroup } from '@mui/material'
import React from 'react'

function RightSideAvatar({follower}) {
  return (
    <div>
      <AvatarGroup max={7} sx={{mr:2,mb:3}}>
        {follower.map((fellow,index)=>{
            return(
            <Avatar key={index} alt={fellow.userName} src={fellow?.profilepicture!==""?"http://localhost:5000/profile-images/"+fellow.profilepicture
            :"https://www.whatsappimages.in/wp-content/uploads/2021/12/girl-New-Superb-Whatsapp-Dp-Profile-Images-photo.jpg"} />
            )})
          }
          </AvatarGroup>
    </div>
  )
}

export default RightSideAvatar
