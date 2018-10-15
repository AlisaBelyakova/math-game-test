const path = require('path');

const express = require('express');
const app = express();

const session = require('express-session');

// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'mathgametest',
    resave: false
}));

app.use('/', function (req, res, next) {
    if (!req.session.counter) req.session.counter = 1;
    console.log('counter', ++req.session.counter);
    next();
});

app.use(express.static(path.join(__dirname, './public')))

app.get('/count', function (req, res) {
    res.send({ count: req.session.counter });
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
});
