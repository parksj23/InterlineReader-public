const express = require("express");
const router = express.Router();
const WordPower = require('../../../controllers/wordPower');

router.post('/createWordPower', WordPower.createWordPower);
router.post('/createYemun', WordPower.createYemun);
router.get('/list', WordPower.list);

module.exports = router;
