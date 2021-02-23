const express = require("express");
const router = express.Router();
const db = require('../../../database');

router.get("/getMainText", async (req, res) => {
    db.get().collection('STORIES').find({ lesson: req.query.lesson.toString()}).toArray()
        .then((result) => {
            res.json(result);
        }).catch(() => {
        res.status(400).send('An error occurred in the database.');
    });
});

router.get("/getNewVocab", async (req, res) => {
    db.get().collection('NEW_VOCABULARY').find({ lesson: req.query.lesson.toString()}).toArray()
        .then((result) => {
            res.json(result);
        }).catch(() => {
        res.status(400).send('An error occurred in the database.');
    });
});

router.get("/getNewHanjaCombos", (req, res) => {
    db.get().collection('NEW_HANJA_COMBO').find({}).toArray()
        .then((result) => {
            res.json(result);
        }).catch(() => {
        res.status(400).send('An error occurred in the database.');
    });
});

router.get("/getAboutNewBusu", (req, res) => {
    db.get().collection('ABOUT_NEW_BUSU').find({}).toArray()
        .then((result) => {
            res.json(result);
        }).catch(() => {
        res.status(400).send('An error occurred in the database.');
    });
});

module.exports = router;
