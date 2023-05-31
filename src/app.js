/**
 * Dot Env to upload enviroment variables on server
 */
require('dotenv').config();

/**
 * Require server model to setup server configuration using singletons
 */
const Server = require('./models/server');

/**
 * Instantiate new server 
 */
const server = new Server();

/**
 * Using listen method to start server on port
 */
server.listen();