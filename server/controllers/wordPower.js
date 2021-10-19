const WordPower = require('../models/WordPower');
const Yemun = require('../models/Yemun');

function createWordPower(req, res) {
    // for (let obj of req.body) {
    //     const wordPower = new WordPower(obj);
    //     const newWordPower = await wordPower.save();
    // }
    // return res.status(201).json("done");

    const wordPower = new WordPower(req.body);
    WordPower.find({lesson: req.body.lesson, hankul: req.body.hankul})
        .exec()
        .then((words) => {
            if (words.length >= 1) {
                return res.status(409).json({
                    message: "Word already exists",
                });
            } else {
                const newWordPower = wordPower.save();
                return res.status(201).json(newWordPower);
            }
        })
        .catch((err) => {
            return res.status(409).json({
                message: err,
            });
        });
}

async function createYemun(req, res) {
    // for (let obj of req.body) {
    //     const yemun = new Yemun(obj);
    //     const newYemun = await yemun.save();
    // }
    // return res.status(201).json("done");

    // const yemun = new Yemun(req.body);
    // const newYemun = await yemun.save();
    // return res.status(201).json(newYemun);

    const yemun = new Yemun(req.body);
    Yemun.find({translation: req.body.translation})
        .exec()
        .then((yemuns) => {
            if (yemuns.length >= 1) {
                return res.status(409).json({
                    message: "Yemun document already exists",
                });
            } else {
                const newYemun = yemun.save();
                return res.status(201).json(newYemun);
            }
        })
        .catch((err) => {
            return res.status(409).json({
                message: err,
            });
        });
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
        const hanqca = wordPower.hanqca;
        const matchedExamples = [];
        const preMatchedExamples = await Yemun.find({hanqcaMatch: {$in: hanqcaMatcher}});

        for (const yemun of preMatchedExamples) {
            // const yemunHanqcaArr = yemun.hanqcaMatch.join("").replace(/\s/g, '').trim().normalize('NFC');
            const yemunHanqcaArr = yemun.hanqcaizedSentence.toString().replace(/\s/g, '').trim().normalize('NFC');
            let hanqcaInWord = [];
            let punc = isPunctuation(hanqca);
            for (let i = 0; i < punc[0].length; i++) {
                let hangulBool = isHangul(punc[0][i]);
                if (hangulBool.includes(false)) {
                    hanqcaInWord.push(punc[0][i]);
                }
            }
            let finalWordPowerHanqcaArr = hanqcaInWord.join("").replace(/\s/g, '').trim().normalize('NFC');
            if (yemunHanqcaArr.includes(finalWordPowerHanqcaArr)) {
                matchedExamples.push(yemun);
            }
        }

        newWordPower.examples = matchedExamples;
        wordPowerList.push(newWordPower);
    }

    // for (const wordPower of wordPowers) {
    //     const newWordPower = {...wordPower.toJSON()};
    //     const hanqcaMatcher = wordPower.hanqcaMatch;
    //
    //     const matchedExamples = await Yemun.find({ hanqcaMatch: { $in: hanqcaMatcher } });
    //     console.log(matchedExamples);
    //
    //     newWordPower.examples = matchedExamples;
    //     wordPowerList.push(newWordPower);
    // }
    return res.status(200).json(wordPowerList);
}

module.exports = {
    createWordPower,
    createYemun,
    list
};
