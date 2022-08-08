const mongoose=require('mongoose')

const MessageSchema=new mongoose.Schema({
conversationId:{
    type:String,
},
senderId:{
    type:String,
},
senderName:{
    type:String,
},
senderType:{
    type:String,
},
text:{
    type:String
}
},
{
    timestamps:true
})

const MessageModel=mongoose.model('MessageModel',MessageSchema)

module.exports=MessageModel