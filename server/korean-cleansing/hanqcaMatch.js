let str = "그는 숱하게 많은 동아리 가운데 그 어느 하나에도 加入하지 않았다.\n" +
    "少年團에 加入하지 못한 아이들에게는 少年團服은 羨望의 對象이었다.\n" // this is an example for YEMUN

// let str = "第一(제일)\t\t\tfirst; number one; primary\n" +
//     "第一課(제일과)\tlesson one\n" +
//     "제삼자(第三者)\t\tthe third party; outsider\n" // this is an example for WORDPOWER

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
        let tabless = str.replace('\t', " ");
        // let punctuationless = tabless.replace(/(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/g, "")
        let punctuationless = tabless.replace(/(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|:|\"|<|>|\?|\\|\||-|_|\+|=)/g, "")
        let finalString = punctuationless.replace(/\s{2,}/g, " ");
        result.push(finalString);
    }
    return result;
}

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

let t = [];

// FINAL HANCQAMATCH (WORDPOWER)
// let newData = hanjaInSent.reduce((result, curr) => {
//     let findIndex = result.findIndex((item) => {
//         return item.row === curr.row;
//     })
//
//     if (findIndex === -1) { // no matching index
//         result.push(curr);
//     } else {
//         let joined = result[findIndex].hanja.concat(curr.hanja);
//         let joinedObj = {row: result[findIndex].row, hanja: joined};
//         result[findIndex] = Object.assign({}, result[findIndex], joinedObj);
//     }
//     return result;
// }, []);
//
// console.log(hanjaInSent);
//
// for (let i of newData) {
//     t.push(i.hanja);
// }
//
// let charArrays = [];
// let abc = [];
//
// for (let char of t) {
//     let j = Array.from(char);
//     charArrays.push(j);
// }
//
// for (let j of charArrays) {
//     abc.push(j.toString());
// }
//
// console.log(charArrays);


// FINAL HANQCAMATCH (YEMUN)
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

console.log(hanjaInSent);

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
console.log(charArrays);