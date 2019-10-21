const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const keys = require('../../config/keys');
const url = keys.mongoURI;

router.get("/", async (req, res, next) => {
    try {
        MongoClient.connect(url, async function (err, client) {
            let allStories ={};
            const db = client.db("testdb");
            const findAllStories = () => {
                return new Promise((resolve,reject) => {
                    db.collection(`STORY_LIST`).find().toArray(function (err, documents) {
                        if (err) reject(err);
                        allStories = documents;
                        console.log(allStories)
                        resolve(allStories);
                    });
                });
            };
            var result = await findAllStories();
            client.close();
            res.send(result);
        })
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;


