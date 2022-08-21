import React ,{useState,useEffect, useRef}from 'react'
import './messenger.css'
import  NavBar from '../../components/Navbar'
import Conversations from '../../components/conversations/Conversations'
import Message from '../../components/message/Message'
import ChatOnline from '../../components/chatonline/ChatOnline'
import {useSelector} from 'react-redux'
import {getConversations,getMessagesByConversationId,setMessage} from '../../store/api'
import {io} from 'socket.io-client'

function Messenger() {
    const [conversation,setConversations]=useState([])
    const [currentChat,setCurrentChat]=useState(null)
    const [messages,setMessages]=useState([])
    const [newMessage,setNewMessage]=useState("")
    const [arrivalMessage,setArrivalMessage]=useState(null)
    const [onlineUsers,setOnlineUsers]=useState([])
    const socket=useRef()
    const scroolRef=useRef()
    
    const {userRedux,companyRedux,adminRedux} =useSelector((state)=>({...state.auth}))
    
    useEffect(()=>{
        socket.current=io("ws://localhost:8900")
        socket.current.on("getMessage",data=>{
            setArrivalMessage({
                senderId:data.senderId,
                senderName:data.senderName,
                senderType:data.senderType,
                text:data.text,
                createdAt:Date.now()
            })
        })
    },[arrivalMessage])

    useEffect(()=>{
        arrivalMessage && currentChat?.members.includes(arrivalMessage.senderId) && 
        setMessages((prev)=>[...prev,arrivalMessage])
    },[arrivalMessage,currentChat])
    
    useEffect(()=>{
        userRedux && socket?.current.emit("addUser",userRedux?userRedux?._id:companyRedux?._id);
        userRedux && socket?.current.on("getUsers",(users)=>{ 
            setOnlineUsers(users)
        })
    },[userRedux])

    useEffect(()=>{
        const userConversations=async()=>{
            try{
                const id=userRedux?userRedux?._id:companyRedux?._id
                const res=await getConversations(id)
                setConversations(res.data)
            }catch(err){
                console.log(err);
            }
        };
        (userRedux||companyRedux) && userConversations()
    },[userRedux,companyRedux])

    useEffect(()=>{
        const getMesseges=async()=>{
            try{
                const resp=await getMessagesByConversationId(currentChat?._id)
                setMessages(resp.data)
            }catch(err){
                console.log(err);
            }
        };
        (userRedux||companyRedux) && getMesseges();
    },[currentChat])


    const handleSubmit=async(e)=>{
      e.preventDefault()
      let message={}
      userRedux?
      message={
        conversationId:currentChat._id,
        senderId:userRedux._id,
        senderName:userRedux.userName,
        senderType:userRedux.userRoll,
        text:newMessage
      }
      :
      message={
        conversationId:currentChat._id,
        senderId:companyRedux._id,
        senderName:companyRedux.companyName,
        senderType:"company",
        text:newMessage
      }
      const reciever=currentChat.members.find(member=>member!==userRedux._id||companyRedux._id)

      let socketMsg={}
      userRedux?
      socketMsg={
        senderId:userRedux._id,
        recieverId:reciever,
        text:newMessage,
        senderName:userRedux.userName,
        senderType:userRedux.userRoll,
      }
      :
      socketMsg={
        senderId:userRedux._id,
        recieverId:reciever,
        text:newMessage,
        senderName:userRedux.userName,
        senderType:userRedux.userRoll,
      }
      socket.current.emit("sendMessage",{...socketMsg})

      try{
        const res=await setMessage(message)
        setMessages([...messages,res.data])
        setNewMessage("")
      }catch(err){
        console.log(err);
    }

    }

    useEffect(()=>{
        scroolRef.current?.scrollIntoView({behavior:'smooth'})
    },[messages]) 

  return (
    <>
    <NavBar/>
    <div className='messenger'>
        <div className='chatMenu'>
            <div className='ChatMenuWrapper'>
                <label className='chatmenulabel'>Chat History</label>
                {
                    conversation.map((c,index)=>{
                        return(
                        <div onClick={()=>setCurrentChat(c)} key={index}>
                        <Conversations conversation={c} currentUser={userRedux?userRedux:companyRedux}/>
                        </div>)
                    })
                }
                

            </div>
        </div>
        <div className='chatBox'>
            <div className='chatBoxWrapper'>

                {
                    currentChat?
                
                <>
                <div className='chatBoxTop'>
                    {
                        messages.map((m,index)=>{
                            return(
                            <div ref={scroolRef} key={index}>
                            <Message message={m} own={userRedux._id===m.senderId}/>
                            </div>)
                        })
                    }
                    
                </div>
                <div className='chatBoxBottom'>
                    <textarea className='chatMessageInput'
                     placeholder='Type something'
                     onChange={(e)=>setNewMessage(e.target.value)}
                     value={newMessage}
                     ></textarea>
                    <button className='chatSubmitButton' onClick={handleSubmit}>Send</button>
                </div>
                </>
                :<span className='noConversationText'>Open a Conversation to start a chat</span>
                }
            </div>
        </div>
        <div className='chatOnline'>
            <div className='chatOnlineWrapper'>
            <label className='chatmenulabel'>Online Friends</label>
                
                <ChatOnline onlineUsers={onlineUsers} currentUser={userRedux?userRedux?._id:companyRedux?._id} setCurrentChat={setCurrentChat}/>
            </div>
        </div>
    </div>
    </>
  )
}


export default Messenger
