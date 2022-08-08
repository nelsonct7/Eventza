import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

export const  sidebarClick=createAsyncThunk('click/adminClick',async(clickStatus)=>{
    try{
     return null   
    }catch(err){
        return null
    }
}) 

// <-----------------------------------------------------------------------------------------------------
const clickSlice=createSlice({
    name:'click',
    initialState:{
        showDash:true,
        showUser:false,
        showManager:false,
        showCompany:false,
        showReports:false,
        showPost:false
      },
      extraReducers:{
        [sidebarClick.pending]:(state,action)=>{
            state.showDash=false
        },
        [sidebarClick.fulfilled]:(state,action)=>{
        state.showDash=false
        state.showUser=false
        state.showManager=false
        state.showCompany=false
        state.showReports=false
        state.showPost=false
        state[action.meta.arg]=true 
        },
        [sidebarClick.rejected]:(state,action)=>{
            state.showDash=true
        }
      }
})


export default clickSlice.reducer