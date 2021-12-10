const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HanjaComboSchema = new Schema({
    lesson: { type: String },
    hanja: { type: String },
    kor: { type: String },
    eng: { type: String },
    isAllCombo: { type: Boolean }
}, { toJSON: { virtuals: true, getters: true }, collection: "NEW_HANJA_COMBO"});
// }, { toJSON: { virtuals: true, getters: true }, collection: "newHanjaComboTEST"});

const hanjaCombo = mongoose.model('hanjaCombo', HanjaComboSchema);
module.exports = hanjaCombo;
