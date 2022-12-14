const MongoClient = require('mongodb').MongoClient;
const keys = require('../config/keys');
const url = keys.mongoURI;
const databaseName = keys.databaseName;
var aws = require('aws-sdk');
const S3_BUCKET = process.env.Bucket

// Configure aws with your accessKeyId and your secretAccessKey
aws.config.update({
  region: 'us-east-2', // Put your aws region here
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey
})

exports.getFiles = (req,res,next) => {
  MongoClient.connect(url, async function(err, client) {
    const db = client.db(databaseName);
    let query = {
      instructorId: req.query.userId
    }
    db.collection("FILES").find(query).toArray(function(err, result) {
      if(err) throw(err)
      res.json(result);
      client.close();
    })
  });
}

exports.getSignedURL = (req, res, next) => {
  const s3 = new aws.S3();  // Create a new instance of S3
  const fileName = req.body.fileName;
  const fileType = req.body.fileType;
// Set up the payload of what we are sending to the S3 api
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 500,
    ContentType: fileType,
    ACL: 'public-read'
  };
// Make a request to the S3 API to get a signed URL which we can use to upload our file
  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      res.json({success: false, error: err})
    }
    // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved.
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    // Send it all back
    res.json({success:true, data:{returnData}});
  });
}

exports.addFile = (req,res,next) => {
  MongoClient.connect(url, async function(err, client) {
    const db = client.db(databaseName);
    let query = {
      ...req.body
    }
    db.collection("FILES").findOneAndUpdate(query, {$set: req.body},  { upsert:true, returnOriginal: false }, function(err, result) {
      if(err) throw(err)
      res.json(result);
      client.close();
    })
  });
}