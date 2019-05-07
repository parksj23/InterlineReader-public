const express = require('express');
const router = express.Router();
const passport = require('passport');

const catchErrors = require('../../helpers/catchErrors');
const analytics = require('../../controllers/analytics');

// @route   GET api/stories/current
// @desc    Return current story
// @access  Private
// router.get(
// 	'/current',
// 	passport.authenticate('jwt', { session: false }, story.getCurrentStory)
// );

router.get('/userActivity', (req, res) => analytics.getUserActivity(req.query, res));
router.get('/mostFrequentGrammar', (req, res) => analytics.getMostFrequentGrammar(req.query, res));

router.get('/:class/:story/grammarSearch/', (req, res) => analytics.getAnalyticsGrammarSearch(req, res));
router.put('/addSessions', (req,res ) => analytics.addGrammarSearchSession(req.body,res));

module.exports = router;