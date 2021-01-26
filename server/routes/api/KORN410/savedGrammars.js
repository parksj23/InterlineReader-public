const express = require('express');
const router = express.Router();
const savedGrammars = require('../../../controllers/savedGrammars');

// @route   GET api/stories/current
// @desc    Return current story
// @access  Private
// router.get(
// 	'/current',
// 	passport.authenticate('jwt', { session: false }, story.getCurrentStory)
// );

router.get('/', (req, res, next) => {
    savedGrammars.getSavedGrammars(req.query, res, next)
});

router.get('/getListOfSavedGrammars', (req, res, next) => {
    let params =  {
        userId: req.query.userId,
        storyId: req.query.storyId
    }
    savedGrammars.getListOfSavedGrammars(params, res, next)
});

router.put('/updateSavedGrammars', (req,res, next) => {
    savedGrammars.updateSavedGrammars(req.body, res, next)
})

module.exports = router;