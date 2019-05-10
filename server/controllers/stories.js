/*
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const keys = require('../config/keys');
const url = keys.mongoURI;
const Story = mongoose.model('stories');

exports.initStory = (req,res) => {
  let storyTitle = req.query.storyTitle.toUpperCase();
  let {className} = req.query;
  let vocab ={};
  let grammar ={};
  let query = {}
  let storyInfo = {};

  if(storyTitle){
    MongoClient.connect(url, function (err, client) {
      let dbo = client.db("ubcreadertesting");

      if (err) throw err;
      query = {storyName: storyTitle.toLowerCase()};
      dbo.collection(`KORN${className}_STORY_LIST`).find(query).toArray(function (err, story_info) {
        if (err) throw err;
        storyInfo = story_info[0]
        dbo.collection(`KORN${className}_${storyTitle}_VOC`).find().toArray(function (err, voc_result) {
          if (err) throw err;
          dbo.collection(`KORN${className}_${storyTitle}_GRAM`).find().toArray(function (err, gram_result) {
            if (err) throw err;
            vocab = voc_result;
            grammar = gram_result;
            res.json({
              vocab,
              grammar,
              storyInfo
            })
            client.close();
          });
        });
      });
    });
  }
}

exports.getVocAndGram = (req, res) => {
  let story = (req.params.story).toUpperCase();
  if (story) {
    MongoClient.connect(url, function (err, client) {
      if (err) throw err;
      var dbo = client.db("ubcreadertesting");
      var query = {};
      dbo.collection(`KORN410B_${story}_VOC`).find(query).toArray(function (err, voc_result) {
        if (err) throw err;
        dbo.collection(`KORN410B_${story}_GRAM`).find(query).toArray(function (err, gram_result) {
          if (err) throw err;
          res.json({
            vocab: voc_result,
            grammar: gram_result
          });
          client.close();
        });
      });
    });
  }
};

exports.getStoryText = (req, res) => {
  let storyInfo = JSON.parse(req.query.storyInfo);
  let storyName = storyInfo.storyName.toUpperCase();

  if (storyName) {
    MongoClient.connect(url, function (err, client) {
      if (err) throw err;
      var dbo = client.db("ubcreadertesting");
      var query = {};
      dbo.collection(`KORN${storyInfo.class}_${storyName}_STORY_KOREAN`).find(query).toArray(function (err, story_result_korean) {
        if (err) throw err;
        dbo.collection(`KORN${storyInfo.class}_${storyName}_STORY_ENGLISH`).find(query).toArray(function (err, story_result_english) {
          res.json({
            storyTextKorn: story_result_korean,
            storyTextEngl: story_result_english
          });
          client.close();
        });
      });


    })
  }


}

exports.getStoryInfo = (req, res) => {
  let story = req.query.story;
  if (story) {
    MongoClient.connect(url, function (err, client) {
      if (err) throw err;
      var dbo = client.db("ubcreadertesting");
      var query = {storyName: story};
      dbo.collection(`KORN410B_STORY_LIST`).find(query).toArray(function (err, story_info) {
        if (err) throw err;
        res.json({
          storyInfo: story_info,
        });
        client.close();
      });
    });
  }

}

*/
