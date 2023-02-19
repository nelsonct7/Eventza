const router=require("express").Router()
const MessageModel=require('../models/messageModel')

//add 
router.post('/',async(req,res)=>{
    const newMessage=new MessageModel(req.body)
    try{
        const savedMessage=await newMessage.save();
        res.status(200).json(savedMessage)
    }catch(err){
        res.status(500).json(err)
    }
})

//get  

router.get('/:conversationId',async(req,res)=>{
    try{
        const message=await MessageModel.find({
            conversationId:req.params.conversationId,
        })
        if(message){
            res.status(200).json(message)
        }else{
            res.status(400).json('No messages')
        }
    }catch(err){
        res.status(500).json(err)
    }
})



module.exports=router