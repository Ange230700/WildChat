// Import required dependencies
const { faker } = require("@faker-js/faker");
const { database, tables } = require("../setup");

// Test suite for the create method of UserManager
describe("Create user", () => {
  it("should create an user successfully", async () => {
    // Define a sample user for testing
    const testUser = {
      username: "ange",
      email: "ange@gmail.com",
      hashed_password: "a",
      online_status: 0,
    };

    // Send a create request to the user table with a test user
    const insertId = await tables.User.create(testUser);

    // Check if the newly added user exists in the database
    const [rows] = await database.query(
      "SELECT * FROM `User` WHERE id = ?",
      insertId
    );

    const foundUser = rows[0];

    // Assertions
    expect(foundUser).toBeDefined();
    expect(foundUser.username).toBe(testUser.username);
    expect(foundUser.email).toBe(testUser.email);
    expect(foundUser.hashed_password).toBe(testUser.hashed_password);
    expect(foundUser.online_status).toBe(testUser.online_status);
  });

  it("should throw when passing invalid object", async () => {
    // Thx https://jestjs.io/docs/asynchronous#asyncawait

    // Send a create request to the user table with an empty object
    const promise = tables.User.create({});

    // Assertions
    await expect(promise).rejects.toThrow();
  });
});

// Test suite for the read method of UserManager
describe("Read user", () => {
  it("should read a user successfully", async () => {
    // Define a sample user for testing
    const testUser = {
      username: "ange",
      email: "ange@gmail.com",
      hashed_password: "a",
      online_status: 0,
    };

    // Create a sample user in the database
    const insertId = await tables.User.create(testUser);

    // Read the newly added user from the database
    const foundUser = await tables.User.read(insertId);

    // Assertions
    expect(foundUser).toBeDefined();
    expect(foundUser.username).toBe(testUser.username);
    expect(foundUser.email).toBe(testUser.email);
    expect(foundUser.hashed_password).toBe(testUser.hashed_password);
    expect(foundUser.online_status).toBe(testUser.online_status);
  });

  it("should throw when passing invalid ID", async () => {
    // Send a read request to the user table with an invalid ID
    const promise = tables.User.read(-1);

    // Assertions
    await expect(promise).rejects.toThrow();
  });
});

// Test suite for the readAll method of UserManager
describe("Read all users", () => {
  it("should read all users successfully", async () => {
    // Read all users from the database
    const users = await tables.User.readAll();

    // Assertions
    expect(users).toBeInstanceOf(Array);
    expect(users.length).toBeGreaterThan(0);
  });
});

// Test suite for the update method of UserManager
describe("Update user", () => {
  it("should update a user successfully", async () => {
    // Define a sample user for testing
    const testUser = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      hashed_password: faker.internet.password(),
      online_status: 0,
    };

    // Create a sample user in the database
    const insertId = await tables.User.create(testUser);

    // Update the newly added user in the database
    const modifiedUser = { ...testUser, username: "ange2", id: insertId };
    const affectedRows = await tables.User.update(modifiedUser);

    // Check if the user was updated correctly
    const [rows] = await database.query(
      "SELECT * FROM `User` WHERE id = ?",
      insertId
    );

    const foundUser = rows[0];

    // Assertions
    expect(affectedRows).toBe(1);
    expect(foundUser).toBeDefined();
    expect(foundUser.username).toBe(modifiedUser.username);
    expect(foundUser.email).toBe(modifiedUser.email);
    expect(foundUser.hashed_password).toBe(modifiedUser.hashed_password);
    expect(foundUser.online_status).toBe(modifiedUser.online_status);
  });
});

// Test suite for the delete method of UserManager
describe("Delete user", () => {
  it("should delete a user successfully", async () => {
    // Define a sample user for testing
    const testUser = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      hashed_password: faker.internet.password(),
      online_status: 0,
    };

    // Create a sample user in the database
    const insertId = await tables.User.create(testUser);

    // Delete the newly added user from the database
    const affectedRows = await tables.User.delete(insertId);

    // Check if the user was deleted correctly
    const [rows] = await database.query(
      "SELECT * FROM `User` WHERE id = ?",
      insertId
    );

    const foundUser = rows[0];

    // Assertions
    expect(affectedRows).toBe(1);
    expect(foundUser).toBeUndefined();
  });
});
