import React from 'react'
import './message.css'
import {format} from 'timeago.js'

function Message({message,own}) {
  return (
    <div className={own?'message own':'message'}>
        <div className='messageTop'>
            <h5>{message.senderName}</h5>
            <img className='messageImage' src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'></img>
            <p className={own?'messageownmessageText':'messageText'}>{message.text}</p>
        </div>
        <div className='messageBottom'>{format(message.createdAt)}</div>
    </div>
  )
}

export default Message
