import React,{useState,useEffect} from 'react'
import './Conversations.css'
import {getUserById} from '../../store/api'

function Conversations({conversation,currentUser}) {
  const [user,setUser]=useState("")
  useEffect(()=>{
     const friendId=conversation.members.find((m)=>m!==currentUser._id)
     const getUser=async()=>{
      const userId=friendId
      try{
        const res=await getUserById(userId)
        setUser(res.data)
      }catch(err){
        console.log(err);
      }
     };
     getUser()
  },[currentUser,conversation])

  return (
    <div className='conversation'> 
      <img className='conversationImg' 
      src={user?.profilepicture?"http://localhost:5000/profile-images/"+user.profilepicture:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}></img>
        <span className='conversationName'>{user?.userName}</span>
    </div>
  )
}
export default Conversations
