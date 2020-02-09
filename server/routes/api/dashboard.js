const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const keys = require('../../config/keys');
const url = keys.mongoURI;
const databaseName = keys.databaseName;

router.get("/", async (req, res, next) => {
    try {
        MongoClient.connect(url, async function (err, client) {
            let allStories ={};
            const db = client.db(databaseName);
            const findAllStories = () => {
                return new Promise((resolve,reject) => {
                    db.collection(`STORY_LIST`).find().toArray(function (err, documents) {
                        if (err) reject(err);
                        allStories = documents;
                        resolve(allStories);
                    });
                });
            };
            const findStorySummaries = (listOFStories) => {
              return new Promise((resolve, reject) => {
                let storyNames = []
                listOFStories.map(aStory => {
                  storyNames.push({storyName: aStory.storyName})
                })
                let query = {
                  $or: storyNames
                }
                
                db.collection(`STORY_KR_SUM`).find(query).toArray(function (err, result) {
                  if (err) reject(err);
                  const allStorySummary = []
                  result.map(aDoc => {
                    
                    let storyResult = listOfStories.filter(aStory => aStory.storyName === aDoc.storyName)[0];
                    storyResult = {...storyResult, ...aDoc, _id: aDoc._id.toString()}
                    allStorySummary.push(storyResult)
                  })
                  resolve(allStorySummary);
                })
              })
            }
            var listOfStories = await findAllStories();
            var result = await findStorySummaries(listOfStories);
            res.send(result);
            client.close();
        })
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;


