const AbstractManager = require("./AbstractManager");

class MessageManager extends AbstractManager {
  constructor() {
    super({ table: "Message" });
  }

  async create(message) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (sender_id, receiver_id, content) VALUES (?, ?, ?)`,
      [message.sender_id, message.receiver_id, message.content]
    );

    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );

    if (rows.length === 0) {
      throw new Error(`Message with ID ${id} not found`);
    }

    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);

    return rows;
  }

  async update(id, message) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET sender_id = ?, receiver_id = ?, content = ? WHERE id = ?`,
      [message.sender_id, message.receiver_id, message.content, id]
    );

    if (result.affectedRows === 0) {
      throw new Error(`Message with ID ${id} not found`);
    }

    return id;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      throw new Error(`Message with ID ${id} not found`);
    }

    return id;
  }
}

module.exports = MessageManager;
