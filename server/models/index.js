var db = require('../db');

module.exports = {
  messages: {
    get: function () {
      db.connect((err) => {
        if (err) { throw err; }
        console.log('connected to database');
      });

    }, // a function which produces all the messages
    post: function () {} // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

