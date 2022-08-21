const router=require("express").Router()
const ConversationModel=require('../models/conversationModel')

//new conversation
router.post("/",async(req,res)=>{
    const newConversation= new ConversationModel({
        members:[req.body.senderId,req.body.recieverId]
    })
    try{
        const savedConversation=await newConversation.save();
        res.status(200).json(savedConversation)
    }catch(err){
        res.status(500).json(err)
    }
})


//get Conversation of a user
router.get("/:userId",async(req,res)=>{
    try{
        const conversation=await ConversationModel.find({
            members:{$in:[req.params.userId]},
        })
        if(conversation){
            res.status(200).json(conversation);
        }else{
            res.status(404).json('No data found')
        }
    }catch(err){
        res.status(500).json(err)
    }
})
// get conversation include userId
router.get('/find/:firstUserId/:secondUserId',async(req,res)=>{
    try{
        const conversation=await ConversationModel.findOne({
            members:{$all:[req.params.firstUserId, req.params.secondUserId]}
        })
        if(conversation){
            res.status(200).json(conversation) 
        }else{
            const newConversation= new ConversationModel({
                members:[req.params.firstUserId,req.params.secondUserId]
            })
            try{
                const savedConversation=await newConversation.save();
                res.status(200).json(savedConversation)
            }catch(err){
                res.status(500).json(err)
            }
        }
         
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports=router