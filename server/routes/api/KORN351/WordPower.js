const express = require("express");
const router = express.Router();
const WordPower = require('../../../controllers/wordPower');

router.post('/createWordPower', WordPower.createWordPower);
router.post('/createYemun', WordPower.createYemun);
router.put('/:id', WordPower.updateWordPower);
router.delete('/:id', WordPower.deleteWordPower);
router.put('/yemun/:id', WordPower.updateYemun);
router.delete('/yemun/:id', WordPower.deleteYemun);
router.post('/createWordPower', WordPower.createWordPower);
router.get('/list', WordPower.list);

module.exports = router;
