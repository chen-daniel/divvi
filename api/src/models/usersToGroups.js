const appDAO = require('../../db/appDAO');

class UserToGroups {
    connectDAO() {
      this.dao = new appDAO('./db/app.db');
    }
  
    async createTable() {
      this.connectDAO();
      const sql = `
      CREATE TABLE IF NOT EXISTS user_groups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        groupId INTEGER NOT NULL,
        userId INTEGER NOT NULL)`;
      const response = await this.dao.run(sql);
      this.dao.close();
      return response;
    }
  
    async create(userId, groupId) {
      this.connectDAO();
      const response = await this.dao.run(
        'INSERT INTO user_groups (userId, groupId) VALUES (?, ?)',
        [userId, groupId]
      );
      this.dao.close();
      return response;
    }

    async createMultiple(id, userIds, groupId) {
        responses = []
        this.connectDAO();
        for(i = 0; i < userIds.length; i++) {
            const response = await this.dao.run(
            'INSERT INTO user_groups (id, userId, groupId) VALUES (?, ?, ?)',
            [id, userIds[i], groupId]
            );
            responses.push(response)
        }
        this.dao.close();
        return responses;
      }
  
    async delete(id) {
      this.connectDAO();
      const response = await this.dao.run(
        `DELETE FROM user_groups WHERE id = ?`,
        [id]
      );
      this.dao.close();
      return response;
    }
  
    async getById(id) {
      this.connectDAO();
      const response = await this.dao.get(
        `SELECT * FROM user_groups WHERE id = ?`,
        [id]
      );
      this.dao.close();
      return response;
    }
  
    async getAll() {
      this.connectDAO();
      const response = await this.dao.all(`SELECT * FROM user_groups`);
      this.dao.close();
      return response;
    }

    async getAllGroupsForUser(userId) {
        this.connectDAO();
        const response = await this.dao.get(
          `SELECT * FROM user_groups WHERE userId = ?`,
          [userId]
        );
        this.dao.close();
        return response;
    }
  }
  module.exports = UserToGroups;