const express = require('express');
const app = express();
const port = 4000;
const datas = require('./data');

app.get('/', (req, res) => { // http://localhost:4000/
    res.send('All working.');
});

app.get('/welcome/:firstname', (req, res)=>{ // http://localhost:4000/welcome/you
    res.send('Hi, ' + req.params.firstname + '!');
});

app.get('/data', (req, res) => { // http://localhost:4000/data
    console.log(datas);
    res.send(datas);
})

app.listen(port, ()=> {
    console.log('The server is listening at the port ', port);
});