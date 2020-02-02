const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const keys = require('../config/keys');
const url = keys.mongoURI;
const databaseName = keys.databaseName;

exports.getSavedWords = (params, res) => {
  let {userId, story, savedWords, storyClass} = params;
  if (userId) {
    MongoClient.connect(url, function (err, client) {
      if (err) throw err;
      var dbo = client.db(databaseName);
      let query = [];
      if(savedWords && savedWords.length > 0) {
        savedWords.map(orderId => {
          query.push({
            order_id: parseInt(orderId)
          })
        })
        dbo.collection(`KORN${storyClass}_${story.toUpperCase()}_VOC`).find({$or: query}).toArray(function (err, voc_result) {
          if (err) throw err;
          res.json({
            savedVocab: voc_result,
          });
        });
      }
      client.close();
    })
  }
}

exports.getListOfSavedWords = (params, res) => {
  let {userId,storyId} = params;
  if (userId && storyId) {
    MongoClient.connect(url, function (err, client) {
      if (err) throw err;
      var dbo = client.db(databaseName);
      let query = {
        userId,
        storyId
      };
      console.log(query)

      dbo.collection('USER_SAVED_VOCAB').find(query).toArray(function (err, voc_list) {
        // create a new document if not found
        if (err) throw err;
        if(voc_list.length == 0) {
          dbo.collection('USER_SAVED_VOCAB').insert(
            {
              userId: userId,
              storyId: storyId,
              savedVocabIds: []
            })
          res.json({
            savedVocabIds: [],
          });
        }
        else{
          res.json({
            savedVocabIds: voc_list[0].savedVocabIds,
          });
        }
        client.close();
      });
    })
  }
}

exports.updateSavedWords = (params,res) => {
  let {userId,storyTitle, vocabList} = params;
  if(userId && storyTitle) {
    MongoClient.connect(url, function (err, client) {
      if (err) throw err;
      var dbo = client.db(databaseName);
      let query = {
        userId: userId
      };
      dbo.collection(`USERS_${storyTitle.toUpperCase()}_SAVED_WORDS`).find(query).toArray(function (err, voc_list) {
          voc_list[0].vocabList = vocabList
          console.log(voc_list[0])
          dbo.collection(`USERS_${storyTitle.toUpperCase()}_SAVED_WORDS`).replaceOne(query,voc_list[0], {upsert:true});
          if (err) throw err;
          res.json({
            vocabList: voc_list[0],
          });
          client.close();
        })
    })
  }
}



exports.deleteSavedWords = (params,res) => {
  let {userId,storyTitle} = params;
  if(userId && storyTitle) {
    MongoClient.connect(url, function (err, client) {
      if (err) throw err;
      var dbo = client.db(databaseName);
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