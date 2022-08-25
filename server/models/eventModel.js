const mongoose=require('mongoose');

const eventSchema=mongoose.Schema(
    {   
        eventName:{
            type:String,
            required:true
        },
        eventType:{
            type:String,
            required:true
        },
        eventDate:{
            type:String,
            required:true
        },
        companyName:{
            type:String,
            required:true
        },
        companyId:{
            type:String,
        },
        posterImage:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        }
    },
    {
        timestamps:true
    }
)

const EventModel=mongoose.model('EventModel',eventSchema);

module.exports=EventModel
