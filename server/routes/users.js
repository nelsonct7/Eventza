var express = require('express');
var router = express.Router();
const asynchandler =require('express-async-handler');
const jwt=require('jsonwebtoken')
const {registerUser,authUser,tockenValidator,followUser,unfollowUser,getUser,getAllUser,uploadImages} = require('../controllers/userController')

const multer = require("multer");
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "profilepicture") {
      cb(null, "./public/profile-images")
    }
    else if (file.fieldname === "coverpicture") {
      cb(null, "./public/cover-images");
    }
    //cb(null, "./public/profile-images");
  },
  filename: function (req, file, callback) {
    if (file.fieldname === "profilepicture") {
      callback(null, "profile_image-" + Date.now() + ".jpeg");
    }
    else if (file.fieldname === "coverpicture") {
      callback(null, "cover_image-" + Date.now() + ".jpeg");
    }
    
  },
});

const profileImgStore = multer({ storage : imageStorage })

const verifyUser=asynchandler((req,res,next)=>{
  
  const jwtUserTocken=req.cookies.userTocken
  const verified=jwt.verify(jwtUserTocken,process.env.JWT_KEY,(err,user)=>{
    if(err){
      res.status(500)
      throw new Error('Tocken miss match')
    }else{
      next()
    }
  })
}) 

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.route('/signup').post(registerUser)
router.route('/login').post(authUser)
router.route('/tockenValidator').post(tockenValidator)
router.route('/follow/:id').put(followUser)
router.route('/unfollow/:id').put(unfollowUser)
router.route('/getUserById/:userId').get(getUser) 
router.route('/getAllUsers').get(getAllUser)
router.route('/uploadimages/:userId').put(
                                      profileImgStore.fields(
                                        [
                                            {
                                                name:'profilepicture',
                                                maxCount:1
                                            },
                                            {
                                                name: 'coverpicture',
                                                maxCount:1
                                            },
                                        ]
                                      )
                                      ,uploadImages)

module.exports = router;
 