var mysql = require('mysql');
const Sequelize = require('sequelize');
var db = new Sequelize('chat', 'root', '');
module.exports = db;
// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

// const db = mysql.createConnection({
//   user: 'root',
//   database: 'chat'
// });

// db.connect();

