const WordPower = require('../models/WordPower');
const Yemun = require('../models/Yemun');
const { getHanqcaMatchArray } = require('../helpers/hanjaMatchGenerator');

async function createWordPower(req, res) {
    if (!req.body.hanqcaMatch || req.body.hanqcaMatch.length === 0) {
        req.body.hanqcaMatch = getHanqcaMatchArray(req.body.hanqca);
    }
    const wordPower = new WordPower(req.body);
    const words = await WordPower.find({lesson: req.body.lesson, hankul: req.body.hankul})
        .exec()
        .then((words) => {
            if (words.length >= 1) {
                return res.status(409).json({
                    message: "Word already exists",
                });
            } else {
                const newWordPower = wordPower.save();
                return res.status(201).json(wordPower);
            }
        })
        .catch((err) => {
            return res.status(409).json({
                message: err,
            });
        });
}

async function updateWordPower(req, res) {
    const docToUpdate = {...req.body};
    const { hanqca } = req.body;
    if (hanqca) {
        docToUpdate.hanqcaMatch = getHanqcaMatchArray(hanqca);
    }

    const doc = await WordPower.findOne({ _id: req.params.id }).exec();

    for (const [key, value] of Object.entries(docToUpdate)) {
        doc[key] = value;
    }
    try {
        await doc.save();
        return res.status(200).json({ success: true });
    } catch(err) {
        return res.status(500).json({ message: err });
    }
}

async function deleteWordPower(req, res) {
    await WordPower.findOneAndDelete({ _id: req.params.id }).exec();
    return res.status(200).json({ deleted: true });
}

async function updateYemun(req, res) {
    const docToUpdate = {...req.body};
    const { hanqcaizedSentence } = req.body;
    if (hanqcaizedSentence) {
        docToUpdate.hanqcaMatch = getHanqcaMatchArray(hanqcaizedSentence);
    }

    const doc = await Yemun.findOne({ _id: req.params.id }).exec();

    for (const [key, value] of Object.entries(docToUpdate)) {
        doc[key] = value;
    }
    try {
        await doc.save();
        return res.status(200).json({ success: true });
    } catch(err) {
        return res.status(500).json({ message: err });
    }
}

async function deleteYemun(req, res) {
    await Yemun.findOneAndDelete({ _id: req.params.id }).exec();
    return res.status(200).json({ deleted: true });
}

async function createYemun(req, res) {
    const { hanqcaizedSentence, hanqcaMatch } = req.body;
    if (!hanqcaMatch || hanqcaMatch.length === 0) {
        req.body.hanqcaMatch = getHanqcaMatchArray(hanqcaizedSentence);
    }

    const newYemun = new Yemun(req.body);
    Yemun.find({lesson: req.body.lesson, translation: req.body.translation})
        .exec()
        .then((yemuns) => {
            if (yemuns.length >= 1) {
                return res.status(409).json({
                    message: "Yemun document already exists",
                });
            } else {
                newYemun.save().then(() => {
                    return res.status(201).json(newYemun);
                });
            }
        })
        .catch((err) => {
            return res.status(409).json({
                message: err,
            });
        });
}

async function bulkCreate(req, res) {
    const { data, lesson } = req.body;

    const wordPowerSet = new Set();
    const wordPowerData = [];
    const yemunData = [];

    data.forEach(row => {
        const wordpower = `${row['Hanqca']}#${row['Hankul']}#${row['English Gloss']}`;
        const hanqcaMatch = getHanqcaMatchArray(row['Hanqcaized Sentences']);
        
        yemunData.push({
            koreanSentence: row['Korean Sentences'],
            simpleHanqca: row['Simple Hanqca'],
            hanqcaizedSentence: row['Hanqcaized Sentences'],
            translation: row['Translation'],
            hanqcaMatch,
            lesson
        });
        wordPowerSet.add(wordpower);
    });

    Array.from(wordPowerSet).forEach(wordpower => {
        const [hanqca, hankul, englishGloss] = wordpower.split('#');
        const hanqcaMatch = getHanqcaMatchArray(hanqca);
        wordPowerData.push({ hanqca, hankul, englishGloss, hanqcaMatch, lesson });
    });
    
    const wordpowerDocs = await WordPower.insertMany(wordPowerData);
    const yemunDocs = await Yemun.insertMany(yemunData);

    return res.status(201).json({ success: true });
}

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
        let punctuationless = str.replace(/(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/g, "")
        let finalString = punctuationless.replace(/\s{2,}/g, " ");
        result.push(finalString);
    }
    return result;
}

function getSyllable(str, options) {
    if (
        options !== undefined &&
        options.removeSpace
    )
        str = str.replace(/(\s*)/g, "");

    var result = [];

    var CHO_SEONG = [
        "ㄱ", ["ㄱ", "ㄱ"], "ㄴ", "ㄷ", ["ㄷ", "ㄷ"],
        "ㄹ", "ㅁ", "ㅂ", ["ㅂ", "ㅂ"], "ㅅ",
        ["ㅅ", "ㅅ"], "ㅇ", "ㅈ", ["ㅈ", "ㅈ"], "ㅊ",
        "ㅋ", "ㅌ", "ㅍ", "ㅎ",
    ];

    var JUNG_SEONG = [
        "ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ",
        "ㅔ", "ㅕ", "ㅖ", "ㅗ", ["ㅗ", "ㅏ"],
        ["ㅗ", "ㅐ"], ["ㅗ", "ㅣ"], "ㅛ", "ㅜ", ["ㅜ", "ㅓ"],
        ["ㅜ", "ㅔ"], ["ㅜ", "ㅣ"], "ㅠ", "ㅡ", ["ㅡ", "ㅣ"],
        "ㅣ",
    ];

    var JONG_SEONG = [
        "", "ㄱ", ["ㄱ", "ㄱ"], ["ㄱ", "ㅅ"], "ㄴ",
        ["ㄴ", "ㅈ"], ["ㄴ", "ㅎ"], "ㄷ", "ㄹ", ["ㄹ", "ㄱ"],
        ["ㄹ", "ㅁ"], ["ㄹ", "ㅂ"], ["ㄹ", "ㅅ"], ["ㄹ", "ㅌ"], ["ㄹ", "ㅍ"],
        ["ㄹ", "ㅎ"], "ㅁ", "ㅂ", ["ㅂ", "ㅅ"], "ㅅ",
        ["ㅅ", "ㅅ"], "ㅇ", "ㅈ", "ㅊ", "ㅋ",
        "ㅌ", "ㅍ", "ㅎ",
    ];

    for (var i = 0; i < str.length; i++) {
        var uniChar = str.charCodeAt(i);

        if (
            uniChar < 0xAC00 ||
            uniChar > 0xD7A3
        ) {
            if (
                options !== undefined &&
                options.includeOtherLng
            )
                result.push([str[i]]);
            continue;
        }

        var choIndex = Math.floor((uniChar - 0xAC00) / (21 * 28));

        if (
            options !== undefined &&
            ["초성", "cho", "choseong"].includes(options.syllable)
        ) {
            result.push(
                (Array.isArray(CHO_SEONG[choIndex]))
                    ? [...CHO_SEONG[choIndex]]
                    : [CHO_SEONG[choIndex]]
            );
            continue;
        }

        var jungIndex = Math.floor(((uniChar - 0xAC00) % (21 * 28)) / 28);

        if (
            options !== undefined &&
            ["중성", "jung", "jungseong"].includes(options.syllable)
        ) {
            result.push(
                (Array.isArray(JUNG_SEONG[jungIndex]))
                    ? [...JUNG_SEONG[jungIndex]]
                    : [JUNG_SEONG[jungIndex]]
            );
            continue;
        }

        var jongIndex = (uniChar - 0xAC00) % 28;

        if (
            options !== undefined &&
            ["종성", "jong", "jongseong"].includes(options.syllable) &&
            jongIndex >= 1
        ) {
            result.push(
                (Array.isArray(JONG_SEONG[jongIndex]))
                    ? [...JONG_SEONG[jongIndex]]
                    : [JONG_SEONG[jongIndex]]
            );
            continue;
        }

        result.push(
            (jongIndex < 1)
                ? [
                    (Array.isArray(CHO_SEONG[choIndex]))
                        ? [...CHO_SEONG[choIndex]]
                        : CHO_SEONG[choIndex],
                    (Array.isArray(JUNG_SEONG[jungIndex]))
                        ? [...JUNG_SEONG[jungIndex]]
                        : JUNG_SEONG[jungIndex],
                ]
                    .reduce(function (acc, val) {
                        return acc.concat(val);
                    }, [])
                : [
                    (Array.isArray(CHO_SEONG[choIndex]))
                        ? [...CHO_SEONG[choIndex]]
                        : CHO_SEONG[choIndex],
                    (Array.isArray(JUNG_SEONG[jungIndex]))
                        ? [...JUNG_SEONG[jungIndex]]
                        : JUNG_SEONG[jungIndex],
                    (Array.isArray(JONG_SEONG[jongIndex]))
                        ? [...JONG_SEONG[jongIndex]]
                        : JONG_SEONG[jongIndex],
                ]
                    .reduce(function (acc, val) {
                        return acc.concat(val);
                    }, [])
        );
    }

    if (
        options !== undefined &&
        options.toSeparateArray
    )
        return result.reduce(function (acc, val) {
            return acc.concat(val);
        }, []);
    return result;
}

async function list(req, res) {
    const query = {};
    if (req.query.lesson) {
        query['lesson'] = req.query.lesson;
    }

    if (req.query.clickedHanja) {
        query['hanqca'] = {"$regex": req.query.clickedHanja, "$options": "i"};
    }

    const wordPowers = await WordPower.find(query);

    const wordPowerList = [];
    for (const wordPower of wordPowers) {
        const newWordPower = {...wordPower.toJSON()};
        const hanqcaMatcher = wordPower.hanqcaMatch;
        let hanqca = wordPower.hanqca;
        const matchedExamples = [];
        const yemunQuery = {};
        yemunQuery['lesson'] = Number(req.query.lesson);
        yemunQuery['hanqcaMatch'] = {$in: hanqcaMatcher};
        const preMatchedExamples = await Yemun.find(yemunQuery);

        let hanqcaInWord = [];
        let hankulInWord = [];
        let punc = isPunctuation(hanqca);
        if (punc.length) {
            for (let i = 0; i < punc[0].length; i++) {
                let hangulBool = isHangul(punc[0][i]);
                if (hangulBool.includes(false)) {
                    hanqcaInWord.push(punc[0][i]);
                } else {
                    hankulInWord.push(punc[0][i]);
                }
            }
        }

        for (const yemun of preMatchedExamples) {
            const yemunHanqcaArr = yemun.hanqcaizedSentence.toString().replace(/\s/g, '').trim().normalize('NFC');
            const yemunHanqcaArrWithSpaces = yemun.hanqcaizedSentence.toString().trim().normalize('NFC');

            let finalWordPowerHanqcaArr = [];

            if (isHangul(hanqca).includes(true) && hanqca.includes(")")) {
                let verb = hanqca.split(")")[1];
                verb = verb.replace(/\s/g, '').trim().normalize('NFC');

                let hanqcaPlusVerbRoot = hanqcaInWord.join("").replace(/\s/g, '').toString().trim().normalize('NFC') + Array.from(verb)[0];

                let hanqcaPlusParticlePlusVerbRoot = hanqcaInWord.join("").replace(/\s/g, '').toString().trim().normalize('NFC')
                    + hankulInWord[0]
                    + Array.from(verb)[0];

                let option1 = hanqcaPlusVerbRoot.replace(/\s/g, '').trim().normalize('NFC');
                let option2 = hanqcaPlusParticlePlusVerbRoot.replace(/\s/g, '').trim().normalize('NFC');

                let join = hanqcaInWord.join("").replace(/\s/g, '').toString().trim().normalize('NFC');
                let option3 = null;
                if (join.length > 1) {
                    option3 = join;
                }
                for (let block of yemunHanqcaArrWithSpaces.split(" ")) {
                    let hanqcaInBlock = [];
                    let punc2 = isPunctuation(block.replace(/\s/g, '').trim());
                    if (punc2[0] !== undefined) {
                        for (let i = 0; i < punc2[0].length - 1; i++) {
                            let hangulBool = isHangul(punc2[0][i]);
                            if (hangulBool.includes(false)) {
                                hanqcaInBlock.push(punc2[0][i]);
                            }
                        }
                        hanqcaInBlock = hanqcaInBlock.join("").replace(/\s/g, '').toString().trim().normalize('NFC');
                        let join = hanqcaInWord.join("").replace(/\s/g, '').toString().trim().normalize('NFC');
                        let re3 = new RegExp("^" + join + "$");
                        if ((yemunHanqcaArr.includes(option1)) || (yemunHanqcaArr.includes(option2)) || hanqcaInBlock.search(re3) >= 0) {
                            let index = -1;

                            for (let i = 0; i < matchedExamples.length; i++) {
                                if (matchedExamples[i].hanqcaizedSentence === yemun.hanqcaizedSentence) {
                                    index = i;
                                }
                            }

                            if (index > -1) {
                                matchedExamples[index] = yemun;
                            } else {
                                matchedExamples.push(yemun)
                            }
                        }
                    }
                }

            } else if (isHangul(hanqca).includes(true) && !(hanqca.includes(")"))) {
                if (hanqca.slice(-2).normalize('NFC') === "하다") {
                    let opt1 = hanqca.substring(0, hanqca.length - 1).replace(/\s/g, '').trim().normalize('NFC');
                    let opt2 = hanqca.substring(0, hanqca.length - 2).replace(/\s/g, '').trim().normalize('NFC');

                    for (let block of yemunHanqcaArrWithSpaces.split(" ")) {
                        let re1 = new RegExp("^" + opt1 + "$");
                        let re2 = new RegExp("^" + opt2 + "$");

                        let hanqcaInBlock = [];
                        let punc2 = isPunctuation(block.replace(/\s/g, '').trim());
                        if (punc2[0] !== undefined) {
                            for (let i = 0; i < punc2[0].length - 1; i++) {
                                let hangulBool = isHangul(punc2[0][i]);
                                if (hangulBool.includes(false)) {
                                    hanqcaInBlock.push(punc2[0][i]);
                                }
                            }
                            hanqcaInBlock = hanqcaInBlock.join("").replace(/\s/g, '').toString().trim().normalize('NFC');
                            let join = hanqcaInWord.join("").replace(/\s/g, '').toString().trim().normalize('NFC');
                            let re3 = new RegExp("^" + join + "$");
                            if (block.search(re1) >= 0 || block.search(re2) >= 0 || hanqcaInBlock.search(re3) >= 0) {
                                let index = -1;

                                for (let i = 0; i < matchedExamples.length; i++) {
                                    if (matchedExamples[i].hanqcaizedSentence === yemun.hanqcaizedSentence) {
                                        index = i;
                                    }
                                }

                                if (index > -1) {
                                    matchedExamples[index] = yemun;
                                } else {
                                    matchedExamples.push(yemun)
                                }
                            }
                        }
                    }
                } else {
                    finalWordPowerHanqcaArr = hanqca.replace(/\s/g, '').trim().normalize('NFC');
                    if (yemunHanqcaArr.includes(finalWordPowerHanqcaArr)) {
                        let index = -1;

                        for (let i = 0; i < matchedExamples.length; i++) {
                            if (matchedExamples[i].hanqcaizedSentence === yemun.hanqcaizedSentence) {
                                index = i;
                            }
                        }

                        if (index > -1) {
                            matchedExamples[index] = yemun;
                        } else {
                            matchedExamples.push(yemun)
                        }
                    }
                }

            } else if (!(isHangul(hanqca).includes(true))) {
                finalWordPowerHanqcaArr = hanqcaInWord.join("").replace(/\s/g, '').toString().trim().normalize('NFC');

                if (yemunHanqcaArr.includes(finalWordPowerHanqcaArr)) {
                    let index = -1;

                    for (let i = 0; i < matchedExamples.length; i++) {
                        if (matchedExamples[i].hanqcaizedSentence === yemun.hanqcaizedSentence) {
                            index = i;
                        }
                    }

                    if (index > -1) {
                        matchedExamples[index] = yemun;
                    } else {
                        matchedExamples.push(yemun)
                    }
                }
            }
        }

        newWordPower.examples = matchedExamples;
        wordPowerList.push(newWordPower);
    }

    return res.status(200).json(wordPowerList);
}

module.exports = {
    bulkCreate,
    createWordPower,
    createYemun,
    deleteWordPower,
    deleteYemun,
    list,
    updateWordPower,
    updateYemun
};
