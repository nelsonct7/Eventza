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
                tocken: tockenCompany
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
    console.log(JSON.stringify(req.body))
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
            coverpicture:company.coverpicture
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
                coverpicture:company.coverpicture
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
        console.log(company);
        if(company){
        res.status(201).json({
            companyName: company.companyName,
            companyEmail: company.companyEmail,
            _id: company._id,
            profilepicture:company.profilepicture,
            coverpicture:company.coverpicture
        })
        }else{
            res.status(404).json({err:"Resource not found"})
        }
    }catch(err){
        res.status(500).json(err)
    }
}

module.exports = {
    registerCompany,
    authCompany,
    tockenValidator,
    uploadImages,
    getVendor
};