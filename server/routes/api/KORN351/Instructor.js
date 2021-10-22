const express = require("express");
const router = express.Router();
const db = require('../../../database');
const ObjectID = require('mongodb').ObjectID;

router.put("/saveMainText", async (req, res) => {
    const {lesson, mainText} = req.body.params;

    let myquery = { lesson: lesson };
    let newvalues = { $set: {text: mainText } };

    db.get().collection('stories').findOneAndUpdate(myquery, newvalues).then(() => {
        res.status(200).send('success');
    });
});

router.put("/saveExampleSentence", async (req, res) => {
    const {lesson, exSentences} = req.body.params;

    let myquery = { lesson: lesson };
    let newvalues = { $set: {exampleSentences: exSentences } };

    db.get().collection('STORIES').updateOne(myquery, newvalues).then(() => {
        res.status(200).send('success');
    });
});

router.put("/addNewExampleSentence", async (req, res) => {
    const {lesson, exSentences} = req.body.params;

    let myquery = { lesson: lesson };
    let newvalues = { $push: {exampleSentences:  exSentences } };

    db.get().collection('STORIES').updateOne(myquery, newvalues).then(() => {
        res.status(200).send('success');
    });
});

router.put("/deleteExampleSentence", async (req, res) => {
    const {lesson, id} = req.body.params;

    let myquery = { lesson: lesson };
    let pull = { $pull: { exampleSentences: { _id:  id } } };

    db.get().collection('STORIES').updateOne(myquery, pull).then(() => {
        res.status(200).send('success');
    });
});

router.put("/saveOthers", (req, res, next) => {
    const {lesson, subHeading, content} = req.body.params;

    let myquery = { lesson: lesson };
    let newvalues = { $set: {others: {subHeading: subHeading, content: content} } };

    db.get().collection('STORIES').updateOne(myquery, newvalues).then(() => {
        res.status(200).send('success');
    });
});

router.put("/saveAboutNewBusu", (req, res, next) => {
    const {lesson, id, word, def, busu, descr, examples} = req.body.params;

    let myquery = { lesson: lesson, _id: ObjectID(id) };
    let newvalues = { $set: {word: word, def: def, busu: busu, description: descr, examples: examples } };

    db.get().collection('ABOUT_NEW_BUSU').updateOne(myquery, newvalues).then(() => {
        res.status(200).send('success');
    });
});
router.put("/deleteAboutNewBusu", (req, res, next) => {
    const {lesson, id} = req.body.params;

    let myquery = { lesson: lesson, _id: ObjectID(id) };

    db.get().collection('ABOUT_NEW_BUSU').deleteOne(myquery, () => {
        res.status(200).send('success');
    });
});

router.put("/saveNewPhonetic", (req, res, next) => {
    const {lesson, id, phonetic, pronunciation, characters, subPronunciation, subCharacters} = req.body.params;

    let myquery = { lesson: lesson, _id: ObjectID(id) };
    let newvalues = { $set: {phonetic: phonetic, pronunciation: pronunciation, characters: characters} };

    if (subPronunciation.length !== 0)
        newvalues = { $set: {phonetic: phonetic, pronunciation: pronunciation, characters: characters, sub_pronunciation: subPronunciation, sub_characters: subCharacters} };

    db.get().collection('PHONETICS').updateOne(myquery, newvalues).then(() => {
        res.status(200).send('success');
    });
});
router.put("/deleteNewPhonetic", (req, res, next) => {
    const {lesson, id} = req.body.params;

    let myquery = { lesson: lesson, _id: ObjectID(id) };

    db.get().collection('PHONETICS').deleteOne(myquery).then(() => {
        res.status(200).send('success');
    });
});

router.put("/saveNewHanjaCombo", (req, res, next) => {
    const {lesson, id, hanja, kor, eng} = req.body.params;

    let myquery = { lesson: lesson, _id: ObjectID(id) };
    let newvalues = { $set: {hanja: hanja, kor: kor, eng: eng} };

    db.get().collection('NEW_HANJA_COMBO').updateOne(myquery, newvalues).then(() => {
        res.status(200).send('success');
    });
});
router.put("/deleteNewHanjaCombo", (req, res, next) => {
    const {lesson, id} = req.body.params;

    let myquery = { lesson: lesson, _id: ObjectID(id) };

    db.get().collection('NEW_HANJA_COMBO').deleteOne(myquery).then(() => {
        res.status(200).send('success');
    });
});

router.put("/saveSideBarVocab", (req, res, next) => {
    const {lesson, mainText, exSentences} = req.body.params;

    let myquery = { lesson: lesson };
    let newvalues = { $set: {mainText: mainText, exSentences: exSentences} };

    db.get().collection('NEW_VOCABULARY').updateOne(myquery, newvalues).then(() => {
        res.status(200).send('success');
    });
});

router.put("/saveCharacter", (req, res, next) => {
    const {lesson, id, additionalHoonMeaning, characterStrokeCount, eum, hanja, hoonEum, meaning, phonetic, primaryHoonMeaning, radical, radicalHangul, radicalStrokeCount, totalStrokeCount} = req.body.params;

    let myquery = { lesson: lesson, _id: ObjectID(id) };
    let newvalues = { $set: {additionalHoonMeaning: additionalHoonMeaning, characterStrokeCount: characterStrokeCount
            , eum: eum, hanja: hanja, hoonEum: hoonEum, meaning: meaning, phonetic: phonetic, primaryHoonMeaning: primaryHoonMeaning
            , radical: radical, radicalHangul: radicalHangul, radicalStrokeCount: radicalStrokeCount, totalStrokeCount: totalStrokeCount} };

    db.get().collection('CHARACTERS').updateOne(myquery, newvalues).then(() => {
        res.status(200).send('success');
    });
});
router.put("/deleteCharacter", (req, res, next) => {
    const {lesson, id} = req.body.params;

    let myquery = { lesson: lesson, _id: ObjectID(id) };

    db.get().collection('CHARACTERS').deleteOne(myquery).then(() => {
        res.status(200).send('success');
    });
});

router.put("/savePhonetic", (req, res, next) => {
    const {lesson, id, characters, phonetic, pronunciation, sub_pronunciation, sub_characters} = req.body.params;

    let myquery = { lesson: lesson, _id: ObjectID(id) };
    let newvalues = { $set: {characters: characters, phonetic: phonetic, pronunciation: pronunciation} };
    if (sub_characters.length !== 0)
        newvalues = { $set: {characters: characters, phonetic: phonetic, pronunciation: pronunciation, sub_pronunciation: sub_pronunciation, sub_characters: sub_characters} };

    db.get().collection('PHONETICS').updateOne(myquery, newvalues).then(() => {
        res.status(200).send('success');
    });
});
router.put("/deletePhonetic", (req, res, next) => {
    const {lesson, id} = req.body.params;

    let myquery = { lesson: lesson, _id: ObjectID(id) };

    db.get().collection('PHONETICS').deleteOne(myquery).then(() => {
        res.status(200).send('success');
    });
});

router.put("/saveRadical", (req, res, next) => {
    const {lesson, id, additionalHoonMeaning, characterStrokeCount, hoonEum, meaning, primaryHoonMeaning, radical, radicalHangul, radicalStrokeCount, totalStrokeCount} = req.body.params;

    let myquery = { lesson: lesson, _id: ObjectID(id) };
    let newvalues = { $set: {additionalHoonMeaning:additionalHoonMeaning, characterStrokeCount:characterStrokeCount, hoonEum:hoonEum, meaning:meaning,
            primaryHoonMeaning:primaryHoonMeaning, radical:radical, radicalHangul:radicalHangul, radicalStrokeCount:radicalStrokeCount, totalStrokeCount:totalStrokeCount} };

    db.get().collection('RADICALS').updateOne(myquery, newvalues).then(() => {
        res.status(200).send('success');
    });
});
router.put("/deleteRadical", (req, res, next) => {
    const {lesson, id} = req.body.params;

    let myquery = { lesson: lesson, _id: ObjectID(id) };

    db.get().collection('RADICALS').deleteOne(myquery).then(() => {
        res.status(200).send('success');
    });
});

module.exports = router;
