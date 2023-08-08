const express = require('express');
const rotes = require('./roteador');
const app = express();

app.use(rotes);

app.listen(3333);