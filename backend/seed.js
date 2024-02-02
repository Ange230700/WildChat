// Load environment variables from .env file
require("dotenv").config();

// Import Faker library for generating fake data
const { faker } = require("@faker-js/faker");
const argon2 = require("argon2");

// Import database client
const database = require("./database/client");

// * Import fake users data
const users = require("./src/services/users");

// § Asynchronous function to insert fake data into the database
async function insertUsers() {
  try {
    const queries = [];

    for (let i = 0; i < users.length; i += 1) {
      const { password } = users[i];
      const hashedPassword = argon2.hash(password);

      queries.push(
        hashedPassword.then((hashed) => {
          return database.query(
            "INSERT INTO `User` (username, email, hashed_password) VALUES (?, ?, ?)",
            [users[i].username, users[i].email, hashed]
          );
        })
      );
    }

    await Promise.all(queries);
  } catch (error) {
    console.error("Error inserting users:", error.message);
    throw error;
  }
}

async function insertMessages() {
  try {
    const queries = [];
    const [usersCountRow] = await database.query(
      "SELECT COUNT(*) AS `count` FROM `User`"
    );

    if (usersCountRow[0].count) {
      const sender_id = faker.number.int({ min: 1, max: users.length });

      const receiver_id = faker.number.int({ min: 1, max: users.length });

      const content = faker.lorem.sentence();

      for (let i = 0; i < 10; i += 1) {
        queries.push(
          database.query(
            "INSERT INTO `Message` (sender_id, receiver_id, content) VALUES (?, ?, ?)",
            [sender_id, receiver_id, content]
          )
        );
      }

      await Promise.all(queries);
    }
  } catch (error) {
    console.error("Error inserting messages:", error.message);
    throw error;
  }
}

async function insertChats() {
  try {
    const queries = [];
    const [usersCountRow] = await database.query(
      "SELECT COUNT(*) AS `count` FROM `User`"
    );

    if (usersCountRow[0].count) {
      const user1_id = faker.number.int({ min: 1, max: users.length });

      const user2_id = faker.number.int({ min: 1, max: users.length });

      const last_message_id = faker.number.int({ min: 1, max: 10 });

      for (let i = 0; i < 10; i += 1) {
        queries.push(
          database.query(
            "INSERT INTO `Chat_session` (user1_id, user2_id, last_message_id) VALUES (?, ?, ?)",
            [user1_id, user2_id, last_message_id]
          )
        );
      }

      await Promise.all(queries);
    }
  } catch (error) {
    console.error("Error inserting chats:", error.message);
    throw error;
  }
}

const seed = async () => {
  try {
    // Declare an array to store the query promises
    // See why here: https://eslint.org/docs/latest/rules/no-await-in-loop
    // const queries = [];

    /* ************************************************************************* */

    // Generating Seed Data

    // Optional: Truncate tables (remove existing data)
    await database.query("SET FOREIGN_KEY_CHECKS = 0");
    await database.query("TRUNCATE `User`");
    await database.query("TRUNCATE `Message`");
    await database.query("TRUNCATE `Chat_session`");

    // Insert fake data into the tables
    await insertUsers();

    // % Check if the data was inserted correctly
    const [numberOfUsers] = await database.query(
      "SELECT COUNT(*) AS `count` FROM `User`"
    );

    if (numberOfUsers[0].count >= users.length) {
      console.info("user data inserted correctly 👍");
      await insertMessages();
      await insertChats();
    } else {
      console.error("user data inserted incorrectly 👎");
      // throw new Error("Seed data inserted incorrectly 👎");
    }

    await database.query("SET FOREIGN_KEY_CHECKS = 1");

    /* ************************************************************************* */

    // Wait for all the insertion queries to complete
    // await Promise.all(queries);

    // Close the database connection
    // database.end();

    console.info(`${database.databaseName} filled from ${__filename} 🌱`);
  } catch (err) {
    console.error("Error filling the database:", err.message);
  } finally {
    // Close the database connection
    database.end();
  }
};

// Run the seed function
seed();
