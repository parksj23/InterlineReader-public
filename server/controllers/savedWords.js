const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const {ObjectId} = require('mongodb');
const keys = require('../config/keys');
const url = keys.mongoURI;
const databaseName = keys.databaseName;

exports.getSavedWords = (params, res) => {
  console.log(params)
  let {userId, savedVocabIds, selectedLanguage} = params;
  console.log(savedVocabIds)
  if (userId) {
    MongoClient.connect(url, function (err, client) {
      if (err) throw err;
      var dbo = client.db(databaseName);
      let query = [];
      savedVocabIds.map(aVocabId => {
        query.push(ObjectId(aVocabId))
      })

      if(savedVocabIds && savedVocabIds.length > 0) {
        dbo.collection(`VOC_${selectedLanguage}_ALL`).find({"_id":{"$in": query}}).toArray(function (err, voc_result) {
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
  let {userId,storyId, savedVocabIds, savedWords} = params;
  if(userId && storyId) {
    MongoClient.connect(url, function (err, client) {
      if (err) throw err;
      var dbo = client.db(databaseName);
      let query = {
        userId: userId,
        storyId: storyId
      };
      dbo.collection('USER_SAVED_VOCAB').find(query).toArray(function (err, voc_list) {
          let result = voc_list[0];
          result.savedVocabIds = savedVocabIds;
          dbo.collection('USER_SAVED_VOCAB').replaceOne(query,result, {upsert:true});
          if (err) throw err;
          res.json({
            savedVocabIds: savedVocabIds,
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