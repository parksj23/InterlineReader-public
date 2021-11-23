const WordPower = require('../models/WordPower');
const Yemun = require('../models/Yemun');
const {getHanqcaMatchArray, isHangul, isPunctuation} = require('../helpers/hanjaMatchGenerator');

async function createWordPower(req, res) {
    req.body.hanqca = req.body.hanqca.normalize('NFC');

    if (!req.body.hanqcaMatch || req.body.hanqcaMatch.length === 0) {
        req.body.hanqcaMatch = getHanqcaMatchArray(req.body.hanqca);
    }

    const wordPower = new WordPower(req.body);

    let query = {lesson: Number(req.body.lesson), hankul: req.body.hankul};

    WordPower.find({lesson: Number(req.body.lesson), hanqca: req.body.hanqca})
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
    const {hanqca} = req.body;
    if (hanqca) {
        docToUpdate.hanqcaMatch = getHanqcaMatchArray(hanqca);
    }

    const doc = await WordPower.findOne({_id: req.params.id}).exec();

    for (const [key, value] of Object.entries(docToUpdate)) {
        doc[key] = value;
    }

    doc["lastUpdated"] = Date.now();

    try {
        await doc.save();
        return res.status(200).json({success: true});
    } catch (err) {
        return res.status(500).json({message: err});
    }
}

async function deleteWordPower(req, res) {
    await WordPower.findOneAndDelete({_id: req.params.id}).exec();
    return res.status(200).json({deleted: true});
}

async function updateYemun(req, res) {
    const docToUpdate = {...req.body};
    const {hanqcaizedSentence} = req.body;
    if (hanqcaizedSentence) {
        docToUpdate.hanqcaMatch = getHanqcaMatchArray(hanqcaizedSentence.normalize('NFC'));
    }

    const doc = await Yemun.findOne({_id: req.params.id}).exec();

    for (const [key, value] of Object.entries(docToUpdate)) {
        doc[key] = value;
    }

    doc["lastUpdated"] = Date.now();

    try {
        await doc.save();
        return res.status(200).json({success: true});
    } catch (err) {
        return res.status(500).json({message: err});
    }
}

async function deleteYemun(req, res) {
    await Yemun.findOneAndDelete({_id: req.params.id}).exec();
    return res.status(200).json({deleted: true});
}

async function createYemun(req, res) {
    req.body.hanqcaizedSentence = req.body.hanqcaizedSentence.normalize('NFC');

    if (!req.body.hanqcaMatch || req.body.hanqcaMatch.length === 0) {
        req.body.hanqcaMatch = getHanqcaMatchArray(req.body.hanqcaizedSentence);
    }

    const newYemun = new Yemun(req.body);
    Yemun.find({lesson: Number(req.body.lesson), hanqcaizedSentence: req.body.hanqcaizedSentence})
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

async function list(req, res) {
    const query = {};
    if (req.query.lesson) {
        query['lesson'] = Number(req.query.lesson);
    }

    if (req.query.clickedHanja) {
        query['hanqca'] = {"$regex": req.query.clickedHanja.normalize('NFC'), "$options": "i"};
    }

    const wordPowers = await WordPower.find(query);

    const wordPowerList = [];
    const unmatchedYemunWithWords = [];

    for (const wordPower of wordPowers) {
        const newWordPower = {...wordPower.toJSON()};
        const hanqcaMatcher = wordPower.hanqcaMatch;
        let hanqca = wordPower.hanqca.normalize('NFC');
        const matchedExamples = [];
        const yemunQuery = {};
        yemunQuery['lesson'] = Number(req.query.lesson);
        yemunQuery['hanqcaMatch'] = {$all: hanqcaMatcher};
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

        let preLeftOverYemun = [];
        let leftOverYemun = [];

        for (const yemun of preMatchedExamples) {
            const yemunHanqcaArr = yemun.hanqcaizedSentence.toString().replace(/\s/g, '').trim().normalize('NFC');
            const yemunHanqcaArrWithSpaces = yemun.hanqcaizedSentence.toString().trim().normalize('NFC');

            let finalWordPowerHanqcaArr = [];

            let isThereHangulInTheHanqca = isHangul(hanqca);

            let ignoredHangul = (
                hanqca.includes("(")
                || hanqca.includes("하다")
                || hanqca.includes("되다")
                || (hankulInWord.length === 1 && hanqca.includes("히"))
                || (hanqca.includes("스럽다") && hanqca.lastIndexOf("다") === hanqca.length - 1)
            );

            let changingHangul = (
                (hanqca.includes("겹다") && hanqca.lastIndexOf("다") === hanqca.length - 1)
                || (hanqca.includes("답다") && hanqca.lastIndexOf("다") === hanqca.length - 1)
                || (hanqca.includes("들다") && hanqca.lastIndexOf("다") === hanqca.length - 1)
            );

            if (isThereHangulInTheHanqca.includes(true) && ignoredHangul) { // ...(을) 하다, ...하다, 발행되다, 자세히/편히 -- only 1 hankul and that hankul is 히
                let beforeBracket = hanqca.split("(")[0];
                let join = hanqcaInWord.join("").replace(/\s/g, '').toString().trim().normalize('NFC');
                let beforeHankul = null;
                if (join.length > 0) {
                    beforeHankul = join;
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
                        let re3 = new RegExp("^" + beforeBracket + "$");
                        if (yemunHanqcaArr.includes(beforeHankul) || hanqcaInBlock.search(re3) === 0) {
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
            } else if (isThereHangulInTheHanqca.includes(true) && changingHangul && !ignoredHangul && !hanqca.includes(" ")) {
                finalWordPowerHanqcaArr = hanqca.slice(0, -1);
                if (yemunHanqcaArrWithSpaces.includes(finalWordPowerHanqcaArr)) {
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
            } else if (isThereHangulInTheHanqca.includes(true) && !changingHangul && !ignoredHangul && hanqca.includes(" ")) {
                let split = hanqca.split(" ");
                if (split[split.length - 1].includes("다")) { // 악명 높다
                    finalWordPowerHanqcaArr = split[0];
                } else if (hanqca.includes("...")) {
                    finalWordPowerHanqcaArr = hanqca.split("...")[1]; // ...에도 不구하고
                } else { // 인생 처음
                    finalWordPowerHanqcaArr = hanqca;
                }

                if (yemunHanqcaArrWithSpaces.includes(finalWordPowerHanqcaArr)) {
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
            } else if (isThereHangulInTheHanqca.includes(true) && !changingHangul && !ignoredHangul && !hanqca.includes(" ")) { //江물 (강물)
                finalWordPowerHanqcaArr = hanqca;
                for (let block of yemunHanqcaArrWithSpaces.split(" ")) {
                    if (block.search(finalWordPowerHanqcaArr) === 0) {
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
            } else if (!(isThereHangulInTheHanqca.includes(true))) {
                if (hanqca.includes(" ")) { // 박사 과정
                    finalWordPowerHanqcaArr = hanqca;
                } else { // only hanqca
                    finalWordPowerHanqcaArr = hanqcaInWord.join("").replace(/\s/g, '').toString().trim().normalize('NFC');
                }

                if (yemunHanqcaArrWithSpaces.includes(finalWordPowerHanqcaArr)) {
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

        for (let sent of preMatchedExamples) {
            if (!matchedExamples.includes(sent)) {
                preLeftOverYemun.push(sent);
            }
        }

        let hanqcaInWordPower = [];
        let isPunc = isPunctuation(wordPower.hanqca);
        if (isPunc.length) {
            for (let i = 0; i < isPunc[0].length; i++) {
                let hangul = isHangul(isPunc[0][i]);
                if (hangul.includes(false)) {
                    hanqcaInWordPower.push(isPunc[0][i]);
                }
            }
        }

        let wordPowerHanqcaOnlyString = hanqcaInWord.join("").replace(/\s/g, '').toString().trim().normalize('NFC');

        for (let sent of preLeftOverYemun) {
            const yemunHanqcaArrWithSpaces = sent.hanqcaizedSentence.toString().trim().normalize('NFC');
            if (yemunHanqcaArrWithSpaces.includes(wordPowerHanqcaOnlyString)) {
                leftOverYemun.push(sent);
            }
        }

        if (leftOverYemun.length > 0) {
            unmatchedYemunWithWords.push({wordPower: wordPower, unmatchedYemun: leftOverYemun});
        }

        newWordPower.examples = matchedExamples;
        wordPowerList.push(newWordPower);
    }

    return res.status(200).json(
        {
            wordPowerList: wordPowerList,
            unmatchedYemunWithWords: unmatchedYemunWithWords
        });
}

module.exports = {
    createWordPower,
    createYemun,
    deleteWordPower,
    deleteYemun,
    list,
    updateWordPower,
    updateYemun
};
