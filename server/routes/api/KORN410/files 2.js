const express = require("express");
const router = express.Router();
const files = require("../../../controllers/files");

router.get('/', (req,res,next) => {
  files.getFiles(req,res,next);
})
router.post("/signedUrl", (req,res,next) => {
  files.getSignedURL(req, res, next);
});

router.put("/file", (req,res,next) => {
  files.addFile(req,res,next);
})
module.exports = router;
