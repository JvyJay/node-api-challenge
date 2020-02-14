const express = require('express');

const projectRouter = require('./projects/projectRouter');
const actionRouter = require('./actions/actionRouter');

const server = express();

server.use(express.json());

server.use('/projects', projectRouter);
server.use('/actions', actionRouter);

module.exports = server;
