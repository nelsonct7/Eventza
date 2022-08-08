import React from 'react'
import './chatonline.css'

function ChatOnline({onlineUsers,currentUser,setCurrentChat}) {
  return (
    <div className='chatOnline'>
        <div className='chatOnlineFriend'>
            <div className='chatOnlineImageContainer'>
                <img 
                src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                className='chatOnlineImage'></img>
                <div className='chatOnlineBadge'></div>
            </div>
        </div>
        <span className='chatOnlineName'>John Carter</span>
      
    </div>
  )
}

export default ChatOnline
