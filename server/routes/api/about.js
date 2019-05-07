const express = require('express');
const router = express.Router();
const about = require('../../controllers/about');

const catchErrors = require('../../helpers/catchErrors');

// @route   GET api/users/about/getLogo
// @desc    Serve up interline logo
// @access  Public
router.get(
  "/getLogo",
  catchErrors(about.serveLogo));

module.exports = router;