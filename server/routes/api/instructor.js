const express = require("express");
const router = express.Router();
const instructor = require("../../controllers/instructor");
// @route   GET api/stories/current
// @desc    Return current story
// @access  Private
// router.get(
// 	'/current',
// 	passport.authenticate('jwt', { session: false }, story.getCurrentStory)
// );

router.get("/", (req, res, next) => {
  instructor.initialize(req, res, next);
});

router.put("/addStory", (req, res, next) => {
  instructor.addNewStory(req.body, res, next);
});
router.put("/addStoryInfo", (req, res, next) => {
  instructor.addStoryInfo(req.body, res, next);
});

router.get("/getStories", (req, res, next) => {
  instructor.getAllStories(req, res, next);
});

router.get("/getVocab", (req, res, next) => {
  instructor.getVocabulary(req.body, res, next);
});

router.put("/renameCollection", (req, res, next) => {
  instructor.renameCollections(req.body, res, next);
});

router.put("/editVocab/saveVocab", (req, res, next) => {
  instructor.saveVocab(req.body, res, next);
});

router.put("/editVocab/updateVocab", (req, res, next) => {
  instructor.updateVocab(req.body, res, next);
});

router.put("/editVocab/addVocab", (req, res, next) => {
  instructor.addVocab(req.body, res, next);
});

router.put("/editGrammar/addGrammar", (req, res, next) => {
  instructor.addGrammar(req.body, res, next);
});

router.put("/editVocab/deleteVocab", (req, res, next) => {
  instructor.deleteVocab(req.body, res, next);
});

router.put("/editGrammar/updateGrammar", (req, res, next) => {
  instructor.updateGrammar(req.body, res, next);
});

router.put("/editGrammar/deleteGrammar", (req, res, next) => {
  instructor.deleteGrammar(req.body, res, next);
});

router.get("/midkr-gram", (req, res, next) => {
  instructor.getMiddleKRGram(req, res, next);
});

router.put("/midkr-gram", (req,res,next) => {
  instructor.updateMiddleKoreanGrammar(req.body, res, next);
});

router.delete("/midkr-gram", (req, res, next) => {
  instructor.deleteMiddleKoreanGrammer(req.body, res, next);
})

router.get("/midkr-voc", (req, res, next) => {
  instructor.getMiddleKRVoc(req, res, next);
});

router.put("/midkr-voc", (req,res,next) => {
  instructor.updateMiddleKoreanVoc(req.body, res, next);
});

router.delete("/midkr-voc", (req, res, next) => {
  instructor.deleteMiddleKoreanVoc(req.body, res, next);
})

module.exports = router;
