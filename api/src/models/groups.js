const appDAO = require('../../db/appDAO');

class Groups {
  connectDAO() {
    this.dao = new appDAO('./db/app.db');
  }

  async createTable() {
    this.connectDAO();
    const sql = `
      CREATE TABLE IF NOT EXISTS groups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL)`;
    const response = await this.dao.run(sql);
    this.dao.close();
    return response;
  }

  async create(name) {
    this.connectDAO();
    const response = await this.dao.run(
      'INSERT INTO groups (name) VALUES (?)',
      [name]
    );
    this.dao.close();
    return response;
  }

  async update(name) {
    this.connectDAO();
    const { id, name } = groups;
    const response = await this.dao.run(
      `UPDATE groups 
        SET name = ?, 
        WHERE id = ?`,
      [name, id]
    );
    this.dao.close();
    return response;
  }

  async delete(id) {
    this.connectDAO();
    const response = await this.dao.run(`DELETE FROM groups WHERE id = ?`, [
      id
    ]);
    this.dao.close();
    return response;
  }

  async getById(id) {
    this.connectDAO();
    const response = await this.dao.get(`SELECT * FROM groups WHERE id = ?`, [
      id
    ]);
    this.dao.close();
    return response;
  }

  async getAll() {
    this.connectDAO();
    const response = await this.dao.all(`SELECT * FROM groups`);
    this.dao.close();
    return response;
  }

  async getAllForAccount(accountId) {
    this.connectDAO();
    const response = await this.dao.all(
      `SELECT groups.id, groups.name FROM groups, user_groups WHERE user_groups.groupId = groups.id AND user_groups.userId = ${accountId}`
    );
    this.dao.close();
    return response;
  }
}
module.exports = Groups;
