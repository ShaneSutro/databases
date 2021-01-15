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
    post: function (postMessage) {
      var newMessageID;
      return new Promise((resolve, reject) => {

        //try inserting username and roomname
        new Promise((resolve, reject) => {
          db.query(`INSERT INTO chat_messages (username_id, chat_message, chatroom_id) VALUES (1, '${postMessage.text}', 1)`, (err, data) => {
            if (err) {
              reject(err);
            } else {
              newMessageID = data.insertId;
              resolve(data);
            }
          });
        })
          .then(data => {
            //TODO: Refactor to reduce nesting

            console.log(data);
            new Promise((resolve, reject) => {
              db.query(`select id from users where users.username='${postMessage.username}'`, (err, data) => {
                if (err) { reject(err); }
                resolve(data);
              });
            })
              .then(id => {
                if (id.length === 0) {
                  return new Promise ((resolve, reject) => {
                    db.query(`insert into users (username) values ('${postMessage.username}')`, (err, data) => {
                      if (err) { reject(err); }
                      resolve(data.insertId);
                    });
                  })
                    .then(newUsernameId => {
                      db.query(`update chat_messages set username_id='${newUsernameId}' where chat_messages.id='${newMessageID}'`);
                    });
                } else {
                  db.query(`update chat_messages set username_id=(select id from users where users.username='${postMessage.username}') where chat_messages.id='${newMessageID}'`);
                }
                // var extractedID = id[0].id;
                // console.log(extractedID);
              });
          })
          .catch((err) => {
            console.log('Oh noes ', err);
            //run the query to get the already-existing id out of the database
          }); //last insert id
        //if either error, skip the one that errored
        //else, insert them

        //get the id associated with the newly entered username and roomname

        //insert the row into the chat_messages table

      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};