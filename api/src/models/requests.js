const appDAO = require('../../db/appDAO');

class Requests {
    connectDAO() {
        this.dao = new appDAO('./db/app.db');
    }

    async createTable() {
        this.connectDAO();
        const sql = `
        CREATE TABLE IF NOT EXISTS requests (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          requester INTEGER NOT NULL,
          requestee INTEGER NOT NULL,
          amount INTEGER NOT NULL,
          paid INTEGER NOT NULL,
          receipt INTEGER NOT NULL)`;
        const response = await this.dao.run(sql);
        this.dao.close();
        return response;
      }

    async create(information) {
        this.connectDAO();
        const { requester, requestee, amount, paid, receipt } = information;
        const response = await this.dao.run(
            `INSERT INTO requests (requester, requestee, amount, paid, receipt)
              VALUES (?, ?, ?, ?, ?)`,
            [requester, requestee, amount, paid, receipt]
          );
          this.dao.close();
          return response;
    }

    async getById(id) {
        this.connectDAO();
        const response = this.dao.get(`SELECT * FROM requests WHERE id = ?`, [id]);
        this.dao.close();
        return response;
    }

    async delete(id) {
        this.connectDAO();
        const response = this.dao.run(`DELETE FROM requests WHERE id = ?`, [id]);
        this.dao.close();
        return response;
      }

}
module.exports = Requests;