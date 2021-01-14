var db = require('../db');

module.exports = {
  messages: {
    get: function () {
      return new Promise((resolve, reject) => {
        var queryString = ''; //FILL ME OUT
        db.query(queryString, (err, data) => {
          if (err) {
            db.end();
            reject(err);
          }
          resolve(data);
        });
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

