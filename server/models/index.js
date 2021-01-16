var db = require('../db');
const Sequelize = require('sequelize');
const Promise = require('bluebird');

const Message = db.define(
  'chat_messages',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: Sequelize.INTEGER, //eslint-disable-line
    chat_message: Sequelize.STRING, //eslint-disable-line
    created_on: { //eslint-disable-line
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
    chatroom_id: { //eslint-disable-line
      type: Sequelize.INTEGER,
      defaultValue: 1
    },
  },
  {
    timestamps: false,
  }
);

const Users = db.define(
  'users',
  {
    username: Sequelize.STRING,
  },
  {
    timestamps: false,
  }
);

const Chatroom = db.define(
  'chatrooms',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    roomname: Sequelize.STRING,
  },
  {
    timestamps: false,
  }
);

Chatroom.hasMany(Message, { foreignKey: 'chatroom_id'});
Message.belongsTo(Chatroom, { foreignKey: 'chatroom_id'});
Users.hasMany(Message, {foreignKey: 'userId'});
Message.belongsTo(Users, {foreignKey: 'userId'});

module.exports = {
  messages: {
    get: () => {
      return Message.findAll({
        include: [{
          model: Chatroom,
          required: true
        }, {
          model: Users,
          required: true
        }]
      })
        .then(results => {
          return results;
        })
        .catch(err => console.log(err));
    }, // a function which produces all the messages
    post: function (postMessage) {
      return Users.findOrCreate({
        where: { username: postMessage.username },
      })
        .spread((user) => {
          return user.get({
            plain: true,
          }).id;
        })
        .then((id) => {
          return Message.create({
            userId: id, //eslint-disable-line
            chat_message: postMessage.text, //eslint-disable-line
            chatroom_id: 1, //eslint-disable-line
          });
        })
        .then(() => 'Created!');
    }, // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (userData) {
      return Users.findAll({
        attributes: ['id', 'username'],
        order: [['id', 'asc']],
      })
        .then((data) => {
          return data;
        })
        .catch((err) => console.log('error: ', err));
    },
    post: (userData) => {
      return Users.findOrCreate({
        where: { username: userData.username },
      });
    },
  },
};
