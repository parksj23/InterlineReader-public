const express = require('express');
const router = express.Router();
const analytics = require('../../controllers/analytics');

// @route   GET api/stories/current
// @desc    Return current story
// @access  Private
// router.get(
// 	'/current',
// 	passport.authenticate('jwt', { session: false }, story.getCurrentStory)
// );

router.get('/userActivity', (req, res, next) => analytics.getUserActivity(req.query, res, next));
router.get('/mostFrequentGrammar', (req, res, next) => analytics.getMostFrequentGrammar(req.query, res, next));

router.get('/:class/:story/grammarSearch/', (req, res, next) => analytics.getAnalyticsGrammarSearch(req, res, next));
router.put('/addSessions', (req,res,next ) => analytics.addGrammarSearchSession(req.body,res,next));

module.exports = router;