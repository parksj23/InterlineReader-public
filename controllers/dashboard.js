const path = require("path");
const fs = require('fs');

exports.init = async (req, res) => {
  const classType = req.query.classType
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
            stories = resp
            resolve(stories)
          })
        }
        catch (err) {
        }
      }))
      break
    default:
  }
  Promise.all(storiesPromises).then(resp => {
    res.json(stories)
  })
}

exports.getAssetNames = async(req,res) => {
  const classType = req.query.classType;
  const pathToAssets = path.join(__dirname, )
  let assetNames = {};
  switch (classType) {
    case "410A":
      assetNames["410A"] = fs.readdirSync(path.join(__dirname, '../public/images/korn/410A/badges/svg'))
      break;
    case "410B":
      assetNames["410B"] = fs.readdirSync(path.join(__dirname, '../public/images/korn/410B/badges/svg'))
      break;
    case "all":
      assetNames["410A"] = fs.readdirSync(path.join(__dirname, '../public/images/korn/410A/badges/svg'))
      assetNames["410B"] = fs.readdirSync(path.join(__dirname, '../public/images/korn/410B/badges/svg'))
      break;
    default:
  }
  res.send(assetNames)


}



const getStories = function (className) {
  return new Promise((resolve, reject) => {
    let pathToStories = path.join(__dirname, `../public/images/korn/${className}/badges/svg`);
    let stories = []

    fs.readdir(pathToStories, function (err, items) {
      items.map((aFile) => {
        stories.push(fs.readFileSync(pathToStories + "/" + aFile, 'utf8'))
      })
      resolve(stories)
    })
  })
}

const getAllStories = function () {
  return new Promise((resolve, reject) => {
    let pathToStoriesDir = path.join(__dirname, `../public/images/korn`);
    let storyResult = {};
    let classNames = fs.readdirSync(pathToStoriesDir);
    let storyPromise = []

    classNames.shift()
    classNames.map(aClassName => {
      storyPromise.push(getStories(aClassName))
    })
    Promise.all(storyPromise).then(resp => {
      classNames.map((aClassName, index) => {
        storyResult[aClassName] = resp[index];
      })
      resolve(storyResult)
    })
  })
}
