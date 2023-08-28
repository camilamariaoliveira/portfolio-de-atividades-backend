const express = require('express');

const rotes = require('./router');

const app = express();

app.use(express.json());
app.use(rotes);

app.listen(3000);