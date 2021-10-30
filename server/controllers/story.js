const Story = require('../models/Story');


async function createStory(req, res) {
    const story = new Story(req.body);
    const newStory = await story.save();
    return res.status(201).json(newStory);
}

async function saveMainText(req, res) {
    const { lesson, mainText } = req.body.params;
    const updatedStory = await Story.findOneAndUpdate({ lesson }, { text: mainText });
    return res.status(200).json(updatedStory);
}

async function saveKoreanText(req, res) {
    const { lesson, koreanText } = req.body.params;
    const updatedStory = await Story.findOneAndUpdate({ lesson }, { koreanText });
    return res.status(200).json(updatedStory);
}

async function saveExampleSentence(req, res) {
    const { lesson, exSentences } = req.body.params;
    const updatedStory = await Story.findOneAndUpdate({ lesson }, { exampleSentences: exSentences });
    return res.status(200).json(updatedStory);
}

async function addNewExampleSentence(req, res) {
    const { lesson, exSentences } = req.body.params;
    const updatedStory = await Story.updateOne({ lesson }, { $push: {exampleSentences:  exSentences } });
    return res.status(200).json(updatedStory);
}

async function deleteExampleSentence(req, res) {
    const { lesson, id } = req.body.params;
    const updatedStory = await Story.updateOne({ lesson }, { $pull: { exampleSentences: { _id:  id } } });
    return res.status(200).json(updatedStory);
}

async function saveOthers(req, res) {
    const { lesson, subHeading, content } = req.body.params;
    const updatedStory = await Story.findOneAndUpdate({ lesson }, { others: { subHeading, content } });
    return res.status(200).json(updatedStory);
}

async function getMainText(req, res) {
    const { lesson } = req.query;
    try {
        const stories = await Story.find({ lesson: lesson.toString() });
        return res.status(200).json(stories);
    } catch(err) {
        res.status(400).send('An error occurred in the database.');
    } 
}

module.exports = {
    createStory,
    getMainText,
    saveExampleSentence,
    addNewExampleSentence,
    deleteExampleSentence,
    saveKoreanText,
    saveMainText,
    saveOthers,
};
