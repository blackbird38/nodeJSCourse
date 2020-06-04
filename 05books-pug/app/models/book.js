const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: String,
    author: String,
    publicationYear: Number,
    totalPageNumber: {type: Number, min: 1},
});

const Book = mongoose.model('Book', BookSchema);
module.exports = Book;