var fs = require('fs');
var path = require('path');
const MongoClient = require('mongodb').MongoClient;


var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
            if (!--pending) done(null, results);
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};


walk('/Users/alfredhong/Desktop/InterlineReader/InterlineReader/client/src/components/stories/Poktekpang/', (error, result) => {

    console.log(result);

    let wordsArray =[]

    result.forEach(path => {
        const file = fs.readFileSync(path);
        const string = file.toString();
        console.log("Test")

        // Extracts all the words from File
      let segment;
        let line = 0;

        // for Korean text
      /*string.replace(/[^\w]>(.+?)<\/Highlight><\/p>/ugi, (match, c1) => {
          console.log(c1);
          segment = {
            order_id: line,
            text: c1
          }
          wordsArray.push(segment);
          line++;

        }
      );*/

      string.replace(/[^\w]>(.+?)<\/Highlight>/ugi, (match, c1) => {
          console.log(c1);
          segment = {
            order_id: line,
            text: c1
          }
          wordsArray.push(segment);
          line++;

        }
      );

      }
    );

    //console.log(wordsArray);

  MongoClient.connect('mongodb+srv://ubcreader:britishcolumbia1324!@cluster0-j9y3z.mongodb.net/test?retryWrites=true&w=majority', function (err, client) {
    if (err) throw err;
    var dbo = client.db("testdb");

    wordsArray.map((aSegment, index) => {
      dbo.collection(`KORN410_POKTEKPANG_STORY_ENGLISH`).insertOne(aSegment)

    });
    client.close();
  })







/*
    fs.writeFile('./output.json', finalJson, (err) => {
      if(err) console.log(err);
    });*/
  }
);
