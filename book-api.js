const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

let books = [
    {
        "isbn": "7894561237894",
        "title": "javascript",
        "author": "sid",
        "publish-date": "2014-05-05",
        "publisher": "daily work",
        "numOfPages": "555",
    },
    {
        "isbn": "7894561233894",
        "title": "typescript",
        "author": "sai",
        "publish-date": "2019-08-08",
        "publisher": "svce",
        "numOfPages": "444",
    },
    {
        "isbn": "7894789237894",
        "title": "angular",
        "author": "sandy",
        "publish-date": "2020-02-02",
        "publisher": "cts",
        "numOfPages": "999",
    }
];

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/book', (req, res) => {
    const book = req.body;

    console.log(book);
    books.push(book);

    res.send('Book is added ');
})

app.get('/book', (req, res) => {
    res.json(books);
});

app.get('/book/:isbn', (req, res) => {
    const isbn = req.params.isbn;

    for (let book of books) {
        if (book.isbn === isbn) {
            res.json(book);
            return;
        }
    }
    res.status(404).send('Book not found');
})

app.put('/book/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const newBook = req.body;

    for (let i = 0; i < books.length; i++) {
        let book = books[i];

        if (book.isbn === isbn) {
            books[i] = newBook;
        }
    }
    res.send('Book is edited');
})

app.delete('/book/:isbn', (req, res) => {
    const isbn = req.params.isbn;

    books = books.filter(i => {
        if(i.isbn!==isbn){
            return true;
        }

        return false;
    });

    res.send('Book is deleted');
});


app.listen(port, () =>
    console.log(`Hello world listening to port ${port}`)
);
