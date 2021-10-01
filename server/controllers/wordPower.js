const WordPower = require('../models/WordPower');
const Yemun = require('../models/Yemun');


async function createWordPower(req, res) {
    const wordPower = new WordPower(req.body);
    const newWordPower = await wordPower.save();
    return res.status(201).json(newWordPower);
}

async function createYemun(req, res) {
    const yemun = new Yemun(req.body);
    const newYemun = await yemun.save();
    return res.status(201).json(newYemun);
}

async function list(req, res) {
    const query = {};
    if (req.query.chapter) {
        query['chapter'] = req.query.chapter;
    }

    const wordPowers = await WordPower.find(query);

    const wordPowerList = [];
    for (const wordPower of wordPowers) {
        const newWordPower = {...wordPower.toJSON()};
        const hanqcaMatcher = wordPower.hanqcaMatch;
        const matchedExamples = await Yemun.find({ hanqcaMatch: { $in: hanqcaMatcher } });

        newWordPower.examples = matchedExamples;
        wordPowerList.push(newWordPower);
    }
    return res.status(200).json(wordPowerList);
}

module.exports = {
    createWordPower,
    createYemun,
    list
};
