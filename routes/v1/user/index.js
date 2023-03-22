const express = require("express");

const controller = require("../../../app/controller/User");

const isAuth = require("../../../middleware/isAuth")
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

const router = express.Router();

router.get("/listing", controller.getAllUser);

router.post("/add", controller.addUser);
router.put("/edit/:userId", controller.editUser);
router.get("/details/:userId");
router.delete("/delete/:userId", controller.deleteUser);

router.post("/verifyAddress",isAuth, upload.single('fileUploaded') , controller.verifyAddress);

router.post("/givePermissionCache" , controller.givePermissionCache);

module.exports = router;