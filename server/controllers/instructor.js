const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const keys = require('../config/keys');
const url = keys.mongoURI;
const ObjectID = require("mongodb").ObjectID

exports.initialize = (req,res,next) => {
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
}

exports.addNewStory = (req, res) => {

  const {text, storyInfo} = req;
  if (text && storyInfo) {
    MongoClient.connect(url, function (err, client) {
        if (err) throw err;
        var dbo = client.db("testdb");
        dbo.collection(`${storyInfo.storyName.toUpperCase()}_STORY_${storyInfo.language.toUpperCase()}`).deleteMany().then(success => {
          if (success.result.ok) {
            dbo.collection(`${storyInfo.storyName.toUpperCase()}_STORY_${storyInfo.language.toUpperCase()}`).insertMany(text).then(success => {
              res.json({
                status: 200
              });
            })
          }
          else {
            res.json({
              status: 'fail'
            });
          }
          client.close()
        });
      }
    )
  }
}

exports.addStoryInfo = (req, res) => {
  if (req) {
    let language = req.storyInfo.language
    delete req.storyInfo.language

    MongoClient.connect(url, function (err, client) {
      if (err) throw err;
      var dbo = client.db("testdb");
      dbo.collection(`STORY_LIST`).find(req.storyInfo).toArray(function (err, document) {

          if (document.length === 0) {
            req.storyInfo[language] = true
            dbo.collection(`STORY_LIST`).insertOne(req.storyInfo).then(success => {
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
            let updateField = {}
            updateField[language] = true
            dbo.collection(`STORY_LIST`).replaceOne(oldDoc, {$set: updateField}, {upsert:true}).then(success => {
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
        var dbo = client.db("testdb");
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
      let dbo = client.db("testdb");
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
    var dbo = client.db("testdb");
    let {vocab, storyTitle} = req

    dbo.collection(`${storyTitle.toUpperCase()}_VOC`).updateMany({"order_id": {$gte:vocab.order_id}}, {$inc:{"order_id": 1}}, function(err, result){
      if (err) throw err
      console.log(result)
      dbo.collection(`${storyTitle.toUpperCase()}_VOC`).insertOne(vocab, function(err,result){
        if(err) throw err
        res.send({
          vocab
        })
      })
    })

    /*dbo.collection(`${storyTitle.toUpperCase()}_VOC`).remove({}, function (err, result) {
      if (err) throw err
      vocabList.map((aDoc) => {
        delete aDoc["_id"];
      })
      console.log("VocabList: ")
      console.log(vocabList.length)
      dbo.collection(`${storyTitle.toUpperCase()}_VOC`).insertMany(vocabList, function (err, result) {
        if (err) throw err
        res.send({
          status: "OK",
          vocabList: vocabList
        });
        client.close();
      })
    });*/


    /*dbo.createCollection(`${storyTitle.toUpperCase()}_VOC`, function(err,result){
        dbo.collection(`${storyTitle.toUpperCase()}_VOC_COPY`).find({}).toArray(function(err, result){
          dbo.collection(`${storyTitle.toUpperCase()}_VOC`).insertMany(result, function(err, result){
            console.log(result)
          })
        })
      })*/
  })
}

exports.updateVocab =(req,res,next) => {
  MongoClient.connect(url, async function (err, client) {
    if (err) throw err;
    var dbo = client.db("testdb");
    let {vocab, storyTitle} = req
    let query = {
      "_id": ObjectID(vocab._id)
    }

    let updatedDocument  = {
      "korean": vocab.korean,
      "hanja": vocab.hanja,
      "english": vocab.english,
      "order_id": vocab.order_id
    }
    dbo.collection(`${storyTitle.toUpperCase()}_VOC`).updateOne(query, {$set: updatedDocument}, function(err, result){
        if(err) throw err
      console.log(result)
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
    var dbo = client.db("testdb");
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
    var dbo = client.db("testdb");
    let {grammar, storyTitle} = req
    let query = {
      "_id": ObjectID(grammar._id)
    }

    let updatedDocument  = {
      "sentence": grammar.sentence,
      "pattern": grammar.pattern,
      "here": grammar.here,
      "order_id": grammar.order_id
    }
    dbo.collection(`${storyTitle.toUpperCase()}_GRAM`).updateOne(query, {$set: updatedDocument}, function(err, result){
      if(err) throw err
      res.send({
        grammar
      })
      client.close();
    })
  })
}