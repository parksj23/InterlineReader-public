const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const keys = require('../config/keys');
const url = keys.mongoURI;

exports.getSavedWords = (params, res) => {
  let {userId, story, savedWords} = params;
  if (userId) {
    MongoClient.connect(url, function (err, client) {
      if (err) throw err;
      var dbo = client.db("ubcreadertesting");
      let query = [];
      savedWords.map(orderId => {
        query.push({
          order_id: parseInt(orderId)
        })
      })
      dbo.collection(`KORN410_${story.toUpperCase()}_VOC`).find({$or: query}).toArray(function (err, voc_result) {
        if (err) throw err;
        res.json({
          savedVocab: voc_result,
        });
        client.close();
      });
    })
  }
}

exports.getListOfSavedWords = (params, res) => {
  let {userId,story} = params;
  if (userId) {
    MongoClient.connect(url, function (err, client) {
      if (err) throw err;
      var dbo = client.db("ubcreadertesting");
      let query = {
        userId,
        story
      };
      dbo.collection(`USERS_${story.toUpperCase()}_SAVED_WORDS`).find(query).toArray(function (err, voc_list) {
        // create a new document if not found
        if(voc_list.length == 0) {
          dbo.collection(`USERS_${story.toUpperCase()}_SAVED_WORDS`).insert(
            {
              userId: userId,
              story: story,
              vocabList: []
            })
          res.json({
            vocabList: [],
          });
        }
        if (err) throw err;
        res.json({
          vocabList: voc_list[0],
        });
        client.close();
      });
    })
  }



}

exports.addToSavedWords = (params,res) => {
  let {userId,storyTitle} = params;
  if(userId && storyTitle) {
    MongoClient.connect(url, function (err, client) {
      if (err) throw err;
      var dbo = client.db("ubcreadertesting");
      let query = {
        userId
      };
      dbo.collection(`USERS_${storyTitle.toUpperCase()}_SAVED_WORDS`).find(query).toArray(function (err, voc_list) {
        if(voc_list[0].vocabList.indexOf(params.vocabWord.order_id) !== -1){
          res.json({
            vocabList: voc_list[0],
          });
        }
        else{
          voc_list[0].vocabList.push(params.vocabWord.order_id)
          dbo.collection(`USERS_${storyTitle.toUpperCase()}_SAVED_WORDS`).update(query,voc_list[0]);

          if (err) throw err;
          res.json({
            vocabList: voc_list[0],
          });
        }
        client.close();
      });
    })


  }

}

exports.deleteSavedWords = (params,res) => {
  let {userId,storyTitle} = params;
  console.log(params);
  if(userId && storyTitle) {
    MongoClient.connect(url, function (err, client) {
      if (err) throw err;
      var dbo = client.db("ubcreadertesting");
      let query = {
        userId
      };
      dbo.collection(`USERS_${storyTitle.toUpperCase()}_SAVED_WORDS`).find(query).toArray(function (err, voc_list) {
        if(voc_list[0].vocabList.indexOf(params.vocabWord.order_id) === -1){
          res.json({
            vocabList: voc_list[0],
          });
        }
        else{
          let vocList = voc_list[0].vocabList;
          vocList.splice(vocList.indexOf(params.vocabWord.order_id),1)
          voc_list[0].vocabList = vocList
          dbo.collection(`USERS_${storyTitle.toUpperCase()}_SAVED_WORDS`).update(query,voc_list[0]);

          if (err) throw err;
          res.json({
            vocabList: voc_list[0],
          });
        }
        client.close();
      });
    })


  }

}