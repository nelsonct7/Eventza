const asynchandler = require('express-async-handler');
const PostModel = require('../models/postModel');
const generateTocken = require('../utils/generateTocken');
const jwt=require('jsonwebtoken')
const multer = require("multer");


const createPost=async(req,res)=>{
        let img=""
        if(req.file){
            img=req.file.filename
        }
        const{postCreator,creatorId,creatorType,post}=req.body
        try{
        const createdPost = await PostModel.create({
            postCreator,
            creatorId,
            creatorType,
            post, 
            postImage:img,
            postDate:new Date()
        })
        if(createdPost){
            res.status(200).json({Message:"Success"})
        }else{
            res.status(400).json({err:"Post not created"}) 
        }
    }catch(err){
        console.log(err);
        res.status(500).json({err:"Server Error"})
    }
        
}
const editPost=async(req,res)=>{
    const postId=req.params.id
    const{post}=req.body
    let img=""
        if(req.file){
            img=req.file.filename
        
        await PostModel.findByIdAndUpdate(postId,{post:post,postImage:img}).then((data)=>{
            res.status(200).json({postId:data._id})
        }).catch((err)=>{
            res.status(400)
        })
    }else{
        await PostModel.findByIdAndUpdate(postId,{post:post}).then((data)=>{
            res.status(200).json({postId:data._id})
        }).catch((err)=>{
            res.status(400)
        })
    }
    
    
}
const getPost=async(req,res)=>{
    const feeds=await PostModel.find({blocked:false}).sort({ _id : -1 })
    if(feeds){
        res.status(200).json({feeds})
    }else{
        res.status(400).json({err:'No feeds'}) 
    }
}

const getAdminPost=async(req,res)=>{
    const feeds=await PostModel.find({}).sort({postDate:-1})
    if(feeds){
        res.status(200).json({feeds})
    }else{ 
        res.status(400).json({err:'No feeds'}) 
    }
}

const deletePost=async(req,res)=>{
    const postId=req.params.id;
        await PostModel.findByIdAndDelete(postId).then((data)=>{
            res.status(204).json({data})
        }).catch((err)=>{
            res.status(400)
        })
} 

const changeStatus=async(req,res)=>{
    const postId=req.params.id;
    let stat=req.params.stat
    let stats=false
    if(stat==='true'){
        stats=false
    }else{
        stats=true
    }
    await PostModel.findByIdAndUpdate(postId,{blocked:stats}).then((data)=>{
        res.status(200).json({postId:data._id})
    }).catch((err)=>{
        res.status(400)
    })
}

const getPostImages=async(req,res)=>{
    const userId=req.params.id;
    const feeds=await PostModel.find({creatorId:userId,blocked:false,postImage:{$ne:''}}).sort({postDate:-1})
    if(feeds){
        res.status(200).json({feeds})
    }else{
        res.status(400).json({err:'No feeds'}) 
    }
}

const likePost=async(req,res)=>{
    try{
        const post=await PostModel.findById(req.params.id)
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push : {likes:req.body.userId}})
            res.status(200).json({msg:"Post Liked"})
        }else{
            await post.updateOne({$pull : {likes:req.body.userId}})
            res.status(200).json({msg:"Post Disliked"})
        }  
    }catch(err){
        res.status(500).json({err:"Server Error"})
    }
}

const getPostbyId=async(req,res)=>{
    try{
        const userId=req.params.userId;
        const feeds=await PostModel.find({creatorId:userId,blocked:false,}).sort({_id:-1})
    if(feeds){
        res.status(200).json({feeds})
    }else{
        res.status(400).json({err:'No feeds'}) 
    }
    }catch(err){
        res.status(500).json({error:"Server Error"})
    }
}
module.exports={ 
createPost,
editPost,
getPost,
deletePost,
changeStatus,
getAdminPost,
getPostImages,
likePost,
getPostbyId
}