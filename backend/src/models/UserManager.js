const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "user" as configuration
    super({ table: "User" });
  }

  // The C of CRUD - Create operation

  async create(user) {
    // Execute the SQL INSERT query to add a new user to the "user" table
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (username, email, hashed_password) VALUES (?, ?, ?)`,
      [user.username, user.email, user.hashed_password]
    );

    // Return the ID of the newly inserted user
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific user by its ID
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );

    if (rows.length === 0) {
      throw new Error(`User with ID ${id} not found`);
    }

    // Return the first row of the result, which represents the user
    return rows[0];
  }

  async readByEmail(email) {
    // Execute the SQL SELECT query to retrieve a specific user by its email
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE email = ?`,
      [email]
    );

    // Return the first row of the result, which represents the user
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all users from the "user" table
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);

    // Return the array of users
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing user

  async update(id, { username, email, hashed_password }) {
    // Execute the SQL UPDATE query to modify an existing user
    await this.database.query(
      `UPDATE ${this.table} SET username = COALESCE(?, username), email = COALESCE(?, email), hashed_password = COALESCE(?, hashed_password) WHERE id = ?`,
      [username, email, hashed_password, id]
    );

    const updatedUser = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );

    // Return the number of affected rows
    return updatedUser.length > 0 && updatedUser[0];
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an user by its ID

  async delete(id) {
    // Execute the SQL DELETE query to remove the user
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );

    // Return the number of affected rows
    return result.affectedRows;
  }
}

module.exports = UserManager;
