const express = require("express");
const router = express.Router();
const db = require('../../../database');

router.get("/getCharacters", async (req, res) => {
    db.get().collection('CHARACTERS').find({}).toArray()
        .then((result) => {
            res.json(result);
        }).catch(() => {
        res.status(400).send('An error occurred in the database.');
    });
});

router.get("/getRadicals", (req, res) => {
    db.get().collection('RADICALS').find({}).toArray()
        .then((result) => {
            console.log('getRadicals', result);
            res.json(result);
        }).catch(() => {
        res.status(400).send('An error occurred in the database.');
    });
});

router.get("/getNewBusu", (req, res) => {
    db.get().collection('NEW_BUSU').find({}).toArray()
        .then((result) => {
            console.log('getNewBusu', result);
            res.json(result);
        }).catch(() => {
        res.status(400).send('An error occurred in the database.');
    });
});

router.get("/getPhonetics", (req, res) => {
    db.get().collection('PHONETICS').find({}).toArray()
        .then((result) => {
            res.json(result);
        }).catch(() => {
        res.status(400).send('An error occurred in the database.');
    });
});

router.get("/getEumFilters", (req, res) => {
    db.get().collection('META_DATA').find({dataType: "eum_filter"}).toArray()
        .then((result) => {
            res.json(result);
        }).catch(() => {
        res.status(400).send('An error occurred in the database.');
    });
});

module.exports = router;
