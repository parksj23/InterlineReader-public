const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const keys = require('../config/keys');
const url = keys.mongoURI;

exports.addNewStory =(req,res) => {
  const {language, text} = req;
  if (text && language) {

    MongoClient.connect(url, function (err, client) {
      if (err) throw err;
      var dbo = client.db("ubcreadertesting");
      dbo.collection(`KORN410_POKTEKPANG_STORY_${language.toUpperCase()}`).deleteMany().then(success => {
        if(success.result.ok){
          dbo.collection(`KORN410_POKTEKPANG_STORY_${language.toUpperCase()}`).insertMany(text);
          res.json({
            status: 'Success!'
          });
          client.close();
        }
        else{
          res.json({
            status: 'fail'
          });
          client.close();
        }
      });
    })
  }
}

exports.addStoryInfo = (req,res) => {
  if(req){
    MongoClient.connect(url, function (err, client) {
      if (err) throw err;
      var dbo = client.db("ubcreadertesting");
      dbo.collection(`KORN410B_STORY_LIST`).find(req).toArray( function(err,document) {
        if(document.length === 0){
          dbo.collection(`KORN410B_STORY_LIST`).insertOne(req.storyInfo).then(success => {
            if(success.result.ok){
              res.json({
                status: 'success'
              });
              client.close();
            }
            else{
              res.json({
                status: 'fail'
              });
              client.close();
            }
          });
        }
        else{
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