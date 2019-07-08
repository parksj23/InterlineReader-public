const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const keys = require('../config/keys');
const analyticsURL = keys.mongoAnalyticsURI;
const storiesURL = keys.mongoURI

exports.getUserActivity = async (req, res) => {
  let { className, storyName, date } = req;
  MongoClient.connect(analyticsURL, function (err, client) {
    if (err) throw err;
    var dbo = client.db("ubcreader");
    let promiseArray = []
    date -= date % (1000 * 60 * 60 * 24)
    for (let i = 0; i < 6; i++) {
      promiseArray.push(new Promise((resolve, reject) => {
        let query = {
          startSession: {
            $gte: date,
          },
          endSession: {
            $lte: date + (1000 * 60 * 60 * 24)
          }
        }
        dbo.collection(`ANALYTICS_${className.toUpperCase()}_${storyName.toUpperCase()}_SESSIONS`)
          .find(query).toArray(function (err, voc_list) {
            let users = []
            voc_list.map(aSession => {
              if (users.indexOf(aSession.userId) === -1) users.push(aSession.userId)
            })
            resolve({
              date: query.startSession.$gte,
              value: users.length
            })
          })
      }))
      date -= 1000 * 60 * 60 * 24
    }
    Promise.all(promiseArray).then(resp => {
      let result = {}
      result.type = "User Activity"
      result.data = resp;
      res.json([result])
    })

  })
}

exports.getMostFrequentGrammar = async (req, res) => {
  let { className, storyName } = req;
  MongoClient.connect(analyticsURL, function (err, client) {
    if (err) throw err;
    var dbo = client.db("ubcreader");
    let promiseArray = []
    promiseArray.push(new Promise((resolve, reject) => {
      let query = {
      }
      dbo.collection(`ANALYTICS_${className.toUpperCase()}_${storyName.toUpperCase()}_SESSIONS`)
        .find(query).toArray(function (err, voc_list) {
          if (voc_list) {
            let grammarCount = {}
            let result = []
            voc_list.map(aSession => {
              let { grammarFrequency } = aSession;
              for (let key in grammarFrequency) {
                console.log(key)
                if (grammarCount[key]) {
                  grammarCount[key] += grammarFrequency[key]
                }
                else {
                  grammarCount[key] = grammarFrequency[key]
                }
              }
            })
            for (let key in grammarCount) {
              result.push({ name: key, value: grammarCount[key] })
            }
            result.sort((a, b) => {
              return a > b ? 1 : a < b ? -1 : 0
            })
            resolve(
              [...result]
            )
          }
        })
    }))
    Promise.all(promiseArray).then(resp => {
      let result = {}
      result.type = "Grammar Search Frequency"
      result.data = resp[0];
      res.json([result])
    })
  })
}

exports.getAnalyticsGrammarSearch = async (req, res) => {

  const { text, storyInfo } = req;
  if (text && storyInfo) {
    MongoClient.connect(analyticsURL, function (err, client) {
      if (err) throw err;
      var dbo = client.db("ubcreadertesting");
      dbo.collection(`KORN${storyInfo.class}_${storyInfo.storyName.toUpperCase()}_STORY_${storyInfo.language.toUpperCase()}`).deleteMany().then(success => {
        if (success.result.ok) {
          dbo.collection(`KORN${storyInfo.class}_${storyInfo.storyName.toUpperCase()}_STORY_${storyInfo.language.toUpperCase()}`).insertMany(text).then(success => {
            res.json({
              status: 200
            });
          })
        }
        else {
          res.json({
            status: 'fail'
          });
        }
        client.close()
      });
    }
    )
  }
}

exports.addGrammarSearchSession = async (req, res) => {
  console.log('in add grammar search')
  const { sessions, id } = req
  console.log(sessions)
  if (sessions && id) {
    MongoClient.connect(analyticsURL, function (err, client) {
      if (err) throw err;
      let dbo = client.db("ubcreader");
      sessions.map(aSession => {
        let entry = {
          userId: id,
          ...aSession
        }
        console.log(`ANALYTICS_${aSession.class}_${aSession.story.toUpperCase()}_SESSIONS`)
        dbo.collection(`ANALYTICS_${aSession.class}_${aSession.story.toUpperCase()}_SESSIONS`).insertOne(entry)
      })
      client.close()
    }
    )
  }
  else {
    res.json({
      status: 500,
      message: 'missing Arguments'
    })
  }


}