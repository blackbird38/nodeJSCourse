const express = require('express');
const app = express();
const Book = require('./app/models/book');

const port = process.env.PORT || 5000;
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/books_db', { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error!'));
db.once('open', () => {
    console.log('MongoDB connected...');
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());


const router = express.Router();


router.use((req, res, next)=>{
    console.log('Router up');
    next();
});

router.get('/', (req, res) => {
    res.json({message : 'All working.'});
});

router.route('/books')
    .post((req, res) => { // e.g insomnia POST http://localhost:5000/api/books/
        const book = new Book(req.body);
        if(book.totalPageNumber < 1)
        {
            res.json({message : 'Your book must have at least one page.'});
        }
        book.save((err, addedBook) => {
            if (err) throw err;
            res.json({message : 'A new book was added.' + addedBook});
        });
    })
    .get((req, res) => { // // e.g insomnia GET http://localhost:5000/api/books/
        Book.find({}, (err, books) => {
            if (err) throw err; 
            res.json(books);
        });
    })
router.route('/books/:bookId')
    .get((req, res) => { // e.g insomnia GET http://localhost:5000/api/books/5ed65bc7d5819f04acd37fff
        Book.findById(req.params.bookId, (err, book) => {
            if (err) throw err;
            res.json(book);
        });
    })
    .put((req, res) => { // e.g insomnia PUT http://localhost:5000/api/books/5ed65bc7d5819f04acd37fff
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

    })
    .delete((req, res) => { // e.g insomnia DELETE http://localhost:5000/api/books/5ed65bc7d5819f04acd37fff
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
    });

app.use('/api', router);

app.listen(port, ()=> {
    console.log('The server is listening at the port ', port);
});