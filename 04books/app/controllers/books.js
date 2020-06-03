const Book = require('../models/book');

const addBook = (req, res) => { // e.g insomnia POST http://localhost:5000/api/books/
    const book = new Book(req.body);
    if(book.totalPageNumber < 1)
    {
        res.json({message : 'Your book must have at least one page.'});
    }
    book.save((err, addedBook) => {
        if (err) throw err;
        res.json({message : 'A new book was added.' + addedBook});
    });
};

const getBooks = (req, res) => { // e.g insomnia GET http://localhost:5000/api/books/
    Book.find({}, (err, books) => {
        if (err) throw err; 
        res.render('books', {books: books} );
    });
};


const getBook = (req, res) => { // e.g insomnia GET http://localhost:5000/api/books/5ed65bc7d5819f04acd37fff
    Book.findById(req.params.bookId, (err, book) => {
        if (err) throw err;
        res.json(book);
    });
};

const updateBook = (req, res) => { // e.g insomnia PUT http://localhost:5000/api/books/5ed65bc7d5819f04acd37fff
    Book.findById(req.params.bookId, (err, book) => {
        if(err) throw (err);
        const oldBookTitle = book.title;
        const oldBookAuthor = book.author;
        const oldBookPublicationYear = book.publicationYear;
        const oldBookTotalPageNumber = book.totalPageNumber
        Object.assign(book, req.body).save((err, updatedBook) => {
            if(err) throw (err);
            res.json({ message: `Book old data: ${oldBookTitle} (${oldBookAuthor} ${oldBookPublicationYear} ${oldBookTotalPageNumber }) successfuly updated.`, updatedBook });
            });
        });

};

const deleteBook = (req, res) => { // e.g insomnia DELETE http://localhost:5000/api/books/5ed65bc7d5819f04acd37fff
    const query = {_id: req.params.bookId};
    Book.deleteOne(query, (err, res2) => {
        if (err) throw err;
        console.log(res2);
        if (res2.n > 0){
            res.json({message: 'Book successfuly deleted.'});
        }else {
            res.json({message: 'Book could not be deleted.'});
        }
    } );
};

module.exports = {
    addBook,
    getBooks,
    getBook, 
    updateBook, 
    deleteBook
}