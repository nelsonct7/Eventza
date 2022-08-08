import React,{useState,useEffect} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Grid, Typography } from '@mui/material';
import * as api from '../../store/api'
import {Link} from 'react-router-dom'
import Swal from "sweetalert2"; 

function CompanyList() {

  const [companyList,setCompanyList]=useState([])
  const getCompany=async()=>{
    const list=await api.viewCompanyListAdmin()
    setCompanyList(list.data)
  }
  const companyChangeStatus=(id,status)=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "Going to Change Status!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then(async (result) => {
      if (result.isConfirmed) {
       await api.changeStatusCompany(id,status).then(async(data)=>{
          Swal.fire({  
            title: 'Success',  
            type: 'success',
            text: 'Status Updated ',  
          }); 
          await api.viewCompanyListAdmin().then(({data})=>{
            setCompanyList(data)
            }).catch((err)=>{
              
            })
        }).catch((err)=>{
          Swal.fire({  
            icon: 'error',  
            title: 'Oops...',  
            text: 'Something went wrong!',   
          }); 
        })
      }
    })

  }


    const deleteCompany=(companyId)=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async(result) => {
      if (result.isConfirmed) {
        await api.adminDeleteCompany(companyId).then(async(data)=>{
          Swal.fire({  
            title: 'Success',  
            type: 'success',
            text: 'User Deleted ',  
          }); 
          await api.viewCompanyListAdmin().then(({data})=>{
            setCompanyList(data)
            }).catch((err)=>{
             
              console.log(err);
            })
        }).catch((err)=>{
          Swal.fire({  
            icon: 'error',  
            title: 'Oops...',  
            text: 'Something went wrong!',   
          }); 
        })
      }
    })
  };
  useEffect(()=>{
     getCompany() 
  },[])


  return (
    <Grid container spacing={2} sx={{p:3}} marginTop={400}>
        <Grid item xs={12}><Typography variant='h4'>Company List</Typography></Grid>
        <Grid item xs={10}>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Company ID</TableCell>
            <TableCell align="right">Company Name</TableCell>
            <TableCell align="right">Company Email</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {companyList.map((company,index) => (
            <TableRow
              key={company._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {company._id}
              </TableCell>
              <TableCell align="right">{company.companyName}</TableCell>
              <TableCell align="right">{company.companyEmail}</TableCell>
              <TableCell align="right">{company.blocked?<Box onClick={()=>{companyChangeStatus(company._id,company.blocked)}}><Typography style={{color:'red'}}>Blocked</Typography></Box>:<Box onClick={()=>{companyChangeStatus(company._id,company.blocked)}}><Typography style={{color:'green'}}>Active</Typography></Box>}</TableCell>
              <TableCell align="right"><Button variant="contained" color="secondary" onClick={()=>deleteCompany(company._id)}>Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Grid>
    </Grid>

  ) 
}

export default CompanyList
