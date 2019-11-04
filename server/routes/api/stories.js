const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const keys = require('../../config/keys');
const url = keys.mongoURI;

// @route   GET api/stories/current
// @desc    Return current story
// @access  Private
// router.get(
// 	'/current',
// 	passport.authenticate('jwt', { session: false }, story.getCurrentStory)
// );

router.get('/:story', async (req, res, next) => {
    let storyTitle = req.query.storyTitle.toUpperCase();
    try {
        MongoClient.connect(url, async function (err, client) {
            const db = client.db("testdb");
            if (err) throw err;
            let query = {storyName: storyTitle.toLowerCase()};

            const findStoryInfo = () => {
                return new Promise((resolve, reject) => {
                    db.collection(`STORY_LIST`).find(query).limit(1).toArray(function (err, story_info) {
                        if (err) reject(err);
                        resolve(story_info[0])
                    })
                })
            }
            const findStoryVocab = () => {
                return new Promise((resolve, reject) => {
                    db.collection(`${storyTitle.toUpperCase()}_VOC`).find().toArray(function (err, voc_result) {
                        if (err) reject(err)
                        resolve(voc_result)
                    })
                })
            }
            const findStoryGrammar = () => {
                return new Promise((resolve, reject) => {
                    db.collection(`${storyTitle}_GRAM`).find().toArray(function (err, gram_result) {
                        if (err) reject(err)
                        resolve(gram_result)
                    })
                })
            }

            const storyInfo = await findStoryInfo();
            const vocab = await findStoryVocab();
            const grammar = await findStoryGrammar();
            client.close();
            res.send({
                vocab,
                grammar,
                storyInfo
            })
        });
    } catch (err) {
        next(err)
    }
});

router.get('/:story/storyText', async (req, res, next) => {
    let storyInfo = JSON.parse(req.query.storyInfo);
    let storyName = storyInfo.storyName.toUpperCase();
    try {
        MongoClient.connect(url, async function (err, client) {
            if (err) throw err;
            const db = client.db("testdb");
            const query = {};

            const findStoryKorean = () => {
                return new Promise((resolve, reject) => {
                    db.collection(`${storyName}_STORY_KOREAN`).find(query).toArray(function (err, story_result_korean) {
                        if (err) reject(err);
                        resolve(story_result_korean);
                    })
                })
            }
            const findStoryEnglish = () => {
                return new Promise((resolve, reject) => {
                    db.collection(`${storyName}_STORY_ENGLISH`).find(query).toArray(function (err, story_result_english) {
                        if (err) reject(err);
                        resolve(story_result_english)
                    })
                })
            }
            const findStoryMiddleKorean = () => {
            return new Promise((resolve, reject) => {
              db.collection(`${storyName}_STORY_MIDDLEKOREAN`).find(query).toArray(function (err, story_result_middleKorean) {
                if (err) reject(err);
                resolve(story_result_middleKorean)
              })
            })
          }
            const findStoryHanmun = () => {
            return new Promise((resolve, reject) => {
              db.collection(`${storyName}_STORY_HANMUN`).find(query).toArray(function (err, story_result_Hanmun) {
                if (err) reject(err);
                resolve(story_result_Hanmun)
              })
            })
          }

            const storyTextKorn = await findStoryKorean();
            const storyTextEngl = await findStoryEnglish();
            const storyTextMidKorean = await findStoryMiddleKorean();
            const storyTextHanmun = await findStoryHanmun();

            client.close();
            res.send({
                storyTextKorn,
                storyTextEngl,
                storyTextMidKorean,
                storyTextHanmun
            })
        })
    }
    catch(err){
        next(err)
    }
});

router.get('/:story/storyInfo', async (req, res, next) =>{
    let story = req.query.story;
    try{
        MongoClient.connect(url, async function (err, client) {
            if (err) throw err;
            var db = client.db("testdb");
            var query = {storyName: story};

            const findStoryInfo = () => {
                return new Promise((resolve,reject) => {
                    db.collection(`STORY_LIST`).find(query).limit(1).toArray(function (err, story_info) {
                        if(err) reject(err)
                        resolve(story_info)
                    })
                })
            }

            const storyInfo = await findStoryInfo();
            client.close();
            res.send({
                storyInfo
            })
        })
    }
    catch(err) {next(err)}
});

module.exports = router;