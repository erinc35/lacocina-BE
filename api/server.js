const express = require('express');
const cors = require('cors');
const db = require('../data/dbConfig.js');
const server = express();

const usersRouter = require('./users/usersRouter');
const recipesRouter = require('./recipes/recipesRouter');

server.use(cors());
server.use(express.json());

server.use('/api/users', usersRouter);
server.use('/api/recipes', recipesRouter);


server.get('/', (req, res) => {
    res.send('Hello World!');
});

server.post('/test', (req, res) => {
    console.log('req', req.body)
    res.send('Hello World test!');
});

module.exports = server;