const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const YemunSchema = new Schema({
	lesson: { type: Number },
	koreanSentence: { type: String },
	simpleHanqca: { type: String },
	hanqcaizedSentence: { type: String },
	translation: { type: String },
	hanqcaMatch: { type: Array, default: [] },
// }, { toJSON: { virtuals: true, getters: true }});
}, { toJSON: { virtuals: true, getters: true }, collection: "yemunTEST"});

const Yemun = mongoose.model('yemun', YemunSchema);
module.exports = Yemun;
