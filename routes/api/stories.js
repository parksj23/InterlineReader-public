const express = require('express');
const router = express.Router();
const passport = require('passport');

const catchErrors = require('../../helpers/catchErrors');
const story = require('../../controllers/stories');

// @route   GET api/stories/current
// @desc    Return current story
// @access  Private
// router.get(
// 	'/current',
// 	passport.authenticate('jwt', { session: false }, story.getCurrentStory)
// );

router.get('/sonagi', (req, res) => story.getVocAndGram(req, res));

module.exports = router;