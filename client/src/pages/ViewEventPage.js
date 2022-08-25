import Navbar from "../components/Navbar"
import ViewEvent from "../components/vendors/ViewEvent"
import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router';
import { getEventById } from "../store/api";
function ViewEventPage() {
    const { id } = useParams();
    const [eventId,serEventId]=useState(id)
    const [event,setEvent]=useState(null)
    useEffect(()=>{
        const getEvent=async()=>{
            await getEventById(eventId).then((data)=>{
                setEvent(data.data) 
            }).catch((err)=>{
                console.log(err);
            })
        }
        getEvent()
    },[])
    return (
    <>
     <Navbar/>
     <ViewEvent event={event}/>
    </>
  )
}

export default ViewEventPage
