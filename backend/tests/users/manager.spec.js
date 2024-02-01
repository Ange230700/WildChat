// Import required dependencies
const { database, tables } = require("../setup");

// Test suite for the create method of UserManager
describe("Create user", () => {
  it("should create an user successfully", async () => {
    // Define a sample user for testing
    const testUser = {
      username: "ange",
      email: "ange@gmail.com",
      password: "a",
      online_status: 0,
      bio: "ezfghn",
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
    expect(foundUser.password).toBe(testUser.password);
    expect(foundUser.online_status).toBe(testUser.online_status);
    expect(foundUser.bio).toBe(testUser.bio);
  });

  it("should throw when passing invalid object", async () => {
    // Thx https://jestjs.io/docs/asynchronous#asyncawait

    // Send a create request to the user table with an empty object
    const promise = tables.User.create({});

    // Assertions
    await expect(promise).rejects.toThrow();
  });
});
