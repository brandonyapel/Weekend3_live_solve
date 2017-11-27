var pg = require('pg');
var config = {
  database: 'tasks', // the name of the database
  host: 'localhost', // where is your database
  port: 5432, // the port number for your database, 5432 is the default
  max: 10, // how many connections at one time
  idleTimeoutMillis: 30000 // 30 seconds to try to connect
};

// Create our pool
var pool = new pg.Pool(config);

module.exports = pool;