const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatisserieSchema = new Schema({
    name: String,
    address: String,
    openHour: Number,
    closeHour: Number,
});

const Patisserie = mongoose.model('Patisserie', PatisserieSchema);
module.exports = Patisserie;