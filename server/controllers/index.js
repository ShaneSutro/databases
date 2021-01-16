var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get()
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          console.log('Failed getting message from server: ', err);
          res.sendStatus(400);
        });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('inside controllers index.js', req.body);
      models.messages.post(req.body)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          console.log('/classes/messages POST error: ', err);
        });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get(req.body)
        .then((usernameArr) => {
          res.send(usernameArr);
        })
        .catch(() => res.sendStatus(400));
    },
    post: function (req, res) {
      models.users.post(req.body)
        .then(() => res.sendStatus(201))
        .catch(() => res.sendStatus(400));
    }
  }
};

