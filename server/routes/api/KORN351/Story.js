const express = require("express");
const router = express.Router();
const Story = require('../../../controllers/story');

router.post('/create', Story.createStory);
router.put('/saveMainText', Story.saveMainText);
router.put('/saveKoreanText', Story.saveKoreanText);
router.put('/saveExampleSentence', Story.saveExampleSentence);
router.put('/saveOthers', Story.saveOthers);
router.get('/getMainText', Story.getMainText);

module.exports = router;
