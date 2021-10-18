const WordPower = require('../models/WordPower');
const Yemun = require('../models/Yemun');


async function createWordPower(req, res) {
    // for (let obj of req.body) {
    //     const wordPower = new WordPower(obj);
    //     const newWordPower = await wordPower.save();
    // }
    // return res.status(201).json("done");

    const wordPower = new WordPower(req.body);
    const newWordPower = await wordPower.save();
    return res.status(201).json(newWordPower);
}

async function createYemun(req, res) {
    // for (let obj of req.body) {
    //     const yemun = new Yemun(obj);
    //     const newYemun = await yemun.save();
    // }
    // return res.status(201).json("done");

    const yemun = new Yemun(req.body);
    const newYemun = await yemun.save();
    return res.status(201).json(newYemun);
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
            const hanqcaArr = yemun.hanqcaMatch.join("");
            if (hanqcaArr.includes(hanqca)) {
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
