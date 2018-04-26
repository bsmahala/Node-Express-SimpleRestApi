const express = require('express');
var bodyParser = require('body-parser')

var src = require('../src')

const app = express()
app.use(bodyParser.json());
app.use(src);

app.get('/', (req, res) => res.send('Hello Worl dfdf!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
