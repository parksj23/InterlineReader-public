const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
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
      const db = client.db("interlineReaderTestDb");
      if (err) throw err;
      let query = {storyName: storyTitle.toLowerCase()};
      const findStoryInfo = () => {
        return new Promise((resolve, reject) => {
          db.collection(`STORY_KR_SUM`).find(query).limit(1).toArray(function (err, story_info) {
            if (err) reject(err);
            let storyInfo = story_info[0];
            storyInfo._id = storyInfo._id.toString()
            resolve(storyInfo)
          })
        })
      }
      const findVocabOrder = (language, storyId) => {
        return new Promise((resolve, reject) => {
          let query = {
            storyId: `${storyId}`
          }
          db.collection(`VOC_${language}_ORDER`).find(query).toArray(function (err, order_result) {
            if (err) reject(err)
            if(order_result && order_result.length > 0) {
              resolve(order_result[0])
            }
            else resolve()
          })
        })
      }
      const findGrammarOrder = (language,storyId) => {
        return new Promise((resolve, reject) => {
          let query = {
            storyId: `${storyId}`
          }
          db.collection(`GRAM_${language}_ORDER`).find(query).toArray(function (err, order_result) {
            if (err) reject(err)
            if(order_result && order_result.length > 0) resolve(order_result[0])
            else resolve()
          })
        })
      }
      const findStoryVocab = (language, storyId) => {
        return new Promise((resolve, reject) => {
          let query = {
            storyList: {$all: [`${storyId}`]}
          }
          db.collection(`VOC_${language}_ALL`).find(query).toArray(function (err, result) {
            if (err) reject(err)
            if(result && result.length > 0) resolve(result)
            else resolve()
          })
        })
      }
      const findStoryGrammar = (language, storyId) => {
        return new Promise((resolve, reject) => {
          let query = {
            storyList: {$all: [`${storyId}`]}
          }
          db.collection(`GRAM_${language}_ALL`).find(query).toArray(function (err, gram_result) {
            if (err) reject(err)
            if(gram_result && gram_result.length > 0) resolve(gram_result)
            else resolve()
          })
        })
      }
      const storyInfo = await findStoryInfo();
      let storyId = storyInfo._id;
      let languages = storyInfo.languages;
      let results = {
        storyInfo
      };
      const findAllStoryInfoForLanguage = async (aLanguageCode, storyId) => {
        results[`${aLanguageCode}`] = {}
          let vocabOrder = await findVocabOrder(aLanguageCode, storyId)
          let grammarOrder = await findGrammarOrder(aLanguageCode, storyId)
          let vocabList = await findStoryVocab(aLanguageCode, storyId)
          let grammarList = await findStoryGrammar(aLanguageCode,storyId)

          results[`${aLanguageCode}`] = {
            vocabOrder,
            grammarOrder,
            vocabList,
            grammarList
          }
        }
      Promise.all(languages.map(aLanguageCode => findAllStoryInfoForLanguage(aLanguageCode, storyId)
      )).then(resp => {
        client.close();
        res.send(results)
    }).catch(err => {
        console.log(err)
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
      const db = client.db("interlineReaderTestDb");
      const results = {}
      const findStory = (aLanguage) => {
        let query = {
          language: aLanguage
        }

        return new Promise((resolve, reject) => {
          db.collection(`TEXT_${storyName}`).find(query).sort({order_id: 1}).toArray(function (err, story_result) {
            if (err) reject(err);
            if (story_result && story_result.length > 0) resolve(story_result);
            else resolve({})
          })
        })
      }
      const findStoryWrapper = async (aLanguageCode) => {
        let storyText = await findStory(aLanguageCode);
        results[`${aLanguageCode}`] = storyText
      }
      let languages = storyInfo.languages
      Promise.all(languages.map(aLanguageCode => findStoryWrapper(aLanguageCode))).then(resp => {
        client.close();
        res.send(results)
      });
    })
  }
  catch(err){
  next(err)
  }
})

router.get('/:story/storyInfo', async (req, res, next) => {
  let story = req.query.story;
  try {
    MongoClient.connect(url, async function (err, client) {
      if (err) throw err;
      var db = client.db("testdb");
      var query = {storyName: story};

      const findStoryInfo = () => {
        return new Promise((resolve, reject) => {
          db.collection(`STORY_LIST`).find(query).limit(1).toArray(function (err, story_info) {
            if (err) reject(err)
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
  catch (err) {
    next(err)
  }
});

module.exports = router;