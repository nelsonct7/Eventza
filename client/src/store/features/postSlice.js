import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import * as api from '../api' 

export const createPost=createAsyncThunk('post/createPost',async({formData},{rejectWithValue})=>{
    try{
        const uTocken=localStorage.getItem('userTocken')
        const vTocken=localStorage.getItem('vendorTocken')
        const tocken=uTocken?uTocken:vTocken
        // for (var key of formData.entries()) {
        //     console.log(key[0] + ', ' + key[1])
        //   }
        const responce=await api.createPost(formData)
        return 
    }catch(err){
        return rejectWithValue(err.responce.data)
    }
} )

export const updatePost=createAsyncThunk('post/updatePost',async({formData,postId},{rejectWithValue})=>{
    try{
        const uTocken=localStorage.getItem('userTocken')
        const vTocken=localStorage.getItem('vendorTocken')
        const tocken=uTocken?uTocken:vTocken
        // for (var key of formData.entries()) {
        //     console.log(key[0] + ', ' + key[1])
        //   }
        const responce=await api.editPost(formData,postId)
        return 
    }catch(err){
        return rejectWithValue(err.responce.data)
    }
} )

export const deletePost=createAsyncThunk('post/deletePost',async({postId},{rejectWithValue})=>{
    try{
        const uTocken=localStorage.getItem('userTocken')
        const vTocken=localStorage.getItem('vendorTocken')
        const tocken=uTocken?uTocken:vTocken
        // for (var key of formData.entries()) {
        //     console.log(key[0] + ', ' + key[1])
        //   }
        const responce=await api.deletePost(postId)
        return 
    }catch(err){
        return rejectWithValue(err.responce.data)
    }
} )

export const changeStatus=createAsyncThunk('post/changeStatus',async({postId,stat},{rejectWithValue})=>{
    try{
        const uTocken=localStorage.getItem('userTocken')
        const vTocken=localStorage.getItem('vendorTocken')
        const tocken=uTocken?uTocken:vTocken
        // for (var key of formData.entries()) {
        //     console.log(key[0] + ', ' + key[1])
        //   }
        const responce=await api.changeStatus(postId,stat)
        return 
    }catch(err){
        return rejectWithValue(err.responce.data)
    }
} )

export const getPosts=createAsyncThunk('post/getpost',async({},{rejectWithValue})=>{
    try{
        const uTocken=localStorage.getItem('userTocken')
        const vTocken=localStorage.getItem('vendorTocken')
        const tocken=uTocken?uTocken:vTocken
        // for (var key of formData.entries()) {
        //     console.log(key[0] + ', ' + key[1])
        //   }
        const responce=await api.getPost()
        return responce
    }catch(err){
        return rejectWithValue(err.responce.data)
    }
} )

export const likePosts=createAsyncThunk('post/likepost',async({id,userId},{rejectWithValue})=>{
    try{
        const uTocken=localStorage.getItem('userTocken')
        const vTocken=localStorage.getItem('vendorTocken')
        const tocken=uTocken?uTocken:vTocken
        // for (var key of formData.entries()) {
        //     console.log(key[0] + ', ' + key[1])
        //   }
        const responce=await api.likePost(id,userId)
        return responce
    }catch(err){
        return rejectWithValue(err.responce.data)
    }
} )



//<-----------------------------------------------------------------------------------------------------------------
const postSlice=createSlice({
    name:'post',
    initialState:{
        posts:"",
        error:"",
        loading:false,
    },
    extraReducers:{

        [createPost.pending]:(state,action)=>{
            state.loading=true
            state.posts=""
            state.error='' 
        },
        [createPost.fulfilled]:(state,action)=>{
            state.loading=false
            state.posts="created"
        },
        [createPost.rejected]:(state,action)=>{
            state.loading=false
            state.error='Post Creation failed'
        },
        [updatePost.pending]:(state,action)=>{
            state.loading=true
            state.error=''
            state.posts=""
        },
        [updatePost.fulfilled]:(state,action)=>{
            state.loading=false
            state.posts=""
            state.posts="updated"
        },
        [updatePost.rejected]:(state,action)=>{
            state.loading=false
            state.error='Post Creation failed'
        },
        [deletePost.pending]:(state,action)=>{
            state.loading=true
            state.error=''
            state.posts=""
        },
        [deletePost.fulfilled]:(state,action)=>{
            state.loading=false
            
            state.posts="deleted"
        },
        [deletePost.rejected]:(state,action)=>{
            state.loading=false
            state.error='Post Creation failed'
        },
        [changeStatus.pending]:(state,action)=>{
            state.loading=true
            state.posts=""
            state.error=''
        },
        [changeStatus.fulfilled]:(state,action)=>{
            state.loading=false
            state.posts=""
            state.posts="statusChanged"
        },
        [changeStatus.rejected]:(state,action)=>{
            state.loading=false
            state.error='Post Creation failed'
        },
        [getPosts.pending]:(state,action)=>{
            state.loading=true
            state.posts=""
            state.error=''
        },
        [getPosts.fulfilled]:(state,action)=>{
            state.loading=false
            state.posts=""
            state.posts="statusChanged"
        },
        [getPosts.rejected]:(state,action)=>{
            state.loading=false
            state.error='Post Creation failed'
        },
        [likePosts.pending]:(state,action)=>{
            state.loading=true
            state.posts=""
            state.error=''
        },
        [likePosts.fulfilled]:(state,action)=>{
            state.loading=false
            state.posts=""
            state.posts="statusChanged"
        },
        [likePosts.rejected]:(state,action)=>{
            state.loading=false
            state.error='Post Creation failed'
        },
        
    }
})

export default postSlice.reducer