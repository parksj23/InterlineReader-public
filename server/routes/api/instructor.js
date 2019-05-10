const express = require('express');
const router = express.Router();
const instructor = require('../../controllers/instructor');
// @route   GET api/stories/current
// @desc    Return current story
// @access  Private
// router.get(
// 	'/current',
// 	passport.authenticate('jwt', { session: false }, story.getCurrentStory)
// );


router.put('/addStory', (req,res, next) => {
  instructor.addNewStory(req.body,res, next)

})
router.put('/addStoryInfo', (req,res, next) => {
  instructor.addStoryInfo(req.body, res, next);
})

router.get('/getStories', (req,res, next) => {
  instructor.getAllStories(req,res, next);
})

module.exports = router;