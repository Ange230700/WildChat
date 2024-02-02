const AbstractManager = require("./AbstractManager");

class ChatSessionManager extends AbstractManager {
  constructor() {
    super({ table: "Chat_session" });
  }

  async create(chatSession) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (user1_id, user2_id, last_message_id) VALUES (?, ?, ?)`,
      [chatSession.user1_id, chatSession.user2_id, chatSession.last_message_id]
    );

    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );

    if (rows.length === 0) {
      throw new Error(`ChatSession with ID ${id} not found`);
    }

    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);

    return rows;
  }

  async update(id, chatSession) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET user1_id = ?, user2_id = ?, last_message_id = ? WHERE id = ?`,
      [chatSession.user_id, chatSession.chat_id, id]
    );

    if (result.affectedRows === 0) {
      throw new Error(`ChatSession with ID ${id} not found`);
    }

    return id;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      throw new Error(`ChatSession with ID ${id} not found`);
    }

    return id;
  }
}

module.exports = ChatSessionManager;
