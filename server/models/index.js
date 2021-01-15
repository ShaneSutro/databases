var db = require('../db');

module.exports = {
  messages: {
    get: function () {
      return new Promise((resolve, reject) => {
        var queryString = `select u.username, m.chat_message, m.created_on, c.roomname
        from users u
        inner join chat_messages m
        on (u.id=m.username_id)
        inner join chatroom c
        on (m.chatroom_id=c.id);`;

        db.query(queryString, (err, data) => {
          if (err) {
            db.end();
            reject(err);
          }
          resolve(data);
        });
      });
    }, // a function which produces all the messages
    post: function () {
      return new Promise((resolve, reject) => {
        var queryString = '';


        db.query(queryString, (err, data) => {
          if (err) {
            db.end();
            reject(err);
          }
          resolve(data);
        });
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};