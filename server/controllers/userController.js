const asynchandler = require('express-async-handler');
const UserModel = require('../models/userModel');
const generateTocken = require('../utils/generateTocken');
const jwt=require('jsonwebtoken')

const registerUser = asynchandler(async (req, res) => {
    const {
        userName,
        userEmail,
        userPassword,
        userRoll
    } = req.body
    let blocked=false
    userRoll==="manager"?blocked=true:blocked=false

    const userExist = await UserModel.findOne({
        userEmail
    });

    if (userExist) {
        res.status(400)
        throw new Error('User Already exist')
    } else {
        const user = await UserModel.create({
            userName,
            userEmail,
            userPassword,
            userRoll,
            blocked
        })

        if (user) {
            tockenUser=generateTocken(user._id)
            res.cookie('userTocken',tockenUser,{ maxAge: 9000000, httpOnly: false})
            res.status(201).json({
                _id: user._id,
                userName, 
                userEmail,
                tocken: tockenUser,
                userRoll
            })
            
        } else {
            res.status(400)
            throw new Error('User not created..')
        }
    }

})

const authUser = asynchandler(async (req, res) => {
    const {
        userEmail,
        userPassword
    } = req.body;
    console.log(JSON.stringify(req.body))
    const user = await UserModel.findOne({
        userEmail
    });
    if (user && user.blocked != true && (await user.matchPassword(userPassword))) {
        tockenUser=generateTocken(user._id)
        res.cookie('userTocken',tockenUser,{ maxAge: 9000000, httpOnly: false})
        res.json({
            userName: user.userName,
            userEmail: user.userEmail,
            _id: user._id,
            tocken: tockenUser,
            userRoll:user.userRoll,
            profilepicture:user.profilepicture,
            coverpicture:user.coverpicture,
            followers:user.followers,
            followings:user.followings
        })
        } else {
        res.status(400)
        throw new Error('Invalid User')
    }

})

const tockenValidator=async(req,res)=>{
    const jwtTocken=req.body.userTocken
  
    const verified=jwt.verify(jwtTocken,process.env.JWT_KEY)
    const userId=verified.id
    if(verified){
        const user = await UserModel.findOne({
            _id:userId
        });
        res.status(201).json({
                userName: user.userName,
                userEmail: user.userEmail,
                _id: user._id,
                tocken: jwtTocken,
                userRoll:user.userRoll,
                profilepicture:user.profilepicture,
                coverpicture:user.coverpicture,
                followers:user.followers,
                followings:user.followings
        })
    }else{
        res.status(400).json({
            message:'Validation Failed'
        })
    }
}

const followUser=async(req,res)=>{
    console.log("User Dataa "+req.body.userId+" "+req.params.id);
    if(req.body.userId!==req.params.id){
        try{
            const user=await UserModel.findById(req.params.id);
            const currentUser=await UserModel.findById(req.body.userId)
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push:{followers:req.body.userId}})
                await currentUser.updateOne({$push:{followings:req.params.id}})
                res.status(200).json({msg:"User has been followed"})
            }else{
                res.status(403).json({err:"User has been already following"})
            }
        }catch(err){
            res.status(500).json({err:"Server error"})
        }
    }else{
        res.status(403).json({err:"You can not follow your self"})
    }
}

const unfollowUser=async(req,res)=>{
    if(req.body.userId!==req.params.id){
        try{
            const user=await UserModel.findById(req.params.id);
            const currentUser=await UserModel.findById(req.body.userId)
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull:{followers:req.body.userId}})
                await currentUser.updateOne({$pull:{followings:req.params.id}})
                res.status(200).json({msg:"User has been unfollowed"})
            }else{
                res.status(403).json({err:"Not following this user"})
            }
        }catch(err){
            res.status(500).json({err:"Server error"})
        }
    }else{
        res.status(403).json({err:"You can not unfollow your self"})
    }
}

const getUser=async(req,res)=>{
    const userId=req.params.userId
    try{
        const user = await UserModel.findOne({
            _id:userId
        });
        if(user){
            res.status(201).json({
                userName: user.userName,
                userEmail: user.userEmail,
                _id: user._id,
                userRoll:user.userRoll,
                profilepicture:user.profilepicture,
                coverpicture:user.coverpicture,
                followers:user.followers,
                followings:user.followings
        })
        }else{
            res.status(404).json({err:"Resource not found"})
        }
        
    }catch(err){
        res.status(500).json(err)
    } 
}

const getAllUser=async(req,res)=>{
    try{

    }catch(err){
        res.status(500).json({err:"Server Error"})
    }

}

const uploadImages=async(req,res)=>{
    try{ 
        const profilePic=req.files.profilepicture[0].filename
        const coverPic=req.files.coverpicture[0].filename
        const imgData=await UserModel.findByIdAndUpdate(req.params.userId,{
            profilepicture:profilePic,
            coverpicture:coverPic
        })
        res.status(200).json({Success:"Image Uploaded Success fully"})

    }catch(err){
        res.status(500).json({err:"Server Error"})
    }
} 

module.exports = {
    registerUser,
    authUser,
    tockenValidator,
    followUser,
    unfollowUser,
    getUser,
    getAllUser,
    uploadImages 
};