import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import * as api from '../api' 

export const addEventVendor=createAsyncThunk('event/addEventVendor',async({formData})=>{
    try{
        const responce=await api.addEvent(formData)
        return responce.data
    }catch(err){
        return
    }
} )
export const getEventByVendorId=createAsyncThunk('event/getEventByVendorId',async({vendorId})=>{
    try{
        const responce=await api.getEventByVendorId(vendorId)
        return responce.data
    }catch(err){
        return
    }
} )
//<---------------------------------------------------------------------------------------------------------------
const eventSlice=createSlice({
    name:'event',
    initialState:{
        allEvents:[],
        vendorEvents:[],
        error:"",
        loading:false,
    },
    extraReducers:{

        [addEventVendor.pending]:(state,action)=>{
            state.loading=true
            state.error='' 
        },
        [addEventVendor.fulfilled]:(state,action)=>{
            state.loading=false
            console.log(action.payload);
            state.allEvents.push(action.payload)
            state.vendorEvents.push(action.payload)
        },
        [addEventVendor.rejected]:(state,action)=>{
            state.loading=false
            state.error='Authentication failed'
        },
        [getEventByVendorId.pending]:(state,action)=>{
            state.loading=true
            state.error='' 
        },
        [getEventByVendorId.fulfilled]:(state,action)=>{
            state.loading=false
            console.log(action.payload);
            state.vendorEvents=action.payload
        },
        [getEventByVendorId.rejected]:(state,action)=>{
            state.loading=false
            state.error='Authentication failed'
        },
    }
})
export default eventSlice.reducer