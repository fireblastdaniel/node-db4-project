const express = require('express');
const db = require('./data/connection.js');

const cookbookRouter = require('./cookbook/cookbookRouter.js');

const server = express();

server.use(express.json());
server.use('/api/cookbook', cookbookRouter);

module.exports = server;
