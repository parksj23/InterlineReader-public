const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const keys = require('../config/keys');
const url = keys.mongoURI;

exports.addNewStory = (req, res) => {

  const {text, storyInfo} = req;
  if (text && storyInfo) {
    MongoClient.connect(url, function (err, client) {
      if (err) throw err;
      var dbo = client.db("ubcreadertesting");
      dbo.collection(`KORN${storyInfo.class}_${storyInfo.storyName.toUpperCase()}_STORY_${storyInfo.language.toUpperCase()}`).deleteMany().then(success => {
        if (success.result.ok) {
          dbo.collection(`KORN${storyInfo.class}_${storyInfo.storyName.toUpperCase()}_STORY_${storyInfo.language.toUpperCase()}`).insertMany(text).then(success => {
            res.json({
              status: 200
            });
          })
        }
        else
          {
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
      MongoClient.connect(url, function (err, client) {
        if (err) throw err;
        var dbo = client.db("ubcreadertesting");
        dbo.collection(`KORN410B_STORY_LIST`).find(req).toArray(function (err, document) {
            if (document.length === 0) {
              dbo.collection(`KORN410B_STORY_LIST`).insertOne(req.storyInfo).then(success => {
                if (success.result.ok) {
                  res.json({
                    status: 'success'
                  });
                  client.close();
                }
                else {
                  res.json({
                    status: 'fail'
                  });
                  client.close();
                }
              });
            }
            else {
              res.json({
                status: 'fail - Story already exist'
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
          var dbo = client.db("ubcreadertesting");
          var query = {};
          dbo.collection(`KORN410B_STORY_LIST`).find(query).toArray(function (err, documents) {
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