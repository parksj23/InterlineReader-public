const MongoClient = require("mongodb").MongoClient;
const keys = require("../config/keys");
const url = keys.mongoURI;
const ObjectID = require("mongodb").ObjectID;
const databaseName = keys.databaseName;

exports.initialize = (req, res, next) => {
  try {
    MongoClient.connect(url, async function(err, client) {
      let allStories = {};
      const db = client.db(databaseName);
      const findAllStories = () => {
        return new Promise((resolve, reject) => {
          db.collection(`STORY_LIST`)
            .find()
            .toArray(function(err, documents) {
              if (err) reject(err);
              allStories = documents;
              resolve(allStories);
            });
        });
      };
      var result = await findAllStories();
      client.close();
      res.send(result);
    });
  } catch (err) {
    next(err);
  }
};

exports.addNewStory = (req, res) => {
  const { text, storyInfo } = req;
  if (text && storyInfo) {
    MongoClient.connect(url, function(err, client) {
      if (err) throw err;
      var dbo = client.db(databaseName);
      var query = {
        language: text[0].language
      };
      dbo
        .collection(`TEXT_${storyInfo.storyName.toUpperCase()}`)
        .deleteMany(query)
        .then(success => {
          if (success) {
            dbo
              .collection(`TEXT_${storyInfo.storyName.toUpperCase()}`)
              .insertMany(text)
              .then(success => {
                res.json({
                  status: 200
                });
              });
          } else {
            res.json({
              status: 500,
              message: "Error updating story"
            });
          }
          dbo.close();
        });
    });
  } else {
    res.json({
      status: 500,
      message: "Text or StoryInfo is null"
    });
  }
};

exports.addStoryInfo = (req, res) => {
  if (req) {
    let {
      language,
      storyName,
      instructor,
      region,
      createdDate,
      lastUpdated
    } = req.storyInfo;
    let query = {
      storyName,
      class: req.storyInfo.class,
      instructor,
      region
    };

    let storyInfo = {
      ...query,
      createdDate,
      lastUpdated
    };
    console.log(query);
    MongoClient.connect(url, function(err, client) {
      if (err) throw err;
      var dbo = client.db(databaseName);
      dbo
        .collection(`STORY_LIST`)
        .find(query)
        .toArray(function(err, document) {
          if (document.length === 0) {
            let languages = [];
            languages.push(language);
            storyInfo["languages"] = languages;
            dbo
              .collection(`STORY_LIST`)
              .insertOne(storyInfo)
              .then(success => {
                if (success.result.ok) {
                  res.json({
                    status: "success"
                  });
                  client.close();
                } else {
                  res.json({
                    status: "failed to save to database"
                  });
                  client.close();
                }
              });
          } else {
            let oldDoc = document[0];
            delete oldDoc._id;
            let languages = oldDoc.languages;
            if (languages.indexOf(language) === -1) languages.push(language);
            oldDoc["languages"] = languages;
            dbo
              .collection(`STORY_LIST`)
              .replaceOne(query, oldDoc, { upsert: true })
              .then(success => {
                if (success.result.ok) {
                  res.json({
                    status: "success"
                  });
                  client.close();
                } else {
                  res.json({
                    status: "failed - story already exist!"
                  });
                  client.close();
                }
              })
              .catch(err => {
                console.log(err);
              });
            client.close();
          }
        });
    });
  }
};

exports.getAllStories = (req, res) => {
  let allStories = {};
  try {
    return new Promise((resolve, reject) => {
      MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        var dbo = client.db(databaseName);
        var query = {};
        dbo
          .collection(`STORY_LIST`)
          .find(query)
          .toArray(function(err, documents) {
            if (err) throw err;
            allStories = documents;
            res.json(allStories);
            client.close();
          });
      });
    });
  } catch (err) {
    console.log(err);
  }
};

exports.renameCollections = (req, res) => {
  MongoClient.connect(url, function(err, client) {
    if (err) throw err;
    let dbo = client.db(databaseName);
    console.log(req);
    let oldName = req.oldName;
    let newName = oldName.substring(9);
    dbo.renameCollection(`${oldName}`, `${newName}`).then(err => {
      client.close();
    });
    /* dbo.collection(oldName).rename(newName, function (err, newColl) {
        if(err) console.log(err)
        res.json({
          status: "ok"
        })
        client.close()
      })*/
  });
};

exports.getVocabulary = (req, res) => {
  MongoClient.connect(url, async function(err, client) {
    if (err) throw err;
    let db = client.db(databaseName);
    let storyInfo = req.storyInfo;
    const findStoryVocab = () => {
      return new Promise((resolve, reject) => {
        db.collection(`${storyInfo.storyTitle}_VOC`)
          .find()
          .toArray(function(err, voc_result) {
            if (err) reject(err);
            resolve(voc_result);
          });
      });
    };
    const vocabList = await findStoryVocab();
    client.close();
    res.send({
      status: "200OK",
      vocabList
    });
  });
};

exports.getGrammar = (req, res) => {
  MongoClient.connect(url, async function(err, client) {
    if (err) throw err;
    let db = client.db("testdb");
    let storyInfo = req.storyInfo;
    const findStoryGrammar = () => {
      return new Promise((resolve, reject) => {
        db.collection(`${storyInfo.storyTitle}_GRAM`)
          .find()
          .toArray(function(err, voc_result) {
            if (err) reject(err);
            resolve(voc_result);
          });
      });
    };
    const GrammarList = await findStoryGrammar();
    client.close();
    res.send({
      status: "200OK",
      GrammarList
    });
  });
};

exports.addVocab = (req, res, next) => {
  MongoClient.connect(url, async function(err, client) {
    if (err) throw err;
    var dbo = client.db(databaseName);
    let { vocab, storyTitle } = req;

    let storyIdquery = {
      storyName: storyTitle
    };

    dbo
      .collection(`STORY_LIST`)
      .find(storyIdquery)
      .toArray(function(err, storyResult) {
        if (err) throw err;
        if (storyResult.length === 0)
          throw `Cannot find story for storyTitle: ${storyTitle}`;
        let storyId = storyResult[0]._id.toString();
        let vocabQuery = {
          korean: vocab.korean
        };
        dbo
          .collection(`VOC_MODKR_ALL`)
          .find(vocabQuery)
          .toArray(function(err, vocabResult) {
            if (err) throw err;
            let newVocabEntry;
            if (vocabResult.length === 0) {
              newVocabEntry = vocab;
              let storyList = [];
              storyList.push(storyId);
              newVocabEntry["storyList"] = storyList;
              newVocabEntry["createdDate"] = new Date();
              newVocabEntry["lastUpdated"] = new Date();
            } else {
              newVocabEntry = vocabResult[0];
              newVocabEntry = {
                ...newVocabEntry,
                ...vocab,
                lastUpdated: new Date()
              };
            }

            dbo
              .collection("VOC_MODKR_ALL")
              .updateOne(
                vocabQuery,
                { $set: newVocabEntry },
                { upsert: true },
                function(erro, result) {
                  dbo
                    .collection(`VOC_MODKR_ALL`)
                    .find(vocabQuery)
                    .toArray(function(err, vocabResult) {
                      if (err) throw err;
                      console.log("vocabResult: ");
                      console.log(vocabResult[0]);
                      let vocabId = vocabResult[0]._id;
                      console.log(typeof storyId);
                      let vocabOrderQuery = {
                        storyId: storyId.trim()
                      };
                      dbo
                        .collection(`VOC_MODKR_ORDER`)
                        .find(vocabOrderQuery)
                        .toArray(function(err, orderResult) {
                          if (err) throw err;
                          if (orderResult.length === 0)
                            throw `Cannot find order data`;
                          console.log("OrderResult: ");
                          console.log(orderResult[0]);

                          let order = orderResult[0].order;
                          order.map(orderEntry => {
                            orderEntry.order_id =
                              orderEntry.order_id >= vocab.order_id
                                ? orderEntry.order_id + 1
                                : orderEntry.order_id;
                          });
                          order.push({
                            vocabId: vocabId.toString(),
                            order_id: vocab.order_id
                          });
                          dbo
                            .collection(`VOC_MODKR_ORDER`)
                            .updateOne(
                              vocabOrderQuery,
                              { $set: { order: order } },
                              function(err, result) {
                                if (err) throw err;
                                res.send({
                                  vocab
                                });
                              }
                            );
                        });
                    });
                }
              );
          });
      });
  });
};

exports.addGrammar = (req, res, next) => {
  MongoClient.connect(url, async function(err, client) {
    if (err) throw err;
    var dbo = client.db(databaseName);
    let { grammar, storyTitle } = req;

    let storyIdquery = {
      storyName: storyTitle
    };

    dbo
      .collection(`STORY_LIST`)
      .find(storyIdquery)
      .toArray(function(err, storyResult) {
        if (err) throw err;
        if (storyResult.length === 0)
          throw `Cannot find story for storyTitle: ${storyTitle}`;
        let storyId = storyResult[0]._id.toString();
        let grammarQuery = {
          sentence: grammar.sentence
        };
        console.log(grammarQuery);
        dbo
          .collection(`GRAM_MODKR_ALL`)
          .find(grammarQuery)
          .toArray(function(err, grammarResult) {
            if (err) throw err;
            let newGrammarEntry;
            if (grammarResult.length === 0) {
              newGrammarEntry = grammar;
              let storyList = [];
              storyList.push(storyId);
              newGrammarEntry["storyList"] = storyList;
              newGrammarEntry["createdDate"] = new Date();
              newGrammarEntry["lastUpdated"] = new Date();
            } else {
              newGrammarEntry = grammarResult[0];
              newGrammarEntry = {
                ...newGrammarEntry,
                ...grammar,
                lastUpdated: new Date()
              };
            }

            dbo
              .collection("GRAM_MODKR_ALL")
              .updateOne(
                grammarQuery,
                { $set: newGrammarEntry },
                { upsert: true },
                function(erro, result) {
                  dbo
                    .collection(`GRAM_MODKR_ALL`)
                    .find(grammarQuery)
                    .toArray(function(err, grammarResult) {
                      if (err) throw err;
                      let grammarId = grammarResult[0]._id;
                      let grammarOrderQuery = {
                        storyId: storyId.trim()
                      };
                      dbo
                        .collection(`GRAM_MODKR_ORDER`)
                        .find(grammarOrderQuery)
                        .toArray(function(err, orderResult) {
                          if (err) throw err;
                          if (orderResult.length === 0)
                            throw `Cannot find order data`;

                          let order = orderResult[0].order;
                          order.map(orderEntry => {
                            orderEntry.order_id =
                              orderEntry.order_id >= grammar.order_id
                                ? orderEntry.order_id + 1
                                : orderEntry.order_id;
                          });
                          order.push({
                            grammarId: grammarId.toString(),
                            order_id: grammar.order_id
                          });
                          dbo
                            .collection(`GRAM_MODKR_ORDER`)
                            .updateOne(
                              grammarOrderQuery,
                              { $set: { order: order } },
                              function(err, result) {
                                if (err) throw err;
                                res.send({
                                  grammar
                                });
                              }
                            );
                        });
                    });
                }
              );
          });
      });
  });
};

exports.updateVocab = (req, res, next) => {
  MongoClient.connect(url, async function(err, client) {
    if (err) throw err;
    var dbo = client.db(databaseName);
    let { vocab } = req;
    let query = {
      _id: ObjectID(vocab._id)
    };

    let updatedDocument = {
      korean: vocab.korean,
      hanja: vocab.hanja,
      english: vocab.english
    };
    dbo
      .collection(`VOC_MODKR_ALL`)
      .updateOne(query, { $set: updatedDocument }, function(err, result) {
        if (err) throw err;
        res.send({
          vocab
        });
        client.close();
      });
  });
};

exports.deleteVocab = (req, res, next) => {
  MongoClient.connect(url, async function(err, client) {
    if (err) throw err;
    var dbo = client.db(databaseName);
    let { vocab, storyTitle } = req;

    let storyIdquery = {
      storyName: storyTitle
    };

    dbo
      .collection(`STORY_LIST`)
      .find(storyIdquery)
      .toArray(function(err, storyResult) {
        if (err) throw err;
        if (storyResult.length === 0)
          throw `Cannot find story for storyTitle: ${storyTitle}`;
        console.log("StoryResult: ");
        console.log(storyResult[0]);
        let storyId = storyResult[0]._id.toString();
        let query = {
          korean: vocab.korean,
          hanja: vocab.hanja,
          english: vocab.english
        };
        console.log(query);
        dbo
          .collection(`VOC_MODKR_ALL`)
          .find(query)
          .toArray(function(err, result) {
            if (err) throw err;
            console.log(result[0]);
            let vocabToRemove = result[0];
            let vocabId = vocabToRemove._id.toString();
            let storyList = vocabToRemove.storyList;
            storyList.splice(storyList.indexOf(storyId), 1);
            dbo
              .collection(`VOC_MODKR_ALL`)
              .updateOne(query, { $set: { storyList: storyList } }, function(
                err,
                result
              ) {
                if (err) throw err;
                let orderQuery = {
                  storyId: storyId
                };
                dbo
                  .collection(`VOC_MODKR_ORDER`)
                  .find(orderQuery)
                  .toArray(function(err, orderResult) {
                    if (err) throw err;
                    let newOrder = orderResult[0];
                    let order = newOrder.order;
                    let removeVocab = {
                      vocabId,
                      order_id: vocab.order_id
                    };
                    order.splice(order.indexOf(removeVocab), 1);
                    order.map(vocabEntry => {
                      vocabEntry.order_id =
                        vocabEntry.order_id >= removeVocab.order_id
                          ? vocabEntry.order_id - 1
                          : vocabEntry.order_id;
                    });
                    dbo
                      .collection(`VOC_MODKR_ORDER`)
                      .updateOne(
                        orderQuery,
                        { $set: { order: order } },
                        function(err, result) {
                          if (err) throw err;
                          res.send({
                            vocab
                          });
                          client.close();
                        }
                      );
                  });
              });
          });
      });
  });
};

exports.updateGrammar = (req, res, next) => {
  MongoClient.connect(url, async function(err, client) {
    if (err) throw err;
    var dbo = client.db(databaseName);
    let { grammar } = req;
    let query = {
      _id: ObjectID(grammar._id)
    };

    let updatedDocument = {
      sentence: grammar.sentence,
      pattern: grammar.pattern,
      here: grammar.here
    };
    dbo
      .collection(`GRAM_MODKR_ALL`)
      .updateOne(query, { $set: updatedDocument }, function(err, result) {
        if (err) throw err;
        res.send({
          grammar
        });
        client.close();
      });
  });
};

exports.deleteGrammar = (req, res, next) => {
  MongoClient.connect(url, async function(err, client) {
    if (err) throw err;
    var dbo = client.db(databaseName);
    let { grammar, storyTitle } = req;

    let storyIdquery = {
      storyName: storyTitle
    };

    dbo
      .collection(`STORY_LIST`)
      .find(storyIdquery)
      .toArray(function(err, storyResult) {
        if (err) throw err;
        if (storyResult.length === 0)
          throw `Cannot find story for storyTitle: ${storyTitle}`;
        console.log("StoryResult: ");
        console.log(storyResult[0]);
        let storyId = storyResult[0]._id.toString();
        let query = {
          sentence: grammar.sentence,
          pattern: grammar.pattern,
          here: grammar.here
        };
        console.log(query);
        dbo
          .collection(`GRAM_MODKR_ALL`)
          .find(query)
          .toArray(function(err, result) {
            if (err) throw err;
            console.log(result[0]);
            let grammarToRemove = result[0];
            let grammarId = grammarToRemove._id.toString();
            let storyList = grammarToRemove.storyList;
            storyList.splice(storyList.indexOf(storyId), 1);
            dbo
              .collection(`GRAM_MODKR_ALL`)
              .updateOne(query, { $set: { storyList: storyList } }, function(
                err,
                result
              ) {
                if (err) throw err;
                let orderQuery = {
                  storyId: storyId
                };
                dbo
                  .collection(`GRAM_MODKR_ORDER`)
                  .find(orderQuery)
                  .toArray(function(err, orderResult) {
                    if (err) throw err;
                    let newOrder = orderResult[0];
                    let order = newOrder.order;
                    let removeGrammar = {
                      grammarId,
                      order_id: grammar.order_id
                    };
                    order.splice(order.indexOf(removeGrammar), 1);
                    order.map(grammarEntry => {
                      grammarEntry.order_id =
                        grammarEntry.order_id >= removeGrammar.order_id
                          ? grammarEntry.order_id - 1
                          : grammarEntry.order_id;
                    });
                    dbo
                      .collection(`GRAM_MODKR_ORDER`)
                      .updateOne(
                        orderQuery,
                        { $set: { order: order } },
                        function(err, result) {
                          if (err) throw err;
                          res.send({
                            grammar
                          });
                          client.close();
                        }
                      );
                  });
              });
          });
      });
  });
};

exports.getMiddleKRGram = (req, res, next) => {
  MongoClient.connect(url, async function(err, client) {
    if (err) throw err;
    var dbo = client.db(databaseName);
    dbo
      .collection(`GRAM_MIDKR_ALL`)
      .find()
      .toArray(function(err, grammarResult) {
        if (err) throw err;
        res.json({
          status: "200OK",
          middleKRGram: grammarResult
        });
        client.close();
      });
  });
};

exports.addMiddleKoreanGrammar = (grammar, res, next) => {
  MongoClient.connect(url, async function(err, client) {
    if (err) throw err;
    var dbo = client.db(databaseName);
    let query = {
      engCat: grammar.engCat,
      annotation: grammar.annotation,
      romShape: grammar.romShape,
      hankulShape: grammar.hankulShape
    };
    dbo
      .collection(`GRAM_MIDKR_ALL`)
      .find(query)
      .toArray(function(err, grammarResult) {
        if (err) throw err;
        dbo
          .collection(`GRAM_MIDKR_ALL`)
          .findOneAndUpdate(query, { $set: grammar }, { upsert:true, returnOriginal: false }, function(err, result) {
            if (err) throw err;
            console.log(result)
            res.json({
              status: "200OK",
              grammar: result.value
            });
            client.close();
          });
      });
  });
};

exports.updateMiddleKoreanGrammar = (params, res, next) => {
  const grammarList = params.grammarList
  MongoClient.connect(url, async function(err, client){
    if(err) throw(err)
    var dbo = client.db(databaseName);
    grammarList.map(aGrammarEntry => {
      aGrammarEntry["lastUpdated"] = new Date()
      let query = {
        _id: ObjectID(aGrammarEntry._id)
      }

      delete aGrammarEntry._id
      dbo.collection("GRAM_MIDKR_ALL").findOneAndUpdate(query, { $set: aGrammarEntry }, {upsert:true})
    })
    dbo.collection("GRAM_MIDKR_ALL").find().toArray(function(err,result) {
      if(err) throw(err)
      res.json({
        status: "200OK",
        grammarList: result
      })
    })
    client.close();
  })
}

exports.deleteMiddleKoreanGrammer = (params, res, next) => {
  const grammarEntry = params.deleteGrammar;
  let query = {
    _id: ObjectID(grammarEntry._id)
  }
  MongoClient.connect(url, async function(err, client) {
    if (err) throw(err)
    var dbo = client.db(databaseName);
    dbo.collection("GRAM_MIDKR_ALL").deleteOne(query).then(success => {
      if(success.result.ok) {
        dbo.collection("GRAM_MIDKR_ALL").find().toArray(function(err, result) {
          if(err) throw(err)
          res.json({
            grammarList: result
          })
          client.close()
        })
      }
    })
  })

}

exports.getMiddleKRVoc = (req, res, next) => {
  MongoClient.connect(url, async function(err, client) {
    if (err) throw(err)
    var dbo = client.db(databaseName);
    dbo.collection("VOC_MIDKR_ALL").find().toArray(function(err, result) {
    if(err) throw(err)
      res.json({
      vocabList: result
      })
      client.close()
    })
  })
}

exports.updateMiddleKoreanVoc = (vocab, res, next) => {
  const vocabList = vocab.vocabList
  MongoClient.connect(url, async function (err, client) {
    if (err) throw(err)
    var dbo = client.db(databaseName);
    vocabList.map(aVocabEntry => {
      aVocabEntry["lastUpdated"] = new Date()
      let query = {
        _id: ObjectID(aVocabEntry._id)
      }

      delete aVocabEntry._id
      dbo.collection("VOC_MIDKR_ALL").findOneAndUpdate(query, {$set: aVocabEntry}, {upsert: true})
    })
    dbo.collection("VOC_MIDKR_ALL").find().toArray(function (err, result) {
      if (err) throw(err)
      res.json({
        status: "200OK",
        vocabList: result
      })
    })
    client.close();
  })
}

exports.deleteMiddleKoreanVoc = (vocab, res, next) => {
  const vocabEntry = vocab.deleteVocab
  let query = {
    _id: ObjectID(vocabEntry._id)
  }
  MongoClient.connect(url, async function (err, client) {
    if (err) throw(err)
    var dbo = client.db(databaseName);
    dbo.collection("VOC_MIDKR_ALL").deleteOne(query).then(success => {
      if (success.result.ok) {
        dbo.collection("VOC_MIDKR_ALL").find().toArray(function (err, result) {
          if (err) throw(err)
          res.json({
            vocabList: result
          })
          client.close()
        })
      }
    })
  })
}


