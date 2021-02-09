const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const keys = require('../../../config/keys');
const url = keys.mongoURI;
const databaseName = keys.databaseName;
/**
 * @swagger
 * /story:
 *  get:
 *    tags:
 *      - Stories
 *    name: Story Information
 *    summary: Get information on a specific story
 *    consumes:
 *      application/json
 *    produces:
 *      -application/json
 *    parameters:
 *      - in: query
 *        name: storyTitle
 *        schema:
 *          type: string
 *        required:
 *          - storyTitle
 *    responses:
 *      '200':
 *        description: Stories Retrieved from database
 *      '500':
 *        description: Internal Server Error
 *
 */
router.get('/', async (req, res, next) => {
  let storyTitle = req.query.storyTitle.toUpperCase();
  try {
    MongoClient.connect(url, async function (err, client) {
      const db = client.db(databaseName);
      if (err) throw err;
      let query = {storyName: storyTitle.toLowerCase()};
      const findStoryInfo = () => {
        return new Promise((resolve, reject) => {
          db.collection(`STORY_KR_SUM`).find(query).limit(1).toArray(function (err, story_info) {
            if (err) reject(err);
            let storyInfo = story_info[0];
            if(storyInfo) {
              storyInfo._id = storyInfo._id.toString()
              resolve(storyInfo)
            }
            reject("Error Fetching Story Information")
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
            let orderList = []
            if(order_result && order_result.length > 0) {
              let tmpOrderList =  order_result[0].order
              tmpOrderList.sort((a,b) => a.order_id - b.order_id)
              tmpOrderList.forEach(aVocab => orderList.push(aVocab.vocabId))
              order_result[0].order = orderList;
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
          db.collection(`GRAM_${language}_ORDER`).find({$query: query, $orderby: {order_id: 1}}).toArray(function (err, order_result) {
            if (err) reject(err)
            if(order_result && order_result.length > 0) {
              let tmpOrderList =  order_result[0].order
              let orderList = []
              tmpOrderList.sort((a,b) => a.order_id - b.order_id)
              tmpOrderList.map(aVocab => orderList.push(aVocab.grammarId))
              order_result[0].order = orderList;
              resolve(order_result[0])
            }
            else resolve()
          })
        })
      }
      const findStoryVocab = (language, storyId) => {
        return new Promise((resolve, reject) => {
          let query = {
            storyList: {$all: [`${storyId}`]}
          }
          console.log("Vocab List query")
          console.log(query.storyList)
          db.collection(`VOC_${language}_ALL`).find(query).toArray(function (err, result) {
            if (err) reject(err)
            if(result && result.length > 0) resolve(result)
            else resolve([])
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
            else resolve([])
          })
        })
      }
      findStoryInfo().then(storyInfo => {
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
      }).catch(error => {
        res.status(503).send(error)
      });
    });
  } catch (err) {
    next(err)
  }
});

/**
 * @swagger
 * /story/storyText:
 *  get:
 *    tags:
 *      - Stories
 *    name: Detailed Story Information
 *    summary: Get Detailed information on a specific story
 *    consumes:
 *      -application/json
 *    produces:
 *      -application/json
 *    parameters:
 *      - in: query
 *        name: _id
 *        schema:
 *          type: string
 *      - in: query
 *        name: authorKorn
 *        schema:
 *          type: string
 *      - in: query
 *        name: authorRom
 *        schema:
 *          type: string
 *      - in: query
 *        name: titleKorn
 *        schema:
 *          type: string
 *      - in: query
 *        name:  titleRom
 *        schema:
 *          type: string
 *      - in: query
 *        name: titleEng
 *        schema:
 *          type: string
 *      - in: query
 *        name: storyName
 *        schema:
 *          type: string
 *      - in: query
 *        name: languages
 *        schema:
 *          type: array
 *          items:
 *            type: string
 *    responses:
 *      '200':
 *        description: Stories Retrieved from database
 *      '500':
 *        description: Internal Server Error
 *
 */
router.get('/storyText', async (req, res, next) => {
  let storyInfo = req.query;
  storyInfo.languages = storyInfo.languages.split(",")
  let storyName = storyInfo.storyName.toUpperCase();
  try {
    MongoClient.connect(url, async function (err, client) {
      if (err) throw err;
      const db = client.db(databaseName);
      const results = {}
      const findStory = (aLanguage) => {
        let query = {
          language: aLanguage
        }

        return new Promise((resolve, reject) => {
          db.collection(`TEXT_${storyName}`).find(query).sort({order_id: 1}).toArray(function (err, story_result) {
            if (err) reject(err);
            if (story_result && story_result.length > 0) resolve(story_result);
            else resolve([])
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
      var db = client.db(databaseName);
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

router.put('/updateLine', async (req, res, next) => {
  let lineToUpdate = req.body; //storyName, _id, text
    try {
        MongoClient.connect(url, async function (err, client) {
            if (err) throw err;
            let db = client.db(databaseName);
            let collection = 'TEXT_' + lineToUpdate.storyName.toUpperCase();

            const updateLine = () => {
                return new Promise((resolve, reject) => {
                    db.collection(collection).updateOne(
                        {_id : ObjectId(lineToUpdate._id)},
                        { $set: { "text" : lineToUpdate.text } }
                    ).then(() => resolve()).catch(() => reject())
                })
            };

            const line = await updateLine();

            client.close();
            res.send({
                line
            })
        })
    }
    catch (err) {
        next(err)
    }
});

module.exports = router;