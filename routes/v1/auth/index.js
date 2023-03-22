const express = require("express");

const controller = require("../../../app/controller/Auth");
const validate = require("../../../middleware/validate");
const userSchema = require("../../../app/validation_schema/user_schema");
const loginSchema = require("../../../app/validation_schema/login_schema");

const router = express.Router();

const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images')
    },
    filename: function (req, file, cb) {
        console.log(file)
      cb(null, 'image_test -' + Date.now() + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

router.post("/Signup", validate(userSchema), controller.signUp);

router.post("/login",validate(loginSchema), controller.login);

router.post("/verificationEmail", controller.verification_email);

router.post("/verificationIdentity",upload.single('image'), controller.verificationIdentity);


//router.post("/forgetPassword/:userId", controller.forgetPassword);

module.exports = router;