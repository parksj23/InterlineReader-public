const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WordPowerSchema = new Schema({
	lesson: { type: Number },
	hanqca: { type: String },
	hankul: { type: String },
	englishGloss: { type: String },
	hanqcaMatch: { type: Array, default: [] },
	createdDate: { type: Date, required: true, default: Date.now },
	lastUpdated: { type: Date, required: true, default: Date.now },
}, { toJSON: { virtuals: true, getters: true }});
// }, { toJSON: { virtuals: true, getters: true }, collection: "wordpowerTEST"});

const WordPower = mongoose.model('wordpower', WordPowerSchema);
module.exports = WordPower;
