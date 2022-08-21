const asynchandler = require('express-async-handler');
const CompanyModel = require('../models/companyModel');
const generateTocken = require('../utils/generateTocken');
const jwt=require('jsonwebtoken')

const registerCompany = asynchandler(async (req, res) => {
    const {
        companyName,
        companyEmail,
        companyPassword,
    } = req.body

    const companyExist = await CompanyModel.findOne({
        companyEmail
    });

    if (companyExist) {
        res.status(400)
        throw new Error('User Already exist')
    } else {
        const company = await CompanyModel.create({
            companyName,
            companyEmail,
            companyPassword,
        })

        if (company) {
            tockenCompany=generateTocken(company._id)
            res.cookie('companyTocken',tockenCompany,{ maxAge: 9000000, httpOnly: false})
            res.status(201).json({
                _id: company._id,
                companyName,
                companyEmail,
                tocken: tockenCompany,
                desc:company.desc,
                city:company.city,
                from:company.from,
            })
            
        } else {
            res.status(400).json({message:'Company not created'})
            throw new Error('User not created..')
        }
    }

})

const authCompany = asynchandler(async (req, res) => {
    const {
        companyEmail,
        companyPassword
    } = req.body;
    const company = await CompanyModel.findOne({
        companyEmail
    });
    
    if (company && company.blocked != true && (await company.matchPassword(companyPassword))) {
        tockenCompany=generateTocken(company._id)
        res.cookie('companyTocken', tockenCompany,{ maxAge: 9000000, httpOnly: false})
        res.json({
            companyName: company.companyName,
            companyEmail: company.companyEmail,
            _id: company._id,
            tocken: tockenCompany,
            profilepicture:company.profilepicture,
            coverpicture:company.coverpicture,
            desc:company.desc,
            city:company.city,
            from:company.from,
        })
        } else {
        res.status(400).json({message:'Company authrntication failed'})
        throw new Error('Invalid User')
    }

})

const tockenValidator=async(req,res)=>{
        const jwtTocken=req.body.vendorTocken
      
        const verified=jwt.verify(jwtTocken,process.env.JWT_KEY)
        const vendorId=verified.id
        if(verified){
            const company = await CompanyModel.findOne({
                _id:vendorId
            });
            res.status(201).json({
                companyName: company.companyName,
                companyEmail: company.companyEmail,
                _id: company._id,
                tocken: jwtTocken,
                profilepicture:company.profilepicture,
                coverpicture:company.coverpicture,
                desc:company.desc,
                city:company.city,
                from:company.from,
            })
        }else{
            res.status(400).json({
                message:'Validation Failed'
            })
        }
}

const uploadImages=async(req,res)=>{
    try{ 
        const profilePic=req.files.profilepicture[0].filename
        const coverPic=req.files.coverpicture[0].filename
        const imgData=await CompanyModel.findByIdAndUpdate(req.params.vendorId,{
            profilepicture:profilePic,
            coverpicture:coverPic
        })
        res.status(200).json({Success:"Image Uploaded Success fully"})

    }catch(err){
        res.status(500).json({err:"Server Error"})
    }
} 

const getVendor=async(req,res)=>{
    try{
        const vendorId=req.params.vendorId
        const company = await CompanyModel.findById(vendorId);
        if(company){
        res.status(201).json({
            companyName: company.companyName,
            companyEmail: company.companyEmail,
            _id: company._id,
            profilepicture:company.profilepicture,
            coverpicture:company.coverpicture,
            desc:company.desc,
            city:company.city,
            from:company.from,
        })
        }else{
            res.status(404).json({err:"Resource not found"})
        }
    }catch(err){
        res.status(500).json(err)
    }
}

const getAllVendors=async(req,res)=>{
    try{
        const vendorList=await CompanyModel.find()
            if(vendorList){
                res.status(200).json(vendorList)
                }else{
                    res.status(400).json({message:'Vendor List error'})  
                }
    }catch(err){
        res.status(500).json({err:"Server Error"})
    }
}

const updateDetails=async(req,res)=>{
    try{
        await CompanyModel.findByIdAndUpdate(req.params.vendorId,{
            userName:req.body.companyName,
            desc:req.body.desc,
            city:req.body.city,
            from:req.body.from,
        },{upsert: true}).then((data)=>{   
            res.status(200).json({msg:"Successfull"}) 
        }).catch((err)=>{
            res.status(404).json({msg:"User Not Found"})
        })
    }catch(err){
        res.status(500).json({err:"Server Error"})
    }
}
 
const updateProfilePic=async(req,res)=>{
    console.log('ggggggg');
    console.log(req.file);
    const profilePic=req.file?.filename
    try{
        await CompanyModel.findByIdAndUpdate(req.params.vendorId,{
            profilepicture:profilePic
        }).then((data)=>{
            res.status(200).json({Success:"Image Uploaded Success fully"})
        }).catch((err)=>{
            res.status(404).json({msg:"Resource not found"})
        })
        
    }catch(err){
        res.status(500).json({err:"Server Error"})
    }
} 

const updateCoverPic=async(req,res)=>{
    console.log("ffffffff");
    console.log(req.file);
    const coverPic=req.file?.filename 
    try{
        await CompanyModel.findByIdAndUpdate(req.params.vendorId,{
            coverpicture:coverPic
        }).then((data)=>{
            res.status(200).json({Success:"Image Uploaded Success fully"})
        }).catch((err)=>{
            res.status(404).json({msg:"Resource not found"})
        })
    }catch(err){
        res.status(500).json({err:"Server Error"})
    }
}

module.exports = {
    registerCompany,
    authCompany,
    tockenValidator,
    uploadImages,
    getVendor,
    getAllVendors,
    updateDetails,
    updateProfilePic,
    updateCoverPic
};