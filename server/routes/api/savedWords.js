const express = require('express');
const router = express.Router();
const savedWords = require('../../controllers/savedWords');

// @route   GET api/stories/current
// @desc    Return current story
// @access  Private
// router.get(
// 	'/current',
// 	passport.authenticate('jwt', { session: false }, story.getCurrentStory)
// );

router.get('/', (req, res, next) => {
  let params =  {
    userId: req.query.userId,
    story: req.query.story,
    savedWords: req.query.savedWords,
    storyClass: req.query.storyClass
  }
  savedWords.getSavedWords(params, res, next)
});

router.get('/getListOfSavedWords', (req, res, next) => {
  let params =  {
    userId: req.query.userId,
    storyId: req.query.storyId
  }
  savedWords.getListOfSavedWords(params, res, next)
});

router.put('/addSavedWord', (req,res, next) => {
  savedWords.addToSavedWords(req.body,res, next)

})

router.put('/deleteSavedWord', (req,res, next) => {
  savedWords.deleteSavedWords(req.body,res, next)

})

router.put('/updateSavedWords', (req,res, next) => {
  savedWords.updateSavedWords(req.body, res, next)
})

module.exports = router;