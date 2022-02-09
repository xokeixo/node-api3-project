const express = require('express');
const server = express();
const morgan = require('morgan');
const helmet = require('helmet');
const { logger } = require('./middleware/middleware');
const usersRouter = require('./users/users-router');


server.use(express.json());
server.use(morgan('dev'));
server.use(helmet())
server.use(logger);
server.use('/api/users', logger, usersRouter);


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
