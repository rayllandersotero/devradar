require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const routes = require('../routes');

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

module.exports = app;
