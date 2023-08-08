const express = require('express');
const rotes = require('./roteador');

const app = express();

app.use(express.json());
app.use(rotes);

app.listen(8000);