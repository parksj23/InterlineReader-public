const MongoClient = require('mongodb').MongoClient;
const keys = require('../config/keys');
const url = keys.mongoURI;
const databaseName = keys.databaseName;
exports.getDashboard = (req,res,next) => {
  try {
    MongoClient.connect(url, async function (err, client) {
      const db = client.db(databaseName);
      const findAllStories = () => {
        return new Promise((resolve,reject) => {
          db.collection(`STORY_LIST`).find().toArray(function (err, documents) {
            if (err) reject(err);
            resolve(documents);
          });
        });
      };
      const findStorySummaries = (listOFStories) => {
        return new Promise((resolve, reject) => {
          let storyNames = []
          listOFStories.map(aStory => {
            storyNames.push({storyName: aStory.storyName})
          })
          let query = {
            $or: storyNames
          }

          db.collection(`STORY_KR_SUM`).find(query).toArray(function (err, result) {
            if (err) reject(err);
            const allStorySummary = []
            result.map(aDoc => {

              let storyResult = listOfStories.filter(aStory => aStory.storyName === aDoc.storyName)[0];
              storyResult = {...storyResult, ...aDoc, _id: aDoc._id.toString()}
              allStorySummary.push(storyResult)
            })
            resolve(allStorySummary);
          })
        })
      }

      const findClass = (className) => {
        return new Promise((resolve,reject) => {
          let query = {
            className
          }
          db.collection("CLASSES").find(query).toArray(function(err, classResult) {
            if(err) throw(err)
            resolve(classResult[0])
          })
        })
      }

      var listOfStories = await findAllStories();
      var korn410Class = await findClass("KORN410")
      var korn420Class = await findClass("KORN420")
      var korn410StoriesList =[]
      var korn420StoriesList=[]

      listOfStories.forEach(aStory => {
        if(korn410Class.storyList.indexOf(aStory._id.toString()) > -1) korn410StoriesList.push(aStory)
        if(korn420Class.storyList.indexOf(aStory._id.toString()) > -1) korn420StoriesList.push(aStory)
      })

      const allStories = await findStorySummaries(listOfStories);
      const korn410Stories = await findStorySummaries(korn410StoriesList)
      const korn420Stories = await findStorySummaries(korn420StoriesList)
      res.json( {
        allStories,
        korn410Stories,
        korn420Stories
      });
      client.close();
    })
  }
  catch (err) {
    next(err);
  }
}

exports.getMiddleKorean = (req,res,next) => {
  try {
    MongoClient.connect(url, async function(err, client) {
      if(err) throw(err)
      const dbo = client.db(databaseName);
      dbo.collection('GRAM_MIDKR_ALL').find().toArray(function(err,resultGram) {
        if(err) throw(err)
        resultGram.forEach( anEntry => {
          delete anEntry._id;
          delete anEntry.lastUpdated
          delete anEntry.createdDate
        })
        const midKrGram = resultGram;
        dbo.collection('VOC_MIDKR_ALL').find().toArray(function(err, resultVoc) {
          if(err) throw(err)
          resultVoc.forEach(anEntry => {
            delete anEntry._id
            delete anEntry.createdDate
            delete anEntry.lastUpdated
          })
          const midKrVoc = resultVoc
          res.json({
            midKrGram,
            midKrVoc
          })
          client.close()
        })
      })
    })
  } catch (err) {
    next(err)
  }

}

exports.getModernKorean = (req,res,next) => {
  try {
    MongoClient.connect(url, async function(err, client) {
      if(err) throw(err)
      const dbo = client.db(databaseName);
      dbo.collection('GRAM_MODKR_ALL').find().toArray(function(err,resultGram) {
        if(err) throw(err)

       resultGram.forEach( anEntry => {
          delete anEntry._id;
          delete anEntry.storyList
        })
        const modKrGram = resultGram;
        dbo.collection('VOC_MODKR_ALL').find().toArray(function(err, resultVoc) {
          if(err) throw(err)
          resultVoc.forEach(anEntry => {
            delete anEntry._id
            delete anEntry.storyList
            delete anEntry.instructor
            delete anEntry.createdDate
            delete anEntry.lastUpdated
          })

          const modKrVoc = resultVoc
          res.json({
            modKrGram,
            modKrVoc
          })
          client.close()
        })
      })
    })
  } catch (err) {
    next(err)
  }
}


