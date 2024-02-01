// Import required dependencies
const { faker } = require("@faker-js/faker");
const { app, request, tables } = require("../setup");

// Test suite for the GET /api/users route
describe("GET /api/users", () => {
  it("should fetch users successfully", async () => {
    // Define a sample user for testing
    const testUser = {
      username: "ange",
      email: "ange@gmail.com",
      hashed_password: "a",
      online_status: 0,
    };

    // Create a sample user in the database
    const insertId = await tables.User.create(testUser);

    // Send a GET request to the /api/users endpoint
    const response = await request(app).get("/api/users");

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

    // Check if the created user is present in the response
    const foundUser = response.body.find((user) => user.id === insertId);

    // Assertions
    expect(foundUser).toBeInstanceOf(Object);
    expect(foundUser.username).toBe(testUser.username);
    expect(foundUser.email).toBe(testUser.email);
    expect(foundUser.hashed_password).toBe(testUser.hashed_password);
    expect(foundUser.online_status).toBe(testUser.online_status);
  });
});

// Test suite for the GET /api/users/:id route
describe("GET /api/user/:id", () => {
  it("should fetch a single user successfully", async () => {
    // Define a sample user for testing
    const testUser = {
      username: "ange",
      email: "ange@gmail.com",
      hashed_password: "a",
      online_status: 0,
    };

    // Create a sample user in the database
    const insertId = await tables.User.create(testUser);

    // Check if the newly added user exists in the database
    const foundUserInDB = await tables.User.read(insertId);
    expect(foundUserInDB).toBeDefined();

    // Send a GET request to the /api/users/:id endpoint
    const response = await request(app).get(`/api/user/${insertId}`);

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.id).toBe(insertId);
    expect(response.body.username).toBe(testUser.username);
    expect(response.body.email).toBe(testUser.email);
    expect(response.body.hashed_password).toBe(testUser.hashed_password);
    expect(response.body.online_status).toBe(testUser.online_status);
  });

  it("should return 404 for non-existent user", async () => {
    // Send a GET request to the /api/users/:id endpoint with an invalid ID
    const response = await request(app).get("/api/user/0");

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });
});

// Test suite for the POST /api/users route
// Doesn't pass: maybe something to change in app config :/
// Hint: enabling log could help ;)
describe("POST /api/user", () => {
  it("should add a new user successfully", async () => {
    // Define a sample user for testing
    const testUser = {
      username: "ange",
      email: "ange@gmail.com",
      hashed_password: "a",
      online_status: 0,
    };

    // Send a POST request to the /api/users endpoint with a test user
    const response = await request(app).post("/api/user").send(testUser);

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.insertId).toEqual(expect.any(Number));

    // Check if the newly added user exists in the database
    const foundUser = await tables.User.read(response.body.insertId);

    // Assertions
    expect(foundUser).toBeDefined();
    expect(foundUser.username).toBe(testUser.username);
    expect(foundUser.email).toBe(testUser.email);
    expect(foundUser.hashed_password).toBe(testUser.hashed_password);
    expect(foundUser.online_status).toBe(testUser.online_status);
  });
});

// TODO: implement PUT and DELETE routes

// Test suite for the PUT /api/users/:id route
describe("PUT /api/user/:id", () => {
  it("should update an existing user successfully", async () => {
    // Define a sample user for testing
    const testUser = {
      username: "ange",
      email: "ange@gmail.com",
      hashed_password: "a",
      online_status: 0,
    };

    // Create a sample user in the database
    const insertId = await tables.User.create(testUser);

    // Send a PUT request to the /api/user/:id endpoint
    const modifiedUser = {
      id: insertId,
      username: faker.internet.userName(),
      email: "ange@gmail.com",
      hashed_password: "a",
      online_status: 0,
    };
    const response = await request(app)
      .put(`/api/user/${insertId}`)
      .send(modifiedUser);

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.affectedRows).toEqual(1);
  });

  it("should return 404 for non-existent user", async () => {
    // Send a PUT request to the /api/users/:id endpoint with an invalid ID
    const response = await request(app).put("/api/user/0").send({
      username: "ange",
      email: "ange@gmail.com",
      hashed_password: "a",
      online_status: 0,
    });

    // Assertions
    expect(response.status).toBe(404);
  });
});

/**/
// Test suite for the DELETE /api/users/:id route
describe("DELETE /api/users/:id", () => {
  it("should delete an existing user successfully", async () => {
    // Define a sample user for testing
    const testUser = {
      username: faker.internet.userName(),
      email: "ange@gmail.com",
      hashed_password: "a",
      online_status: 0,
    };

    // Create a sample user in the database
    const insertId = await tables.User.create(testUser);

    // Send a DELETE request to the /api/users/:id endpoint
    const response = await request(app).delete(`/api/users/${insertId}`);

    // Assertions
    expect(response.status).toBe(204);

    // Check if the user has been deleted from the database
    const foundUser = await tables.User.read(insertId);

    // Assertions
    expect(foundUser).toBeUndefined();
  });

  it("should return 404 for non-existent user", async () => {
    // Send a DELETE request to the /api/users/:id endpoint with an invalid ID
    const response = await request(app).delete("/api/users/0");

    // Assertions
    expect(response.status).toBe(404);
  });
});
