const mongoose=require('mongoose')

const ConversationSchema=new mongoose.Schema({
members:{
    type:Array,
},
},
{ 
    timestamps:true
})

const ConversationModel=mongoose.model('ConversationModel',ConversationSchema)

module.exports=ConversationModel