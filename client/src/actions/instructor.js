import {
  INSTRUCTOR_LOADING,
  CHANGE_INSTRUCTOR_SELECTED_MENU,
  ADD_NEW_STORY,
  ADD_STORY_INFO,
  CLOSE_STATUS_BAR,
  INSTRUCTOR_INIT,
  INSTRUCTOR_GET_GRAMMAR,
  INSTRUCTOR_GET_VOCAB,
  INIT_EDIT_VOCAB,
  INIT_EDIT_GRAMMAR,
  INSTRUCTOR_EDIT_VOCAB_UPDATE_SELECTED_VOCAB,
  INSTRUCTOR_EDIT_GRAMMAR_UPDATE_SELECTED_GRAMMAR,
  INSTRUCTOR_UPDATE_HIGHLIGHTED_TEXT,
  INSTRUCTOR_EDIT_VOCAB_CLEAR_SELECTED_VOCAB,
  INSTRUCTOR_START_UPDATING_HIGHLIGHTED_TEXT,
  INSTRUCTOR_START_UPDATING_EDIT_GRAMMAR,
  INSTRUCTOR_UPDATE_VOCAB,
  INSTRUCTOR_UPDATE_GRAMMAR,
  INSTRUCTOR_START_UPDATING_EDIT_VOCAB,
  INSTRUCTOR_ADD_NEW_VOCAB,
  INSTRUCTOR_ADD_NEW_GRAMMAR,
  INSTRUCTOR_RESET_EDIT_VOCAB,
  INSTRUCTOR_RESET_EDIT_GRAMMAR,
  INSTRUCTOR_DELETE_VOCAB,
  INSTRUCTOR_DELETE_GRAMMAR,
  INSTRUCTOR_CANCEL_SELECTION,
  GET_STORY_LIST,
  INSTRUCTOR_GET_MIDDLE_KR_GRAM,
  INSTRUCTOR_ADD_MIDKR_GRAMMAR,
  INTRUCTOR_UPDATE_MIDKR_GRAMMAR,
  INSTRUCTOR_UPDATE_MIDKR_VOCAB,
  INSTRUCTOR_SAVE_MIDKR_GRAM,
  INSTRUCTOR_GET_MIDKR_VOCAB,
  INSTRUCTOR_ADD_MIDKR_VOCAB,
  INSTRUCTOR_SAVE_MIDKR_VOCAB,
  INSTRUCTOR_DELETE_MIDKR_VOCAB,
  INSTRUCTOR_GET_CLASSES,
  INSTRUCTOR_NEW_CLASS,
  INSTRUCTOR_UPDATE_CLASS,
  INSTRUCTOR_GET_FILES,
  INSTRUCTOR_ADD_FILE,
  INSTRUCTOR_CLOSE_ADDMIDKRGRAM_STATUS
} from "../constants/action-types";
import axios from "axios";
import queryStringify from "querystringify";

export const setInstructorLoading = (isLoading) => dispatch => {
  dispatch({
    type: INSTRUCTOR_LOADING,
    payload: isLoading
  })
}
export const initInstructor = storyList => dispatch => {
  const params = {
    responseType: "application/json",
    classType: "all"
  };
  return new Promise((resolve) => {
    axios.get("/api/instructor/", {params}).then(res => {
      if (!storyList) {
        axios.get("/api/dashboard/", {params}).then(response => {
          dispatch({
            type: GET_STORY_LIST,
            payload: response.data
          });
          resolve(response.data);
        });
      }
      dispatch({
        type: INSTRUCTOR_INIT,
        payload: res.data
      });
      resolve(res.data);
    });
  });
};

export const initEditVocab = storyTitle => dispatch => {
  dispatch({
    type: INSTRUCTOR_LOADING,
    payload: true
  })
  let params = {
    responseType: "application/json",
    storyTitle
  };
  return new Promise((resolve) => {
    let payload = {};
    axios.get(`/api/story`, {params}).then(res => {
      let languages = res.data.storyInfo.languages;

      let storyInfo = res.data.storyInfo;
      payload.storyInfo = storyInfo

      languages.forEach(aLanguage => {
        let data = res.data[`${aLanguage}`];
        if (data.vocabOrder && data.vocabList) {
          let {vocabOrder, vocabList} = data;
          let order = vocabOrder.order;
          vocabList.sort(function (a, b) {
            return order.indexOf(a._id) - order.indexOf(b._id);
          });
          let vocabSearch = {};
          vocabList.forEach(aVocab => {
            if (
              aVocab.korean.indexOf("(") >= -1 ||
              aVocab.korean.indexOf(")") >= -1
            ) {
              let temp = aVocab.korean;
              let cleanVocab = temp.replace("(", "(");
              cleanVocab = cleanVocab.replace(")", ")");
              vocabSearch[cleanVocab] = aVocab;
            } else {
              vocabSearch[aVocab.korean] = aVocab;
            }
          });

          res.data[`${aLanguage}`] = {
            vocabOrder,
            vocabList,
            vocabSearch
          };

          payload = res.data;
        }
        let query = queryStringify.stringify(storyInfo)
        axios.get(`/api/story/storyText?${query}`).then(res => {
            let languages = Object.keys(res.data);
            languages.forEach(aLanguage => {
              let rawKoreanText = "";
              let storyText = res.data[aLanguage];

              storyText.forEach(aText => {
                rawKoreanText = rawKoreanText.concat(aText.text);
              });
              payload[aLanguage] = {
                ...payload[aLanguage],
                storyText: res.data[aLanguage],
                rawKoreanText
              };
            });
            dispatch({
              type: INIT_EDIT_VOCAB,
              payload
            });
            dispatch({
              type: INSTRUCTOR_LOADING,
              payload: false
            })
            resolve(payload);
          });
      });
    });
  });
};

export const resetEditVocab = () => dispatch => {
  dispatch({
    type: INSTRUCTOR_RESET_EDIT_VOCAB,
    payload: null
  });
};

export const resetEditGrammar = () => dispatch => {
  dispatch({
    type: INSTRUCTOR_RESET_EDIT_GRAMMAR,
    payload: null
  });
};

export const initEditGrammar = storyTitle => dispatch => {
  let params = {
    responseType: "application/json",
    storyTitle
  };
  dispatch({
    type: INSTRUCTOR_LOADING,
    payload: true
  })
  return new Promise((resolve) => {
    let payload = {};
    axios.get(`/api/story`, {params}).then(res => {
      let languages = res.data.storyInfo.languages;

      let storyInfo = res.data.storyInfo;
      payload.storyInfo = storyInfo

      languages.forEach(aLanguage => {
        let data = res.data[`${aLanguage}`];
        if (data.grammarOrder && data.grammarList) {
          let {grammarOrder, grammarList} = data;
          let order = grammarOrder.order;
          grammarList.sort(function (a, b) {
            return order.indexOf(a._id) - order.indexOf(b._id);
          });

          let grammarSearch = {};
          grammarList.forEach(aGrammar => {
            if (
              aGrammar.sentence.indexOf("(") >= -1 ||
              aGrammar.korean.indexOf(")") >= -1
            ) {
              let temp = aGrammar.sentence;
              let cleanGrammar = temp.replace("(", "\\(");
              cleanGrammar = cleanGrammar.replace(")", "\\)");
              grammarSearch[cleanGrammar] = aGrammar;
            } else {
              grammarSearch[aGrammar.sentence] = aGrammar;
            }

            res.data[`${aLanguage}`] = {
              grammarOrder,
              grammarList,
              grammarSearch
            };

            payload = res.data;
          });
        }
        let query = queryStringify.stringify(storyInfo)
        axios.get(`/api/story/storyText?${query}`)
          .then(res => {
            let languages = Object.keys(res.data);
            languages.forEach(aLanguage => {
              let rawKoreanText = "";
              let storyText = res.data[aLanguage];

              storyText.forEach(aText => {
                rawKoreanText = rawKoreanText.concat(aText.text);
              });
              payload[aLanguage] = {
                ...payload[aLanguage],
                storyText: res.data[aLanguage],
                rawKoreanText
              };
            });
            dispatch({
              type: INIT_EDIT_GRAMMAR,
              payload
            });
            dispatch({
              type: INSTRUCTOR_LOADING,
              payload: false
            })
            resolve(payload);
          });
      });
    });
  });
};

export const changeSelectedMenu = headerName => dispatch => {
  let payload = {
    headerName
  };
  dispatch({
    type: CHANGE_INSTRUCTOR_SELECTED_MENU,
    payload
  });
};

export const addToStory = (text, storyInfo) => dispatch => {
  let params = {
    text,
    storyInfo
  };

  axios.put("/api/instructor/addStory", params).then(res => {
    let message;
    if (res.data.status === 200) {
      message = "Story added Successfully!";
    } else {
      message = "Error adding story. Story not saved.";
    }
    dispatch({
      type: ADD_NEW_STORY,
      payload: {
        status: res.data.status === 200,
        message
      }
    });
  });
};

export const addStoryInfo = storyInfo => dispatch => {
  let params = {
    storyInfo
  };
  axios.put("/api/instructor/addStoryInfo", params).then((resp) => {
    dispatch({
      type: ADD_STORY_INFO,
      payload: resp.data.storyInfo
    });
  });
};

export const handleStatusClose = () => dispatch => {
  dispatch({
    type: CLOSE_STATUS_BAR,
    payload: null
  });
};

export const getVocabulary = storyInfo => dispatch => {
  const params = {
    responseType: "application/json",
    classType: "all",
    storyInfo
  };
  dispatch({
    type: INSTRUCTOR_LOADING,
    payload: true
  })
  return new Promise((resolve) => {
    axios.get("/api/instructor/getVocab", {params}).then(res => {
      dispatch({
        type: INSTRUCTOR_GET_VOCAB,
        payload: res.data
      });
      dispatch({
        type: INSTRUCTOR_LOADING,
        payload: false
      })
      resolve(res.data);
    });
  });
};

export const getGrammar = storyInfo => dispatch => {
  const params = {
    responseType: "application/json",
    classType: "all",
    storyInfo
  };
  dispatch({
    type: INSTRUCTOR_LOADING,
    payload: true
  })
  return new Promise((resolve) => {
    axios.get("/api/instructor/getGrammar", {params}).then(res => {
      dispatch({
        type: INSTRUCTOR_GET_GRAMMAR,
        payload: res.data
      });
      dispatch({
        type: INSTRUCTOR_LOADING,
        payload: false
      })
      resolve(res.data);
    });
  });
};

export const updateSelectedVocab = selectedVocab => dispatch => {
  dispatch({
    type: INSTRUCTOR_EDIT_VOCAB_UPDATE_SELECTED_VOCAB,
    payload: selectedVocab
  });
};

export const updateSelectedGrammar = selectedGrammar => dispatch => {
  dispatch({
    type: INSTRUCTOR_EDIT_GRAMMAR_UPDATE_SELECTED_GRAMMAR,
    payload: selectedGrammar
  });
};

export const clearSelectedVocab = () => dispatch => {
  dispatch({
    type: INSTRUCTOR_EDIT_VOCAB_CLEAR_SELECTED_VOCAB,
    payload: null
  });
};

export const updateUserHighlightedText = (text, component) => dispatch => {
  let payload = {
    text,
    component
  };
  dispatch({
    type: INSTRUCTOR_UPDATE_HIGHLIGHTED_TEXT,
    payload
  });
};

export const startUpdatingHighlightedText = component => dispatch => {
  dispatch({
    type: INSTRUCTOR_START_UPDATING_HIGHLIGHTED_TEXT,
    payload: component
  });
};

export const updateVocab = (vocab, storyId) => dispatch => {
  let params = {
    vocab,
    storyId
  };
  dispatch({
    type: INSTRUCTOR_LOADING,
    payload: true
  })
  axios.put("/api/instructor/editVocab/updateVocab", params).then(resp => {
    dispatch({
      type: INSTRUCTOR_UPDATE_VOCAB,
      payload: {
        vocab: resp.data.vocab,
        message: "Successfully Updated Vocabulary"
      }
    });
    dispatch({
      type: INSTRUCTOR_LOADING,
      payload: false
    })
  });
};

export const updateGrammar = (grammar, storyTitle) => dispatch => {
  let params = {
    grammar,
    storyTitle
  };
  dispatch({
    type: INSTRUCTOR_LOADING,
    payload: true
  })
  axios.put("/api/instructor/editGrammar/updateGrammar", params).then(resp => {
    dispatch({
      type: INSTRUCTOR_UPDATE_GRAMMAR,
      payload: {
        grammar: resp.data.grammar,
        message: "Successfully Updated Grammar"
      }
    });
    dispatch({
      type: INSTRUCTOR_LOADING,
      payload: false
    })
  });
};

export const startUpdatingEditVocab = () => dispatch => {
  dispatch({
    type: INSTRUCTOR_START_UPDATING_EDIT_VOCAB,
    payload: null
  });
};

export const startUpdatingEditGrammar = () => dispatch => {
  dispatch({
    type: INSTRUCTOR_START_UPDATING_EDIT_GRAMMAR,
    payload: null
  });
};

export const addNewVocabulary = (vocab, storyId) => dispatch => {
  let params = {
    vocab,
    storyId
  };
  dispatch({
    type: INSTRUCTOR_LOADING,
    payload: true
  })
  axios.put("/api/instructor/editVocab/addVocab", params).then(resp => {
    dispatch({
      type: INSTRUCTOR_ADD_NEW_VOCAB,
      payload: resp.data.vocab
    });
    dispatch({
      type: INSTRUCTOR_LOADING,
      payload: false
    })
  });
};

export const addNewGrammar = (grammar, storyId) => dispatch => {
  let params = {
    grammar,
    storyId
  };
    dispatch({
        type: INSTRUCTOR_LOADING,
        payload: true
    })
  axios.put("/api/instructor/editGrammar/addGrammar", params).then(resp => {
    dispatch({
      type: INSTRUCTOR_ADD_NEW_GRAMMAR,
      payload: resp.data.grammar
    });
      dispatch({
          type: INSTRUCTOR_LOADING,
          payload: false
      })
  });
};

export const deleteVocab = (vocab, storyId) => dispatch => {
  let params = {
    vocab,
    storyId
  };
  axios.put("/api/instructor/editVocab/deleteVocab", params).then(resp => {
    dispatch({
      type: INSTRUCTOR_DELETE_VOCAB,
      payload: resp.data.vocab
    });
  });
};

export const deleteGrammar = (grammar, storyId) => dispatch => {
  let params = {
    grammar,
    storyId
  };
  axios.put("/api/instructor/editGrammar/deleteGrammar", params).then(resp => {
    dispatch({
      type: INSTRUCTOR_DELETE_GRAMMAR,
      payload: resp.data.grammar
    });
  });
};

export const cancelSelection = () => dispatch => {
  dispatch({
    type: INSTRUCTOR_CANCEL_SELECTION,
    payload: null
  });
};

export const getMiddleKoreanGram = () => dispatch => {
  axios.get("/api/instructor/midkr-gram").then(resp => {
    if (resp.data.status === "200OK") {
      dispatch({
        type: INSTRUCTOR_GET_MIDDLE_KR_GRAM,
        payload: resp.data.middleKRGram
      });
    }
  });
};

export const addMiddleKoreanGrammar = grammar => dispatch => {
  dispatch({
    type: INSTRUCTOR_ADD_MIDKR_GRAMMAR,
    payload: {
      grammar,
      status: "Grammar added successfully"
    }
  })
};

export const updateMiddleKrGrammarEntry = grammarList => dispatch => {
  dispatch({
    type: INTRUCTOR_UPDATE_MIDKR_GRAMMAR,
    payload: grammarList
  })
}

export const saveMidKrGram = (grammarList, deletedGrammarList) => dispatch => {
  dispatch({
    type: INSTRUCTOR_LOADING,
    payload: true
  })
  let params = {
    grammarList,
    deletedGrammarList
  }
  axios.put("/api/instructor/midkr-gram", params).then(resp => {
    dispatch({
      type: INSTRUCTOR_SAVE_MIDKR_GRAM,
      payload: resp.data.grammarList
    })
    dispatch({
      type: INSTRUCTOR_LOADING,
      payload: false
    })
  })
}

export const getMiddleKoreanVocab = () => dispatch => {
  axios.get("/api/instructor/midkr-voc").then(resp => {
    if (resp.data.status === "200OK") {
      dispatch({
        type: INSTRUCTOR_GET_MIDKR_VOCAB,
        payload: resp.data.vocabList
      });
    }
  });
};

export const addMiddleKoreanVocab = vocab => dispatch => {
  dispatch({
    type: INSTRUCTOR_ADD_MIDKR_VOCAB,
    payload: {
      vocab,
      status: "Vocab added successfully"
    }
  })
}

export const updateMiddleKoreanVocabEntry = vocabList => dispatch => {
  dispatch({
    type: INSTRUCTOR_UPDATE_MIDKR_VOCAB,
    payload: vocabList
  })
}

export const saveMidKrVocab = (vocabList, deletedVocabList) => dispatch => {
  dispatch({
    type: INSTRUCTOR_LOADING,
    payload: true
  })
  let params = {
    vocabList,
    deletedVocabList
  }
  axios.put("/api/instructor/midkr-voc", params).then(resp => {
    dispatch({
      type: INSTRUCTOR_SAVE_MIDKR_VOCAB,
      payload: resp.data.vocabList
    })
    dispatch({
      type: INSTRUCTOR_LOADING,
      payload: false
    })
  })
}

export const deleteMiddleKrVocabEntr = deleteVocab => dispatch => {
  let params = {
    data: {deleteVocab}
  }
  axios.delete("/api/instructor/midkr-voc", params).then(resp => {
    dispatch({
      type: INSTRUCTOR_DELETE_MIDKR_VOCAB,
      payload: resp.data.vocabList
    })
  })
}

export const closeAddMidKrStatus = () => dispatch => {
  dispatch({
    type: INSTRUCTOR_CLOSE_ADDMIDKRGRAM_STATUS,
    payload: null
  })
}

export const getClasses = (instructorId) => dispatch => {
  axios.get(`/api/instructor/classes?instructorId=${instructorId}`).then(resp => {
    dispatch({
      type: INSTRUCTOR_GET_CLASSES,
      payload: resp.data.result
    })
  })
}

export const addNewClass = (newClass, history) => dispatch => {
  axios.post('/api/instructor/classes', {newClass}).then(resp => {
    dispatch({
      type: INSTRUCTOR_NEW_CLASS,
      payload: resp.data.newClass
    })
    history.push('/instructor/classes')
  })
}

export const updateClass = (newClass, history) => dispatch => {
  axios.put('/api/instructor/classes', {newClass}).then(resp => {
    dispatch({
      type: INSTRUCTOR_UPDATE_CLASS,
      payload: resp.data.newClass
    })
    history.push('/instructor/classes')
  })
}

export const uploadDroppedFiles = (acceptedFiles, user) => dispatch => {
  acceptedFiles.forEach((file) => {
    axios.post("/api/files/signedUrl", {
      fileName: file.name,
      fileType: file.type,
    }).then(resp => {
      const returnData = resp.data.data.returnData;
      const signedRequest = returnData.signedRequest;
      const url = returnData.url;

      const reader = new FileReader()
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        let token = axios.defaults.headers.common["Authorization"]
        delete axios.defaults.headers.common["Authorization"]
        const options = {
          headers: {
            'Content-Type': file.type
          }
        }
        axios.put(signedRequest, file, options)
          .then(result => {
            axios.defaults.headers.common["Authorization"] = token
            axios.put("/api/files/file", {
              instructorId: user.id,
              fileName: file.name,
              fileType: file.type,
              url,
              createdDate: new Date(),
              modifiedDate: new Date()
            }).then(resp => {
              if (resp.data.value) {
                dispatch({
                  type: INSTRUCTOR_ADD_FILE,
                  payload: resp.data.value
                })
              }

            }).catch(error => console.log(error))
          })
          .catch(error => {
            console.log(error)
            axios.defaults.headers.common["Authorization"] = token
          })

      }
      reader.readAsArrayBuffer(file)

    })
  })
}

export const getFiles = (user) => dispatch => {
  axios.get(`/api/files?userId=${user.id}`).then(resp => {
    dispatch({
      type: INSTRUCTOR_GET_FILES,
      payload: resp.data
    })
  })

}