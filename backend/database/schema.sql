DROP TABLE IF EXISTS `User`;

CREATE TABLE `User` (
  `id` INT NOT NULL UNIQUE PRIMARY KEY AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `hashed_password` VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS `Message`;

CREATE TABLE `Message` (
  `id` INT NOT NULL UNIQUE PRIMARY KEY AUTO_INCREMENT,
  `sender_id` INT NOT NULL,
  `receiver_id` INT NOT NULL,
  `content` TEXT NOT NULL,
  FOREIGN KEY (sender_id) REFERENCES User(id),
  FOREIGN KEY (receiver_id) REFERENCES User(id)
);

DROP TABLE IF EXISTS `Chat_session`;

CREATE TABLE `Chat_session` (
  `id` INT NOT NULL UNIQUE PRIMARY KEY AUTO_INCREMENT,
  `user1_id` INT NOT NULL,
  `user2_id` INT NOT NULL,
  `last_message_id` INT, 
  FOREIGN KEY (user1_id) REFERENCES User(id),
  FOREIGN KEY (user2_id) REFERENCES User(id)
);
