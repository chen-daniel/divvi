const appDAO = require('../../db/appDAO');

class SessionTokens {
  connectDAO() {
    this.dao = new appDAO('./db/app.db');
  }

  async createTable() {
    this.connectDAO();
    const sql = `
    CREATE TABLE IF NOT EXISTS session_tokens (
      accountId INTEGER NOT NULL,
      token TEXT PRIMARY KEY UNIQUE NOT NULL,
      expiryDate DATETIME,
      CONSTRAINT session_tokens_fk_accountId FOREIGN KEY (accountId)
        REFERENCES accounts(id) ON UPDATE CASCADE ON DELETE CASCADE)`;
    const response = await this.dao.run(sql);
    this.dao.close();
    return response;
  }

  async create(accountId, token, expiryDate) {
    this.connectDAO();
    const response = await this.dao.run(
      'INSERT INTO session_tokens (accountId, token, expiryDate) VALUES (?, ?, ?)',
      [accountId, token, expiryDate]
    );
    this.dao.close();
    return response;
  }

  async update(session_token) {
    this.connectDAO();
    const { accountId, token, expiryDate } = session_token;
    const response = await this.dao.run(
      `UPDATE session_tokens 
      SET accountId = ?, 
        expiryDate = ? 
      WHERE token = ?`,
      [accountId, token, expiryDate]
    );
    this.dao.close();
    return response;
  }

  async delete(token) {
    this.connectDAO();
    const response = await this.dao.run(
      `DELETE FROM session_tokens WHERE token = ?`,
      [token]
    );
    this.dao.close();
    return response;
  }

  async getById(token) {
    this.connectDAO();
    const response = await this.dao.get(
      `SELECT * FROM session_tokens WHERE token = ?`,
      [token]
    );
    this.dao.close();
    return response;
  }

  async getAll() {
    this.connectDAO();
    const response = await this.dao.all(`SELECT * FROM session_tokens`);
    this.dao.close();
    return response;
  }
}
module.exports = SessionTokens;
