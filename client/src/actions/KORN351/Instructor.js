import {
    getMainText,
    getAboutNewBusu,
    getNewHanjaCombos,
    getNewVocabulary,
    getNewHanja
} from "./Lessons";

import {
    getCharacters,
    getPhonetics,
    getRadicals
} from "./Okpyeon";

import axios from "axios";

export const saveMainText = (lesson, mainText) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.put("/api/story/saveMainText", {params: {lesson: lesson, mainText: mainText}}).then(resp => {
            alert("Success");
            getMainText(lesson);
            resolve()
        })
    })
};

export const saveExampleSentence = (lesson, exSentences) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.put("/api/story/saveExampleSentence", {params: {lesson: lesson, exSentences: exSentences}}).then(resp => {
            alert("Success");
            getMainText(lesson);
            resolve()
        })
    })
};

export const addNewExampleSentence = (lesson, exSentences) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.put("/api/story/addNewExampleSentence", {params: {lesson: lesson, exSentences: exSentences}}).then(resp => {
            alert("Success");
            getMainText(lesson);
            resolve();
        })
    })
};

export const deleteExampleSentence = (lesson, id) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.put("/api/story/deleteExampleSentence", {params: {lesson: lesson, id: id}}).then(resp => {
            // alert("Success");
            getMainText(lesson);
            resolve();
        })
    })
};

export const saveOthers = (lesson, subHeading, content) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.put("/api/story/saveOthers", {params: {lesson: lesson, subHeading: subHeading, content: content}}).then(resp => {
            alert("Success");
            getMainText(lesson);
            resolve()
        })
    })
};

export const saveAboutNewBusu = (lesson, id, word, def, busu, descr, examples) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.put("/api/instructor351/saveAboutNewBusu", {params: {lesson: lesson, id: id, word: word, def: def, busu: busu, descr: descr, examples: examples}}).then(resp => {
            getAboutNewBusu();
            alert("Success");
            resolve()
        })
    })
};
export const deleteAboutNewBusu = (lesson, id) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.put("/api/instructor351/deleteAboutNewBusu", {params: {lesson: lesson, id: id}}).then(resp => {
            getAboutNewBusu();
            alert("Success");
            resolve();
            window.location.reload();
        })
    })
};

export const saveNewPhonetic = (lesson, id, phonetic, pronunciation, characters, subPronunciation, subCharacters) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.put("/api/instructor351/saveNewPhonetic", {params: {lesson: parseInt(lesson), id: id, phonetic: phonetic, pronunciation: pronunciation, characters: characters,
                subPronunciation: subPronunciation, subCharacters: subCharacters}}).then(resp => {
            getPhonetics();
            alert("Success");
            resolve()
        })
    })
};
export const deleteNewPhonetic = (lesson, id) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.put("/api/instructor351/deleteNewPhonetic", {params: {lesson: parseInt(lesson), id: id}}).then(resp => {
            getPhonetics();
            alert("Success");
            resolve();
            window.location.reload();
        })
    })
};

export const saveNewHanjaCombo = (lesson, id, hanja, kor, eng) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.put("/api/instructor351/saveNewHanjaCombo", {params: {lesson: lesson, id: id, hanja: hanja, kor: kor, eng: eng}}).then(resp => {
            getNewHanjaCombos();
            alert("Success");
            resolve()
        })
    })
};
export const deleteNewHanjaCombo = (lesson, id, hanja, kor, eng) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.put("/api/instructor351/deleteNewHanjaCombo", {params: {lesson: lesson, id: id}}).then(resp => {
            getNewHanjaCombos();
            alert("Success");
            resolve();
            window.location.reload();
        })
    })
};

export const saveSideBarVocab = (lesson, mainText, exSentences) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.put("/api/instructor351/saveSideBarVocab", {params: {lesson: lesson, mainText: mainText, exSentences: exSentences}}).then(resp => {
            getNewVocabulary(parseInt(lesson));
            alert("Success");
            resolve()
        })
    })
};

export const saveHanjaCharacter = (lesson, id, additionalHoonMeaning, characterStrokeCount, eum, hanja, hoonEum, meaning, phonetic, primaryHoonMeaning, radical, radicalHangul, radicalStrokeCount, totalStrokeCount) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.put("/api/instructor351/saveHanjaCharacter", {params: {lesson: parseInt(lesson), id: id, additionalHoonMeaning: additionalHoonMeaning, characterStrokeCount: characterStrokeCount
                , eum: eum, hanja: hanja, hoonEum: hoonEum, meaning: meaning, phonetic: phonetic, primaryHoonMeaning: primaryHoonMeaning
                , radical: radical, radicalHangul: radicalHangul, radicalStrokeCount: radicalStrokeCount, totalStrokeCount: totalStrokeCount}}).then(resp => {
            getNewHanja();
            alert("Success");
            resolve();
            window.location.reload();
        })
    })
};

export const deleteHanjaCharacter = (lesson, id) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.put("/api/instructor351/deleteHanjaCharacter", {params: {lesson: parseInt(lesson), id: id}}).then(resp => {
            getNewHanja();
            resolve();
            window.location.reload();
        })
    })
};

export const saveCharacter = (lesson, id, additionalHoonMeaning, characterStrokeCount, eum, hanja, hoonEum, meaning, phonetic, primaryHoonMeaning, radical, radicalHangul, radicalStrokeCount, totalStrokeCount) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.put("/api/instructor351/saveCharacter", {params: {lesson: parseInt(lesson), id: id, additionalHoonMeaning: additionalHoonMeaning, characterStrokeCount: characterStrokeCount
                , eum: eum, hanja: hanja, hoonEum: hoonEum, meaning: meaning, phonetic: phonetic, primaryHoonMeaning: primaryHoonMeaning
                , radical: radical, radicalHangul: radicalHangul, radicalStrokeCount: radicalStrokeCount, totalStrokeCount: totalStrokeCount}}).then(resp => {
            getCharacters();
            alert("Success");
            resolve()
        })
    })
};
export const deleteCharacter = (lesson, id) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.put("/api/instructor351/deleteCharacter", {params: {lesson: parseInt(lesson), id: id}}).then(resp => {
            getCharacters();
            alert("Success");
            resolve();
            window.location.reload();
        })
    })
};

export const savePhonetic = (lesson, id, characters, phonetic, pronunciation, sub_pronunciation, sub_characters) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.put("/api/instructor351/savePhonetic", {params: {lesson: parseInt(lesson), id: id, characters: characters, phonetic: phonetic, pronunciation: pronunciation,sub_pronunciation:sub_pronunciation, sub_characters:sub_characters}}).then(resp => {
            getPhonetics();
            alert("Success");
            resolve()
        })
    })
};
export const deletePhonetic = (lesson, id) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.put("/api/instructor351/deletePhonetic", {params: {lesson: parseInt(lesson), id: id}}).then(resp => {
            getCharacters();
            alert("Success");
            resolve();
            window.location.reload();
        })
    })
};

export const saveRadical = (lesson, id, additionalHoonMeaning, characterStrokeCount, hoonEum, meaning, primaryHoonMeaning, radical, radicalHangul, radicalStrokeCount, totalStrokeCount) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.put("/api/instructor351/saveRadical", {params: {lesson: parseInt(lesson), id: id, additionalHoonMeaning:additionalHoonMeaning, characterStrokeCount:characterStrokeCount, hoonEum:hoonEum, meaning:meaning,
                primaryHoonMeaning:primaryHoonMeaning, radical:radical, radicalHangul:radicalHangul, radicalStrokeCount:radicalStrokeCount, totalStrokeCount:totalStrokeCount}}).then(resp => {
            getRadicals();
            alert("Success");
            resolve()
        })
    })
};
export const deleteRadical = (lesson, id) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.put("/api/instructor351/deleteRadical", {params: {lesson: parseInt(lesson), id: id}}).then(resp => {
            getRadicals();
            alert("Success");
            resolve();
            window.location.reload();
        })
    })
};
