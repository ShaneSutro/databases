CREATE DATABASE chat;

USE chat;

CREATE TABLE chatroom (
  id INT NOT NULL AUTO_INCREMENT,
  roomname VARCHAR(150) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE users (
  id int not null auto_increment,
  username varchar(150) not null,
  PRIMARY KEY (id)
);

/* Create other tables and define schemas for them here! */

CREATE TABLE chat_messages (
  /* Describe your table here.*/
  id INT NOT NULL AUTO_INCREMENT,
  username_id INT NOT NULL,
  chat_message VARCHAR(150) NOT NULL,
  created_on TIMESTAMP NOT NULL,
  chatroom_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (chatroom_id) REFERENCES chatroom(id),
  FOREIGN KEY (username_id) REFERENCES users(id)
);

/* Initializes with main room name for rooms table*/

INSERT INTO chatroom (roomname) VALUES ('main');
INSERT INTO users (username) VALUES ('nimbus');
INSERT INTO chat_messages (username_id, chat_message, chatroom_id) VALUES (1, 'Men like you can never change!', 1);




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

