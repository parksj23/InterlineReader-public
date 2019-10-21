const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const keys = require('../config/keys');
const url = keys.mongoURI;

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