const MongoClient = require("mongodb").MongoClient;
const keys = require("../config/keys");
const url = keys.mongoURI;
const ObjectID = require("mongodb").ObjectID;
const databaseName = keys.databaseName;

let db;

exports.initialize = (req, res, next) => {
  try {
    MongoClient.connect(url, async function (err, client) {
      let allStories = {};
      db = client.db(databaseName);
      const findAllStories = () => {
        return new Promise((resolve, reject) => {
          db.collection(`STORY_LIST`)
            .find()
            .toArray(function (err, documents) {
              if (err) reject(err);
              allStories = documents;
              resolve(allStories);
            });
        });
      };
      var result = await findAllStories();
      res.send(result);
    });
  } catch (err) {
    next(err);
  }
};

exports.addNewStory = (req, res) => {
  const {text, storyInfo} = req;
  if (text && storyInfo) {
    console.log(storyInfo)
      var query = {
        language: text[0].language
      };
      db
        .collection(`TEXT_${storyInfo.storyName.toUpperCase()}`)
        .deleteMany(query)
        .then(success => {
          if (success) {
            db
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
      lastUpdated,
      pdfUrl,
      pagesSelected,
      authorKorn,
      authorRom,
      titleKorn,
      titleRom,
      titleEng,
    } = req.storyInfo;

    let query = {
      storyName,
      instructor,
      region
    };
    let storyInfo = {
      ...query,
      createdDate,
      lastUpdated,
      pdfUrl,
      pagesSelected
    };
    let vocabOrder = {
      instructorId: instructor,
      order: []
    }
    let grammarOrder = {
      instructorId: instructor,
      order: []
    }
    let languages = [];
    languages.push(language);

      db.collection(`STORY_LIST`).find(query).toArray((err, result) => {
        console.log(result)
        if (err) throw(err)
        if (result.length === 0) {
          db.collection("STORY_LIST").insertOne(storyInfo);
        }
        let krSumQuery = {
          authorKorn,
          authorRom,
          titleKorn,
          titleRom,
          titleEng,
          storyName
        }
        db.collection("STORY_KR_SUM").find(krSumQuery).toArray((err, result) => {
          if (err) throw(err)
          let krSumDoc = {
            languages: languages
          }
          if (result.length > 0) {
            let updatedStory = result[0];
            krSumDoc.languages = updatedStory.languages
            let newLanguages = updatedStory.languages
            if (newLanguages.indexOf(language) === -1) {
              console.log(language)
              newLanguages.push(language)
              krSumDoc.languages = newLanguages
            }

          }
          krSumDoc = {
            ...krSumDoc,
            authorKorn,
            authorRom,
            titleKorn,
            titleRom,
            titleEng,
            storyName,
            pdfUrl,
            pagesSelected
          }
          db.collection("STORY_KR_SUM").findOneAndUpdate(krSumQuery, {$set: krSumDoc},
            {upsert: true, returnOriginal: false}, function (err, success) {
              if (err) throw(err)
              vocabOrder = {
                ...vocabOrder,
                storyId: success.value._id.toString(),
                createdDate: new Date(),
                lastUpdated: new Date()

              }
              grammarOrder = {
                ...grammarOrder,
                storyId: success.value._id.toString(),
                createdDate: new Date(),
                lastUpdated: new Date()
              }

              db.collection("VOC_MODKR_ORDER").insertOne(vocabOrder)
              db.collection("GRAM_MODKR_ORDER").insertOne(grammarOrder)
              res.json({
                status: "success",
                storyInfo: krSumDoc
              });
            })
        })
      })
  }
};

exports.getAllStories = (req, res) => {
  let allStories = {};
  try {
    return new Promise((resolve, reject) => {
        var query = {};
        db
          .collection(`STORY_LIST`)
          .find(query)
          .toArray(function (err, documents) {
            if (err) throw err;
            allStories = documents;
            res.json(allStories);
          });
    });
  } catch (err) {
    console.log(err);
  }
};

exports.renameCollections = (req, res) => {
    let oldName = req.oldName;
    let newName = oldName.substring(9);
    db.renameCollection(`${oldName}`, `${newName}`).then(err => {
    });
    /* dbo.collection(oldName).rename(newName, function (err, newColl) {
        if(err) console.log(err)
        res.json({
          status: "ok"
        })
        client.close()
      })*/
};

exports.getVocabulary = (req, res) => {
    let storyInfo = req.storyInfo;
    const findStoryVocab = () => {
      return new Promise((resolve, reject) => {
        db.collection(`${storyInfo.storyTitle}_VOC`)
          .find()
          .toArray(function (err, voc_result) {
            if (err) reject(err);
            resolve(voc_result);
          });
      });
    };
    // const vocabList = await findStoryVocab();
    // res.send({
    //   status: "200OK",
    //   vocabList
    // });

    findStoryVocab.then(vocabList =>
        res.send({
            status: "200OK",
            vocabList
        })
    )
};

exports.getGrammar = (req, res) => {
    let storyInfo = req.storyInfo;
    const findStoryGrammar = () => {
      return new Promise((resolve, reject) => {
        db.collection(`${storyInfo.storyTitle}_GRAM`)
          .find()
          .toArray(function (err, voc_result) {
            if (err) reject(err);
            resolve(voc_result);
          });
      });
    };
  //   const GrammarList = await findStoryGrammar();
  //   res.send({
  //     status: "200OK",
  //     GrammarList
  // });
    findStoryGrammar.then(GrammarList =>
        res.send({
            status: "200OK",
            GrammarList
        })
    )
};

exports.addVocab = (req, res, next) => {
    let {vocab, storyId} = req;

    let storyIdquery = {
      _id: ObjectID(storyId)
    };

    db
      .collection(`STORY_KR_SUM`)
      .find(storyIdquery)
      .toArray(function (err, storyResult) {
        if (err) throw err;
        if (storyResult.length === 0)
          throw `Cannot find story for storyTitle: ${storyTitle}`; // TODO
        let storyId = storyResult[0]._id.toString();
        let vocabQuery = {
          korean: vocab.korean
        };
        db
          .collection(`VOC_MODKR_ALL`)
          .find(vocabQuery)
          .toArray(function (err, vocabResult) {
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

            db
              .collection("VOC_MODKR_ALL")
              .updateOne(
                vocabQuery,
                {$set: newVocabEntry},
                {upsert: true},
                function (erro, result) {
                  db
                    .collection(`VOC_MODKR_ALL`)
                    .find(vocabQuery)
                    .toArray(function (err, vocabResult) {
                      if (err) throw err;
                      let vocabId = vocabResult[0]._id;
                      let vocabOrderQuery = {
                        storyId: storyId.trim()
                      };
                      db
                        .collection(`VOC_MODKR_ORDER`)
                        .find(vocabOrderQuery)
                        .toArray(function (err, orderResult) {
                          let order = []
                          if (err) throw err;
                          if (orderResult.length > 0) {
                            order = orderResult[0].order;
                            order.map(orderEntry => {
                              orderEntry.order_id =
                                orderEntry.order_id >= vocab.order_id
                                  ? orderEntry.order_id + 1
                                  : orderEntry.order_id;
                            });
                          }
                          order.push({
                            vocabId: vocabId.toString(),
                            order_id: vocab.order_id
                          });
                          db
                            .collection(`VOC_MODKR_ORDER`)
                            .updateOne(
                              vocabOrderQuery,
                              {$set: {order: order}},
                              {upsert: true},
                              function (err, result) {
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
};

exports.addGrammar = (req, res, next) => {
    let {grammar, storyId} = req;

    let storyIdquery = {
      _id: ObjectID(storyId)
    };

    db
      .collection(`STORY_KR_SUM`)
      .find(storyIdquery)
      .toArray(function (err, storyResult) {
        if (err) throw err;
        if (storyResult.length === 0)
          throw `Cannot find story for storyTitle: ${storyId}`;
        let storyId = storyResult[0]._id.toString();
        let grammarQuery = {
          sentence: grammar.sentence
        };
        db
          .collection(`GRAM_MODKR_ALL`)
          .find(grammarQuery)
          .toArray(function (err, grammarResult) {
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

            db
              .collection("GRAM_MODKR_ALL")
              .updateOne(
                grammarQuery,
                {$set: newGrammarEntry},
                {upsert: true},
                function (erro, result) {
                  db
                    .collection(`GRAM_MODKR_ALL`)
                    .find(grammarQuery)
                    .toArray(function (err, grammarResult) {
                      if (err) throw err;
                      let grammarId = grammarResult[0]._id;
                      let grammarOrderQuery = {
                        storyId: storyId.trim()
                      };
                      db
                        .collection(`GRAM_MODKR_ORDER`)
                        .find(grammarOrderQuery)
                        .toArray(function (err, orderResult) {
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
                          db
                            .collection(`GRAM_MODKR_ORDER`)
                            .updateOne(
                              grammarOrderQuery,
                              {$set: {order: order}},
                              function (err, result) {
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
};

exports.updateVocab = (req, res, next) => {
    let {vocab, storyId} = req;
    let query = {
      _id: ObjectID(vocab._id)
    };
    db.collection('VOC_MODKR_ALL').findOne(query, function (err, result) {
      if (err) throw err
      let updatedDocument = {
        korean: vocab.korean,
        hanja: vocab.hanja,
        english: vocab.english
      };
      if (result === null) updatedDocument["storyList"] = [storyId]
      db
        .collection(`VOC_MODKR_ALL`)
        .updateOne(query, {$set: {...updatedDocument}}, function (err, result) {
          if (err) throw err;
          res.send({
            vocab
          });
        });
    })
};

exports.deleteVocab = (req, res, next) => {
    let {vocab, storyId} = req;

    let storyIdquery = {
      _id: ObjectID(storyId)
    };

    db
      .collection(`STORY_KR_SUM`)
      .find(storyIdquery)
      .toArray(function (err, storyResult) {
        if (err) throw err;
        if (storyResult.length === 0)
          throw `Cannot find story for storyTitle: ${storyId}`;
        let storyId = storyResult[0]._id.toString();
        let query = {
          korean: vocab.korean,
          hanja: vocab.hanja,
          english: vocab.english
        };
        db
          .collection(`VOC_MODKR_ALL`)
          .find(query)
          .toArray(function (err, result) {
            if (err) throw err;
            let vocabToRemove = result[0];
            let vocabId = vocabToRemove._id.toString();
            let storyList = vocabToRemove.storyList;
            storyList.splice(storyList.indexOf(storyId), 1);
            db
              .collection(`VOC_MODKR_ALL`)
              .updateOne(query, {$set: {storyList: storyList}}, function (
                err,
                result
              ) {
                if (err) throw err;
                let orderQuery = {
                  storyId: storyId
                };
                db
                  .collection(`VOC_MODKR_ORDER`)
                  .find(orderQuery)
                  .toArray(function (err, orderResult) {
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
                    db
                      .collection(`VOC_MODKR_ORDER`)
                      .updateOne(
                        orderQuery,
                        {$set: {order: order}},
                        function (err, result) {
                          if (err) throw err;
                          res.send({
                            vocab
                          });
                        }
                      );
                  });
              });
          });
  });
};

exports.updateGrammar = (req, res, next) => {
    let {grammar, storyId} = req;
    let query = {
      _id: ObjectID(grammar._id)
    };

    db.collection("GRAM_MODKR_ALL").findOne(query, function (err, result) {
      if (err) throw err
      let updatedDocument = {
        sentence: grammar.sentence,
        pattern: grammar.pattern,
        here: grammar.here
      };
      if (result === null) updatedDocument["storyList"] = [storyId]
      db
        .collection(`GRAM_MODKR_ALL`)
        .updateOne(query, {$set: updatedDocument}, function (err, result) {
          if (err) throw err;
          res.send({
            grammar
          });
        });
    })

};

exports.deleteGrammar = (req, res, next) => {
    let {grammar, storyId} = req;

    let storyIdquery = {
      _id: ObjectID(storyId)
    };

    db
      .collection(`STORY_KR_SUM`)
      .find(storyIdquery)
      .toArray(function (err, storyResult) {
        if (err) throw err;
        if (storyResult.length === 0)
          throw `Cannot find story for storyTitle: ${storyId}`;
        let storyId = storyResult[0]._id.toString();
        let query = {
          sentence: grammar.sentence,
          pattern: grammar.pattern,
          here: grammar.here
        };
        db
          .collection(`GRAM_MODKR_ALL`)
          .find(query)
          .toArray(function (err, result) {
            if (err) throw err;
            let grammarToRemove = result[0];
            let grammarId = grammarToRemove._id.toString();
            let storyList = grammarToRemove.storyList;
            storyList.splice(storyList.indexOf(storyId), 1);
            db
              .collection(`GRAM_MODKR_ALL`)
              .updateOne(query, {$set: {storyList: storyList}}, function (
                err,
                result
              ) {
                if (err) throw err;
                let orderQuery = {
                  storyId: storyId
                };
                db
                  .collection(`GRAM_MODKR_ORDER`)
                  .find(orderQuery)
                  .toArray(function (err, orderResult) {
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
                    db
                      .collection(`GRAM_MODKR_ORDER`)
                      .updateOne(
                        orderQuery,
                        {$set: {order: order}},
                        function (err, result) {
                          if (err) throw err;
                          res.send({
                            grammar
                          });
                        }
                      );
                  });
              });
          });
  });
};

exports.getMiddleKRGram = (req, res, next) => {
    db
      .collection(`GRAM_MIDKR_ALL`)
      .find()
      .toArray(function (err, grammarResult) {
        if (err) throw err;
        res.json({
          status: "200OK",
          middleKRGram: grammarResult
        });
      });
};

exports.addMiddleKoreanGrammar = (grammar, res, next) => {
    let query = {
      engCat: grammar.engCat,
      annotation: grammar.annotation,
      romShape: grammar.romShape,
      hankulShape: grammar.hankulShape
    };
    db
      .collection(`GRAM_MIDKR_ALL`)
      .find(query)
      .toArray(function (err, grammarResult) {
        if (err) throw err;
        db
          .collection(`GRAM_MIDKR_ALL`)
          .findOneAndUpdate(query, {$set: grammar}, {upsert: true, returnOriginal: false}, function (err, result) {
            if (err) throw err;
            res.json({
              status: "200OK",
              grammar: result.value
            });
          });
      });
};

exports.updateMiddleKoreanGrammar = (params, res, next) => {
  const grammarList = params.grammarList
  const deletedGrammarList = params.deletedGrammarList

    grammarList.map(aGrammarEntry => {
      aGrammarEntry["lastUpdated"] = new Date()
      let query = {
        _id: ObjectID(aGrammarEntry._id)
      }

      delete aGrammarEntry._id
      db.collection("GRAM_MIDKR_ALL").findOneAndUpdate(query, {$set: aGrammarEntry}, {upsert: true})
    })

    deletedGrammarList.forEach(aGrammarEntry => {
      let query = {
        _id: ObjectID(aGrammarEntry._id)
      }
      db.collection("GRAM_MIDKR_ALL").findOneAndDelete(query)
    })

    db.collection("GRAM_MIDKR_ALL").find().toArray(function (err, result) {
      if (err) throw(err)
      res.json({
        status: "200OK",
        grammarList: result
      })
    })
}

exports.deleteMiddleKoreanGrammer = (params, res, next) => {
  const grammarEntry = params.deleteGrammar;
  let query = {
    _id: ObjectID(grammarEntry._id)
  }
    db.collection("GRAM_MIDKR_ALL").deleteOne(query).then(success => {
      if (success.result.ok) {
        db.collection("GRAM_MIDKR_ALL").find().toArray(function (err, result) {
          if (err) throw(err)
          res.json({
            grammarList: result
          })
        })
      }
    })

}

exports.getMiddleKRVoc = (req, res, next) => {
    db.collection("VOC_MIDKR_ALL").find().toArray(function (err, result) {
      if (err) throw(err)
      res.json({
        status: "200OK",
        vocabList: result
      })
    })
}

exports.updateMiddleKoreanVoc = (vocab, res, next) => {
  const vocabList = vocab.vocabList
  const deletedVocabList = vocab.deletedVocabList

    for (const aVocabEntry of vocabList) {
      aVocabEntry["lastUpdated"] = new Date()
      let query = {
        _id: ObjectID(aVocabEntry._id)
      }
      delete aVocabEntry._id
      let VOC_MIDKR_ALL = dbo.collection("VOC_MIDKR_ALL")
      VOC_MIDKR_ALL.findOneAndUpdate(query, {$set: aVocabEntry}, {upsert: true}).then(() => {
          for (const aVocabEntry of deletedVocabList) {
              let query = {
                  _id: ObjectID(aVocabEntry._id)
              }
          }
      }).then(() => {
          db.collection("VOC_MIDKR_ALL").findOneAndDelete(query)
      }).then(() => {
          db.collection("VOC_MIDKR_ALL").find().toArray(function (err, result) {
              if (err) throw(err)
              res.json({
                  status: "200OK",
                  vocabList: result
              })
          })
      }).catch(err => {throw(err)})
    }
}

exports.deleteMiddleKoreanVoc = (vocab, res, next) => {
  const vocabEntry = vocab.deleteVocab
  let query = {
    _id: ObjectID(vocabEntry._id)
  }
    db.collection("VOC_MIDKR_ALL").deleteOne(query).then(success => {
      if (success.result.ok) {
        db.collection("VOC_MIDKR_ALL").find().toArray(function (err, result) {
          if (err) throw(err)
          res.json({
            vocabList: result
          })
        })
      }
    })
}

exports.getClasses = (req, res, next) => {
  const {instructorId} = req.query;
  let query = {
    instructorId
  }
    db.collection("CLASSES").find(query).toArray(function (err, result) {
      if (err) throw(err)
      res.json({
        result
      })
    })
}

exports.updateClass = (req, res, next) => {
  const {newClass} = req.body;
    let query = {
      _id: (ObjectID(newClass._id))
    }
    delete newClass._id
    db.collection(`CLASSES`).findOneAndUpdate(query, {$set: newClass}, {
      upsert: true,
      returnOriginal: false
    }, function (err, result) {
      if (err) throw(err)
      res.json({
        newClass: result.value
      })
    })
}

exports.deleteClass = (req, res, next) => {
  const {instructorId, classId} = req.body
    let query = {
      _id: ObjectID(classId),
      instructorId
    }
    db.collection(`CLASSES`).deleteOne(query).then(success => {
      if (success.result.ok) {
        res.json({
          success: true
        })
      }
    })
}

