import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import React,{useState,useEffect} from 'react'
import { getAllEvents } from '../../../store/api';
import moment from 'moment'
  
  

function LatestEventsTable() {
const [events,setEvents]=useState([])
useEffect(()=>{
    const getTableData=async()=>{
        await getAllEvents().then((resp)=>{
            setEvents(resp.data)
        }).catch((err)=>{
            console.log(err);
        })
    }
    getTableData()
},[])

  return (
    <TableContainer component={Paper}>
        <Typography variant='h6' m={2}>Event Details</Typography>
      <Table sx={{ minWidth: 300}} aria-label="simple table">
        <TableHead sx={{backgroundColor:'#155799'}}>
          <TableRow>
            <TableCell>Event Name</TableCell>
            <TableCell align="right">Compnay</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Option</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events?.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              {row.eventName}
              </TableCell>
              <TableCell align="right">{row?.companyName}</TableCell>
              <TableCell align="right">{row?.eventType}</TableCell>
              <TableCell align="right">{moment(row?.eventDate).format("MMM Do YY")}</TableCell>
              <TableCell align="right"><Button >Remove</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default LatestEventsTable
