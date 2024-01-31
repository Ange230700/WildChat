// Load environment variables from .env file
require("dotenv").config();

// Import Faker library for generating fake data
// const { faker } = require("@faker-js/faker");

// Import database client
const database = require("./database/client");

// * Import fake users data
const users = require("./src/services/users");

// § Asynchronous function to insert fake data into the database
async function insertUsers() {
  try {
    const queries = [];

    for (let index = 0; index < users.length; index += 1) {
      const user = users[index];

      queries.push(
        database.query(
          "INSERT INTO `User` (`username`, `email`, `password`, `online_status`, `bio`) VALUES (?, ?, ?, ?, ?)",
          [
            user.username,
            user.email,
            user.password,
            user.online_status,
            user.bio,
          ]
        )
      );
    }

    await Promise.all(queries);
  } catch (error) {
    console.error("Error inserting users:", error.message);
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

    // Insert fake data into the tables
    await insertUsers();

    // % Check if the data was inserted correctly
    const [numberOfUsers] = await database.query(
      "SELECT COUNT(*) AS `count` FROM `User`"
    );

    if (numberOfUsers[0].count >= users.length) {
      console.info("Seed data inserted correctly 👍");
    } else {
      console.error("Seed data inserted incorrectly 👎");
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
