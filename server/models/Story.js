const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StorySchema = new Schema({
	text: { type: String },
    title: { type: String },
	koreanText: { type: String },
    lesson: { type: String },
    others: {
        subHeading: { type: String },
        content: { type: String }
    },
    exampleSentences: [{
        num: { type: Number },
        sentences: [{
            type: String
        }]
    }]
}, { toJSON: { virtuals: true, getters: true }});

const Story = mongoose.model('story', StorySchema);
module.exports = Story;
