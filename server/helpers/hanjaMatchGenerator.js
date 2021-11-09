function isHangul(str, options) {
    if (
        options !== undefined &&
        options.removeSpace
    )
        str = str.replace(/(\s*)/g, "");

    var result = [];

    for (var i = 0; i < str.length; i++) {
        var uniChar = str.charCodeAt(i);

        if (
            options !== undefined &&
            options.onlyCombined
        )
            result.push(
                uniChar >= 0xAC00 &&
                uniChar <= 0xD7A3
            );
        else
            result.push(
                (
                    uniChar >= 0x1100 &&
                    uniChar <= 0x11FF
                ) ||
                (
                    uniChar >= 0x3130 &&
                    uniChar <= 0x318F
                ) ||
                (
                    uniChar >= 0xAC00 &&
                    uniChar <= 0xD7A3
                )
            );
    }
    return result;
}

function isPunctuation(str, options) {
    if (
        options !== undefined &&
        options.removeSpace
    )
        str = str.replace(/(\s*)/g, "");

    var result = [];

    for (var i = 0; i < str.length; i++) {
        let tables = str.replace('\t', " ");
        // let punctuationless = tables.replace(/(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/g, "")
        let punctuationless = tables.replace(/(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|:|\"|<|>|\?|\\|\||-|_|\+|=)/g, "")
        let finalString = punctuationless.replace(/\s{2,}/g, " ");
        result.push(finalString);
    }
    return result;
}

function getHanjaInSentence(str) {
    let hangulInSent = [];
    let hanjaInSent = [];
    let engPre = [];

    let inputArray = str.split(/\n/);


    for (let row of inputArray) {
        let puncArr = isPunctuation(row);
        let punc = puncArr[0];
        if (punc === undefined) {
            continue;
        }

        for (let i = 0; i < punc.length; i++) {
            let hangulBool = isHangul(punc[i]);
            let isNecessaryPuncForEnglishGloss = (
                punc[i] === " " ||
                punc[i] === "–" ||
                punc[i] === ";" ||
                punc[i] === "'" ||
                punc[i] === "," ||
                punc[i] === "‘" ||
                punc[i] === "’");
            let englishRegex = /^[a-zA-Z]+$/;
            if (hangulBool.includes(true)) {
                hangulInSent.push({row: row, hangul: punc[i]});
            } else if (hangulBool.includes(false) && !isNecessaryPuncForEnglishGloss && !punc[i].match(englishRegex)) {
                hanjaInSent.push({row: row, hanja: punc[i]});
            } else {
                engPre.push({row: row, englishGloss: punc[i]});
            }
        }
    }
    return hanjaInSent;
}


function getHanqcaMatchArray(str) {
    // FINAL HANQCAMATCH (YEMUN)
    const hanjaInSent = getHanjaInSentence(str);
    let t = [];
    let newData = hanjaInSent.reduce((result, curr) => {
        let findIndex = result.findIndex((item) => {
            return item.row === curr.row;
        })

        if (findIndex === -1) { // no matching index
            result.push(curr);
        } else {
            let joined = [];
            joined = result[findIndex].hanja.concat(curr.hanja);
            let noPunctuationInHanja = joined.replace(/([0-9]|≪|≫|~|`|^|&|\*|\(|\)|{|}|\[|\]|;|:|\"|'|<|,|\.|>|\?|\/|\\|\||-)/g, "");
            let noSpaceNoPunc = noPunctuationInHanja.replace(/\s+/g, "");
            let joinedObj = {row: result[findIndex].row, hanja: noSpaceNoPunc};
            result[findIndex] = Object.assign({}, result[findIndex], joinedObj);
        }
        return result;
    }, []);


    for (let i of newData) {
        t.push(i.hanja);
    }

    let charArrays = [];

    for (let charString of t) {
        let initialArr = Array.from(charString);
        let uniqueCharArray = [];
        for (let individualChar of initialArr) {
            if (!uniqueCharArray.includes(individualChar)) {
                uniqueCharArray.push(individualChar);
            }
        }
        charArrays.push(uniqueCharArray);
    }
    
    const result = [...new Set(charArrays)];
    if (!result.length) { return null; }

    if (result[0].length > 1) {
        return result;
    }
    return result[0];
}


module.exports = {
    getHanqcaMatchArray,
};
