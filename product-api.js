const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

let products = [
    {
        "productno":"1",
        "product-name":"note-5",
        "product-manf":"redmi",
        "manf-date":"2020-05-05",
        "exp-date":"2020-08-08",
        "barcode":"12345"
    },
    {
        "productno":"2",
        "product-name":"note-6",
        "product-manf":"redmi",
        "manf-date":"2020-05-05",
        "exp-date":"2020-09-09",
        "barcode":"23456"
    },
    {
        "productno":"3",
        "product-name":"note-7",
        "product-manf":"redmi",
        "manf-date":"2020-05-05",
        "exp-date":"2020-10-10",
        "barcode":"34567"
    }
];

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/product', (req, res) => {
    const product = req.body;

    console.log(product);
    products.push(product);

    res.send('Product is added ');
})

app.get('/product', (req, res) => {
    res.json(products);
});

app.get('/product/:productno', (req, res) => {
    const productno = req.params.productno;

    for (let product of products) {
        if (product.productno === productno) {
            res.json(product);
            return;
        }
    }
    res.status(404).send('Product not found');
})

app.put('/product/:productno', (req, res) => {
    const productno = req.params.productno;
    const newProduct = req.body;

    for (let i = 0; i < products.length; i++) {
        let product = products[i];

        if (product.productno === productno) {
            products[i] = newProduct;
        }
    }
    res.send('Product is edited');
})

app.delete('/product/:productno', (req, res) => {
    const productno = req.params.productno;

    products = products.filter(i => {
        if(i.productno!==productno){
            return true;
        }

        return false;
    });

    res.send(`Product ${productno} is deleted`);
});


app.listen(port, () =>
    console.log(`Hello world listening to port ${port}`)
);
