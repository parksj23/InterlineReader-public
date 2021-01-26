const express = require('express');
const router = express.Router();
const path = require("path");

// @route   GET api/users/about/getLogo
// @desc    Serve up interline logo
// @access  Public
router.get("/getLogo", async (req,res,next) => {
    res.setHeader('Content-Type', 'image/svg+xml');
    res.sendFile(path.join(__dirname, "../public/images/ILReader_Logo.svg"));
    next();
});

module.exports = router;