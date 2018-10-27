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

const wordsArray = [];
const wordSet = new Set();

let en = '';
let fr = '';
walk('/Users/alfredhong/Desktop/InterlineReader/InterlineReader/client/src/components/stories/Sonagi/english', (error, result) => {

    console.log(result);

    result.forEach(path => {
        const file = fs.readFileSync(path);
        const string = file.toString().split('\n');

        // Extracts all the words from File
        let lines = 0
        let lineSegment = {};

        string.map((aSentence,index) => {
          if(aSentence !== "") {
            lineSegment = {
              order_id: lines,
              text: aSentence
            }
            lines++
            wordsArray.push(lineSegment)
          }
        })
        console.log(wordsArray)
      }
    );

  MongoClient.connect('mongodb://ubcreader:britishcolumbia1324!@ds155862.mlab.com:55862/ubcreadertesting', function (err, client) {
    if (err) throw err;
    var dbo = client.db("ubcreadertesting");

    wordsArray.map((aSegment, index) => {
      dbo.collection(`KORN410_SONAGI_STORY_ENGLISH`).insert(aSegment)

    });
    client.close();
  })






   /* fs.writeFile('./output.json', finalJson, (err) => {
      if(err) console.log(err);
    });*/
  }
);
