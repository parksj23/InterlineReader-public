const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const keys = require('../config/keys');
const url = keys.mongoURI;
const Story = mongoose.model('stories');

exports.getVocAndGram = (req, res) => {
    let story = (req.params.story).toUpperCase();
    if(story) {
      MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        var dbo = client.db("ubcreadertesting");
        var query = {};
        dbo.collection(`KORN410_${story}_VOC`).find(query).toArray(function(err, result) {
          if (err) throw err;
          res.json(result); 
          client.close();
        });
      });
    }     
};