CREATE DATABASE chat;

USE chat;

CREATE TABLE chatroom (
  id INT NOT NULL AUTO_INCREMENT,
  roomname VARCHAR(150) NOT NULL,
  PRIMARY KEY (id)
);

/* Create other tables and define schemas for them here! */

CREATE TABLE chat_messages (
  /* Describe your table here.*/
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(150) NOT NULL,
  chat_message VARCHAR(150) NOT NULL,
  created_on TIMESTAMP NOT NULL,
  chatroom_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (chatroom_id) REFERENCES chatroom(id)
);






/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

