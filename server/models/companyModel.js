const mongoose = require ('mongoose')
const bcrypt=require('bcrypt')

const companySchema=mongoose.Schema(
    {
        companyName:{
            type:String,
            required:true
        },
        companyEmail:{
            type:String,
            required:true,
            unique:true
        },
        companyPassword:{
            type:String,
            required:true
        },
        blocked:{
            type:Boolean,
            required:true,
            default:true
        },
        userRoll:{
            type:String,
            required:true,
            default:"company"
        },
        profilepicture:{
            url:String,
            require:false,
            default:""
        },
        coverpicture:{
            url:String,
            require:false,
            default:""
        },
        desc:{
            type:String,
            required:false,
        }, 
        city: {
            type: String,
            max: 50,
          },
        from: {
            type: String,
            max: 50, 
          },
          followers:{
            type:Array,
            default:[]
        },
    },
    {
        timestamps:true
    }
)

companySchema.pre('save',async function(next){
    if(!this.isModified("companyPassword")){
        next() 
    }
    const salt=await bcrypt.genSalt(10);
    this.companyPassword=await bcrypt.hash(this.companyPassword,salt)
});

companySchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.companyPassword)
}

const CompanyModel=mongoose.model('CompanyModel',companySchema);

module.exports=CompanyModel 