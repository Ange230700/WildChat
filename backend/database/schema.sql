DROP TABLE IF EXISTS `User`;

-- TODO: Add `avatar_id` column to `User` table and create `Avatar` table with `id` and `url` columns to store user avatars in the database.

CREATE TABLE `User` (
  `id` INT NOT NULL UNIQUE PRIMARY KEY AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `hashed_password` VARCHAR(255) NOT NULL,
  `online_status` TINYINT(1) NOT NULL
);
