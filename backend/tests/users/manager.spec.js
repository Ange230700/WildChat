// Import required dependencies
const { database, tables } = require("../setup");

// Test suite for the create method of UserManager
describe("Create user", () => {
  it("should create an user successfully", async () => {
    // Define a sample user for testing
    const testUser = {
      title: "Sample User",
    };

    // Send a create request to the user table with a test user
    const insertId = await tables.User.create(testUser);

    // Check if the newly added user exists in the database
    const [rows] = await database.query(
      "select * from user where id = ?",
      insertId
    );

    const foundUser = rows[0];

    // Assertions
    expect(foundUser).toBeDefined();
    expect(foundUser.title).toBe(testUser.title);
  });

  it("should throw when passing invalid object", async () => {
    // Thx https://jestjs.io/docs/asynchronous#asyncawait

    // Send a create request to the user table with an empty object
    const promise = tables.User.create({});

    // Assertions
    await expect(promise).rejects.toThrow();
  });
});
