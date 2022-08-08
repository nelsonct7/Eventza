const express = require('express');
const router = express.Router();
const {authCompany,registerCompany,tockenValidator,uploadImages,getVendor}=require('../controllers/vendorcontroller')


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

router.route('/login').post(authCompany)
router.route('/signup').post(registerCompany)
router.route('/tockenvalidator').post(tockenValidator)
router.route('/getVendorById/:vendorId').get(getVendor)
router.route('/uploadimages/:vendorId').put(
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