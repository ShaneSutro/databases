/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require('request'); // You might need to npm install the request module!
var expect = require('chai').expect;

describe('Persistent Node Chat Server', function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: 'root',
      database: 'chat'
    });
    dbConnection.connect();

    // var tablenames = ['users', 'chat_messages']; // TODO: fill this out
    var tablenames = 'chat_messages';

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    dbConnection.query('truncate chat_messages', done);
    // tablenames.forEach(tablename => {
    //   dbConnection.query('SET FOREIGN_KEY_CHECKS = 0;');
    //   dbConnection.query('truncate ' + tablename);
    // })
  });

  afterEach(function() {
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', function(done) {
    // Post the user to the chat server.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/users',
      json: { username: 'Valjean' }
    }, function () {
      // Post a message to the node chat server:
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/messages',
        json: {
          username: 'Valjean',
          text: 'In mercy\'s name, three days is all I need.'
        }
      }, function () {
        // Now if we look in the database, we should find the
        // posted message there.

        // TODO: You might have to change this test to get all the data from
        // your message table, since this is schema-dependent.
        var queryString = 'SELECT * FROM chat_messages;';
        var queryArgs = [];

        dbConnection.query(queryString, queryArgs, function(err, results) {
          // Should have one result:
          expect(results.length).to.equal(1);

          // TODO: If you don't have a column named text, change this test.
          expect(results[0].chat_message).to.equal('In mercy\'s name, three days is all I need.');

          done();
        });
      });
    });
  });

  it('Should output all messages from the DB', function(done) {
    // Let's insert a message into the db
    var queryString = 'INSERT INTO chat_messages (username_id, chat_message, chatroom_id) VALUES (1, \'Men like you can never change!\', 1);';
    var queryArgs = [''];
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */

    dbConnection.query(queryString, queryArgs, function(err) {
      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
        var messageLog = JSON.parse(body);
        expect(messageLog[0].chat_message).to.equal('Men like you can never change!');
        expect(messageLog[0].chatroom.roomname).to.equal('main');
        done();
      });
    });
  });

  it('Should return username that already exists instead of creating a new one', (done) =>{
    var queryString = 'insert into users (username) values (\'Stratus\')';
    var queryArgs = [''];

    dbConnection.query(queryString, queryArgs, (data) => {
      request('http://127.0.0.1:3000/classes/users', (err, res, body) => {

        var usernameLog = JSON.parse(body);
        expect(usernameLog[2].username).to.equal('Stratus');
        expect(usernameLog.filter(username => username.username === 'Stratus').length).to.equal(1);
        done();
      });
    });
  });

  it('Should return created new username if username doesn\'t already exist', (done) =>{
    var queryString = 'insert into users (username) values (\'Arcus\')';
    var queryArgs = [''];

    dbConnection.query(queryString, queryArgs, (data) => {

      request('http://127.0.0.1:3000/classes/users', (err, res, body) => {
        var usernameLog = JSON.parse(body);
        expect(usernameLog[usernameLog.length - 1].username).to.equal('Arcus');
        done();
      });
    });
  });
});
