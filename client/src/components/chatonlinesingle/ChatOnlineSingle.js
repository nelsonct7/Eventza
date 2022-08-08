import React,{useState,useEffect} from 'react'
import { getConversationsByIds, getUserById } from '../../store/api'
import './chatonlinesingle.css'
function ChatOnlineSingle({user,currentUser,setCurrentChat}) {
    const [onliner,setOnliner]=useState(null)
    useEffect(()=>{
        const getUserByIdChat=async()=>{
            const data=await getUserById(user)
            setOnliner(data.data)
        }
        getUserByIdChat();   
    },[])
const handleClick=()=>{
    const getCon=async()=>{
        const res=await getConversationsByIds(currentUser,onliner._id)
        setCurrentChat(res.data)
    }
    getCon()
}
  return ( 
    <div className='chatOnline'>
      <div className='chatOnlineFriend' onClick={handleClick}>
        <div className='chatOnlineImageContainer'>
            <img 
            src={onliner?"http://localhost:5000/profile-images/"+onliner.profilepicture:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
            className='chatOnlineImage'></img>
            <div className='chatOnlineBadge'></div>
        </div>
        <span className='chatOnlineName'>{onliner?.userName}</span>
        </div>
    </div>
        )
}

export default ChatOnlineSingle
