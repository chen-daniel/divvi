const appDAO = require('../../db/appDAO');

class Accounts {
  connectDAO() {
    this.dao = new appDAO('./db/app.db');
  }

  createTable() {
    this.connectDAO();
    const sql = `
      CREATE TABLE IF NOT EXISTS accounts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        fullName TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL)`;
    const response = this.dao.run(sql);
    this.dao.close();
    return response;
  }

  create(username, password, fullName, email) {
    this.connectDAO();
    const response = this.dao.run(
      `INSERT INTO accounts (username, password, fullName, email)
        VALUES (?, ?, ?, ?)`,
      [username, password, fullName, email]
    );
    this.dao.close();
    return response;
  }

  update(account) {
    this.connectDAO();
    const { id, username, password, fullName, email } = account;
    const response = this.dao.run(
      `UPDATE accounts
      SET username = ?,
        password = ?,
        fullName = ?,
        email = ?
      WHERE id = ?`,
      [username, password, fullName, email, id]
    );
    this.dao.close();
    return response;
  }

  delete(id) {
    this.connectDAO();
    const response = this.dao.run(`DELETE FROM accounts WHERE id = ?`, [id]);
    this.dao.close();
    return response;
  }

  getById(id) {
    this.connectDAO();
    const response = this.dao.get(`SELECT * FROM accounts WHERE id = ?`, [id]);
    this.dao.close();
    return response;
  }

  getByUsername(username) {
    this.connectDAO();
    const response = this.dao.get(`SELECT * FROM accounts WHERE username = ?`, [
      username
    ]);
    this.dao.close();
    return response;
  }

  getAll() {
    this.connectDAO();
    const response = this.dao.all(`SELECT * FROM accounts`);
    this.dao.close();
    return response;
  }
}

module.exports = Accounts;
