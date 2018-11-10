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
        dbo.collection(`KORN410_POKTEKPANG_STORY_${language.toUpperCase()}_TEST`).insertMany(text);
        res.json({
          status: 'Success!'
        });
      client.close();
    })
  }

}