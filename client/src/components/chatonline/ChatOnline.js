import React,{useState,useEffect} from 'react'
import './chatonline.css'
import {useSelector} from 'react-redux'
import ChatOnlineSingle from '../chatonlinesingle/ChatOnlineSingle'

function ChatOnline({onlineUsers,currentUser,setCurrentChat}) {
  const [friends,setFriends]=useState([])
  const [onlineFriends,setOnlineFriends]=useState([])
  const {userRedux,companyRedux,adminRedux} =useSelector((state)=>({...state.auth}))

  useEffect(()=>{
    if(userRedux){
      setFriends(userRedux.followings)
    }
    if(companyRedux){
      setFriends(companyRedux.followers)
    }
    
  },[userRedux,companyRedux])

  useEffect(()=>{
    setOnlineFriends(friends?.filter((f)=>{
      return onlineUsers.includes(f)
    }))
  },[friends,onlineUsers])

  return ( 
    <>
      {onlineFriends?.map((online,index)=>{
        return(
        <ChatOnlineSingle user={online} key={index} currentUser={currentUser} setCurrentChat={setCurrentChat}/>
        )
      })}  
    </>
  )
}

export default ChatOnline
