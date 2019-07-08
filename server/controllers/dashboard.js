/*
const path = require("path");
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const keys = require('../config/keys');
const url = keys.mongoURI;

exports.init = async (req, res, next) => {
  const classType = req.query.classType
  console.log(classType)
  let stories = {};
  let storiesPromises = [];
  switch (classType) {
    case "410A":
      storiesPromises.push(new Promise((resolve, reject) => {
        try {
          getStories(classType).then(res => {
            stories[classType] = res
            resolve(stories)
          })
        }
        catch (err) {
          reject(err)
        }
      }))
      break;
    case "410B":
      storiesPromises.push(new Promise((resolve, reject) => {
        try {
          getStories(classType).then(res => {
            stories[classType] = res
            resolve(stories)
          })
        }
        catch (err) {
        }
      }))
      break;
    case "all":
      storiesPromises.push(new Promise((resolve, reject) => {
        try {
          getAllStories().then(resp => {
            resolve(resp)
          });
        }
        catch (err) {
        }
      }))
      break
    default:
  }
  Promise.all(storiesPromises).then(resp => {
    console.log(resp)
    res.json(resp[0])
    next();
  }).catch( err => {
    console.log(err)
    next();
  })
}


const getStories = function (className) {
  return new Promise((resolve, reject) => {
    let pathToStories = path.join(__dirname, `../public/images/korn/${className}/badges/png`);
    let stories = []
    fs.readdir(pathToStories, function (err, items) {
      items.map((aFile) => {
        stories.push(fs.readFileSync(pathToStories + "/" + aFile, 'utf8'))
      })
      resolve(stories)
    })
  })
}

getAllStories = function(){
  let allStories = {};
  try{
    return new Promise((resolve, reject) =>{
      MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        var dbo = client.db("ubcreadertesting");
        var query = {};
        dbo.collection(`KORN410B_STORY_LIST`).find(query).toArray(function(err, documents) {
          if (err) throw err;
          allStories["410B"] = documents;
          resolve(allStories)
          client.close();
        });
      });
    })
  }catch(err){
    console.log(err);
  }
}
*/
