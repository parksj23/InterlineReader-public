const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const {ObjectId} = require('mongodb');
const keys = require('../config/keys');
const url = keys.mongoURI;
const databaseName = keys.databaseName;

exports.getListOfSavedGrammars = (params, res) => {
    let {userId,storyId} = params;
    if (userId && storyId) {
        MongoClient.connect(url, function (err, client) {
            if (err) throw err;
            var dbo = client.db(databaseName);
            let query = {
                userId,
                storyId
            };
            dbo.collection('USER_SAVED_GRAMMAR').find(query).toArray(function (err, gram_list) {
                // create a new document if not found
                if (err) throw err;
                if(gram_list.length == 0) {
                    dbo.collection('USER_SAVED_GRAMMAR').insert(
                        {
                            userId: userId,
                            storyId: storyId,
                            savedGrammarIds: []
                        })
                    res.json({
                        savedGrammarIds: [],
                    });
                }
                else{
                    res.json({
                        savedGrammarIds: gram_list[0].savedGrammarIds,
                    });
                }
                client.close();
            });
        })
    }
}

exports.updateSavedGrammars = (params,res) => {
    let {userId, storyId, savedGrammarIds} = params;
    if(userId && storyId) {
        MongoClient.connect(url, function (err, client) {
            if (err) throw err;
            var dbo = client.db(databaseName);
            let query = {
                userId: userId,
                storyId: storyId
            };
            dbo.collection('USER_SAVED_GRAMMAR').find(query).toArray(function (err, gram_list) {
                let result = gram_list[0];
                if (result) {
                    result.savedGrammarIds = savedGrammarIds;
                    dbo.collection('USER_SAVED_GRAMMAR').replaceOne(query,result, {upsert:true});
                    if (err) throw err;
                    res.json({
                        savedGrammarIds: savedGrammarIds
                    });
                } else {
                    result = {userId: userId, storyId: storyId, savedGrammarIds: savedGrammarIds}
                    dbo.collection('USER_SAVED_GRAMMAR').insertOne(result);
                    if (err) throw err;
                    res.json({
                        savedGrammarIds: savedGrammarIds
                    });
                }

                client.close();
            })
        })
    }
}
