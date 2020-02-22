const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const keys = require('../config/keys');
const url = keys.mongoURI;
const ObjectID = require("mongodb").ObjectID;
const databaseName = keys.databaseName;

exports.initialize = (req,res,next) => {
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
      var result = await findAllStories();
      client.close();
      res.send(result);
    })
  }
  catch (err) {
    next(err);
  }
}
 
exports.addNewStory = (req, res) => {

  const {text, storyInfo} = req;
  if (text && storyInfo) {
    MongoClient.connect(url, function (err, client) {
        if (err) throw err;
        var dbo = client.db(databaseName);
        var query = {
          language: text[0].language
        }
        dbo.collection(`TEXT_${storyInfo.storyName.toUpperCase()}`).deleteMany(query).then(success => {
          if(success){
            dbo.collection(`TEXT_${storyInfo.storyName.toUpperCase()}`).insertMany(text).then(success => {
              res.json({
                status: 200
              });
            })
          }
          else{
            res.json({
              status: 500,
              message: "Error updating story"
            });
          }
          dbo.close();
        })
    })
  }
  else {
    res.json({
      status: 500,
      message: "Text or StoryInfo is null"
    })
  }
}

exports.addStoryInfo = (req, res) => {
  if (req) {
    let {language, storyName, instructor, region, createdDate, lastUpdated} = req.storyInfo;
    let query = {
      storyName,
      class: req.storyInfo.class,
      instructor,
      region
    }

    let storyInfo = {
      ...query,
      createdDate,
      lastUpdated
    }
    console.log(query);
    MongoClient.connect(url, function (err, client) {
      if (err) throw err;
      var dbo = client.db(databaseName);
      dbo.collection(`STORY_LIST`).find(query).toArray(function (err, document) {
          if (document.length === 0) {
            let languages = []
            languages.push(language)
            storyInfo["languages"] = languages
            dbo.collection(`STORY_LIST`).insertOne(storyInfo).then(success => {
              if (success.result.ok) {
                res.json({
                  status: 'success'
                });
                client.close();
              }
              else {
                res.json({
                  status: 'failed to save to database'
                });
                client.close();
              }
            });
          }
          else {
            let oldDoc = document[0]
            delete oldDoc._id;
            let languages = oldDoc.languages;
            if(languages.indexOf(language) === -1) languages.push(language)
            oldDoc["languages"] = languages
            dbo.collection(`STORY_LIST`).replaceOne(query,oldDoc, {upsert:true}).then(success => {
              if (success.result.ok) {
                res.json({  
                  status: 'success'
                });
                client.close();
              }
              else {
                res.json({
                  status: 'failed - story already exist!'
                });
                client.close();
              }
            }).catch(err => {
              console.log(err)
            });
            client.close();
          }
        }
      )
    })
  }
}

exports.getAllStories = (req, res) => {
  let allStories = {};
  try {
    return new Promise((resolve, reject) => {
      MongoClient.connect(url, function (err, client) {
        if (err) throw err;
        var dbo = client.db(databaseName);
        var query = {};
        dbo.collection(`STORY_LIST`).find(query).toArray(function (err, documents) {
          if (err) throw err;
          allStories = documents;
          res.json(allStories)
          client.close();
        });
      });
    })
  } catch (err) {
    console.log(err);
  }
}

exports.renameCollections = (req,res) => {
  MongoClient.connect(url, function (err, client) {
      if (err) throw err;
      let dbo = client.db(databaseName);
      console.log(req)
      let oldName = req.oldName;
      let newName = oldName.substring(9)
    dbo.renameCollection(`${oldName}`,`${newName}`).then(err => {
      client.close();
    })
     /* dbo.collection(oldName).rename(newName, function (err, newColl) {
        if(err) console.log(err)
        res.json({
          status: "ok"
        })
        client.close()
      })*/
    }
  )
}

exports.getVocabulary = (req,res) => {
  MongoClient.connect(url, async function(err,client){
    if(err) throw err;
    let db = client.db('testdb')
    let storyInfo = req.storyInfo
    const findStoryVocab = () => {
      return new Promise((resolve, reject) => {
        db.collection(`${storyInfo.storyTitle}_VOC`).find().toArray(function (err, voc_result) {
          if (err) reject(err)
          resolve(voc_result)
        })
      })
    }
    const vocabList = await findStoryVocab();
    client.close();
    res.send({
      status: "200OK",
      vocabList
    })
  })
}

exports.getGrammar = (req,res) => {
  MongoClient.connect(url, async function(err,client){
    if(err) throw err;
    let db = client.db('testdb')
    let storyInfo = req.storyInfo
    const findStoryGrammar = () => {
      return new Promise((resolve, reject) => {
        db.collection(`${storyInfo.storyTitle}_GRAM`).find().toArray(function (err, voc_result) {
          if (err) reject(err)
          resolve(voc_result)
        })
      })
    }
    const GrammarList = await findStoryGrammar();
    client.close();
    res.send({
      status: "200OK",
      GrammarList
    })
  })
}

exports.addVocab =(req, res, next) => {
  MongoClient.connect(url, async function (err, client) {
    if (err) throw err;
    var dbo = client.db(databaseName);
    let {vocab, storyTitle} = req

    // TODO - Get order of vocab from story and insert id in correct place to preserve ordering
    // TODO - insert entry into VOC_MODKRs 
    let storyIdquery = {
      storyName: storyTitle
    }
    
    
    dbo.collection(`STORY_LIST_COPY`).find(storyIdquery).toArray(function(err, storyResult) {
      if(err) throw(err);
      if(storyResult.length === 0) throw(`Cannot find story for storyTitle: ${storyTitle}`);
      console.log("StoryResult: ")
      console.log(storyResult[0])
      let storyId = storyResult[0]._id;
      let vocabOrderQuery = {
        storyId
      }
      let vocabQuery = {
        korean: vocab.korean
      }
      console.log(vocab)

      dbo.collection(`VOC_MODKR_ALL_COPY`).find(vocabQuery).toArray(function(err, vocabResult) {
        if(err) throw(err);
        console.log(vocabResult)
        let newVocabEntry
        if(vocabResult.length === 0) {
          newVocabEntry = vocab
          let storyList = [];
          storyList.push(storyId)
          newVocabEntry["storyList"] = storyList;
          newVocabEntry["createdDate"] = new Date();
          newVocabEntry["lastUpdated"] = new Date();
        }
        else {
          newVocabEntry = vocabResult[0]
          newVocabEntry = {
            ...newVocabEntry,
            ...vocab,
            lastUpdated: new Date()
          }
        }

        console.log(newVocabEntry)
        dbo.collection('VOC_MODKR_ALL_COPY').updateOne(vocabQuery, {$set: newVocabEntry}, {upsert: true}, function(erro, result) {
          dbo.collection(`VOC_MODKR_ALL_COPY`).find(vocabQuery).toArray(function(err, vocabResult) {
            if(err) throw(err);
            console.log("vocabResult: ")
            console.log(vocabResult[0])
            let vocabId = vocabResult[0]._id
            dbo.collection(`VOC_MODKR_ORDER_COPY`).find(vocabOrderQuery).toArray(function(err, orderResult) {
              if(err) throw(err)
              if(orderResult.length === 0) reject(`Cannot find order data`);
              console.log("OrderResult: ")
              console.log(orderResult[0])
              let order = orderResult[0].orderArray
              order.push(vocabId)
              dbo.collection(`VOC_MODKR_ORDER_COPY`).updateOne(vocabOrderQuery, {order: order}, function(err, result){
                if(err) throw err
                res.send({
                  vocab
                })
              })
            })
          })
        })
      })
    })
  })
}

exports.addGrammar =(req, res, next) => {
  MongoClient.connect(url, async function (err, client) {
    if (err) throw err;
    var dbo = client.db(databaseName);
    let {grammar, storyTitle} = req

    dbo.collection(`${storyTitle.toUpperCase()}_GRAM`).updateMany({"order_id": {$gte:grammar.order_id}}, {$inc:{"order_id": 1}}, function(err, result){
      if (err) throw err
      dbo.collection(`${storyTitle.toUpperCase()}_GRAM`).insertOne(grammar, function(err,result){
        if(err) throw err
        res.send({
          grammar
        })
      })
    })
  })
}

exports.updateVocab =(req,res,next) => {
  MongoClient.connect(url, async function (err, client) {
    if (err) throw err;
    var dbo = client.db(databaseName);
    let {vocab} = req
    let query = {
      "_id": ObjectID(vocab._id)
    }

    let updatedDocument  = {
      "korean": vocab.korean,
      "hanja": vocab.hanja,
      "english": vocab.english
    }
    dbo.collection(`VOC_MODKR_ALL`).updateOne(query, {$set: updatedDocument}, function(err, result){
        if(err) throw err
        res.send({
          vocab
        })
        client.close();
    })
  })
}

exports.deleteVocab = (req, res, next) => {
  MongoClient.connect(url, async function (err, client) {
    if (err) throw err;
    var dbo = client.db(databaseName);
    let {vocab, storyTitle} = req
    let query = {
      "_id": ObjectID(vocab._id)
    }
    dbo.collection(`${storyTitle.toUpperCase()}_VOC`).deleteOne(query, function (err, result) {
      if (err) throw err
      console.log(result)
      res.send({
        vocab
      })
      client.close();
    })
  })
}

exports.updateGrammar =(req,res,next) => {
  MongoClient.connect(url, async function (err, client) {
    if (err) throw err;
    var dbo = client.db(databaseName);
    let {grammar} = req
    let query = {
      "_id": ObjectID(grammar._id)
    }

    let updatedDocument  = {
      "sentence": grammar.sentence,
      "pattern": grammar.pattern,
      "here": grammar.here
    }
    dbo.collection(`GRAM_MODKR_ALL`).updateOne(query, {$set: updatedDocument}, function(err, result){
      if(err) throw err
      res.send({
        grammar
      })
      client.close();
    })
  })
}

exports.deleteGrammar = (req, res, next) => {
  MongoClient.connect(url, async function (err, client) {
    if (err) throw err;
    var dbo = client.db(databaseName);
    let {grammar, storyTitle} = req
    let query = {
      "_id": ObjectID(grammar._id)
    }
    dbo.collection(`${storyTitle.toUpperCase()}_GRAM`).deleteOne(query, function (err, result) {
      if (err) throw err
      res.send({
        grammar
      })
      client.close();
    })
  })
}