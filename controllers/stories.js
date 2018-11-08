const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const keys = require('../config/keys');
const url = keys.mongoURI;
const Story = mongoose.model('stories');

exports.getVocAndGram = (req, res) => {
    let story = (req.params.story).toUpperCase();
    console.log("the story is" + story);
    if(story) {
      MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        var dbo = client.db("ubcreadertesting");
        var query = {};
        dbo.collection(`KORN410_${story}_VOC`).find(query).toArray(function(err, voc_result) {
          if (err) throw err;
            dbo.collection(`KORN410_${story}_GRAM`).find(query).toArray(function(err, gram_result) {
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