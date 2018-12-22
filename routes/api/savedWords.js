const express = require('express');
const router = express.Router();
const passport = require('passport');

const catchErrors = require('../../helpers/catchErrors');
const savedWords = require('../../controllers/savedWords');

// @route   GET api/stories/current
// @desc    Return current story
// @access  Private
// router.get(
// 	'/current',
// 	passport.authenticate('jwt', { session: false }, story.getCurrentStory)
// );

router.get('/', (req, res) => {
  let params =  {
    userId: req.query.userId,
    story: req.query.story,
    savedWords: req.query.savedWords,
  }
  params["class"] = req.query.class
  savedWords.getSavedWords(params, res)
});

router.get('/getListOfSavedWords', (req, res) => {
  let params =  {
    userId: req.query.userId,
    story: req.query.story
  }
  savedWords.getListOfSavedWords(params, res)
});

router.put('/addSavedWord', (req,res) => {
  savedWords.addToSavedWords(req.body,res)

})

router.put('/deleteSavedWord', (req,res) => {
  savedWords.deleteSavedWords(req.body,res)

})

router.put('/updateSavedWords', (req,res) => {
  savedWords.updateSavedWords(req.body, res)
})

module.exports = router;