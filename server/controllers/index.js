var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      data = models.messages.get()
        .then(data => {
          res.send(data);
        });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post(req.body)
        .then(data => {
          res.send(data);
          console.log('data: ', data);
        });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

