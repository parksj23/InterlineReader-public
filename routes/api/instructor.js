const express = require('express');
const router = express.Router();
const passport = require('passport');

const catchErrors = require('../../helpers/catchErrors');
const instructor = require('../../controllers/instructor');
// @route   GET api/stories/current
// @desc    Return current story
// @access  Private
// router.get(
// 	'/current',
// 	passport.authenticate('jwt', { session: false }, story.getCurrentStory)
// );


router.put('/addStory', (req,res) => {
  instructor.addNewStory(req.body,res)

})
router.put('/addStoryInfo', (req,res) => {
  instructor.addStoryInfo(req.body, res);


})

module.exports = router;