const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StorySchema = new Schema({
	storyContent: {
		type: String
	},
	storyGrammar: [{
    sentence: String,
    pattern: String,
    here: String
     }],
	storyVocab: [{
    english: String,
    korean: String,
    hanja: String
     }]
});

module.exports = Story = mongoose.model('stories', StorySchema);
