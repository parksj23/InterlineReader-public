const express = require('express');
const router = express.Router();
const cleaner = require('../../controllers/cleaner');

const catchErrors = require('../../helpers/catchErrors');

// @route   GET api/users/cleaner/getLogo
// @desc    Serve up interline logo
// @access  Public
router.get("/getLogo", catchErrors(cleaner.serveLogo));
module.exports = router;