const appDAO = require('../../db/appDAO');

class Receipts {
    connectDAO() {
        this.dao = new appDAO('./db/app.db');
    }

    async createTable() {
        this.connectDAO();
        const sql = `
        CREATE TABLE IF NOT EXISTS receipts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          groupId INTEGER NOT NULL,
          ownerId INTEGER NOT NULL,
          description TEXT,
          receipt BLOB NOT NULL,
          type INTEGER NOT NULL,
          status INTEGER NOT NULL)`;
        const response = await this.dao.run(sql);
        this.dao.close();
        return response;
      }

    async create(information) {
        this.connectDAO();
        const { groupId, ownerId, description, receipt, type, status } = information;
        const response = await this.dao.run(
            `INSERT INTO receipts (groupId, ownerId, description, receipt, type, status)
              VALUES (?, ?, ?, ?, ?, ?)`,
            [groupId, ownerId, description, receipt, type, status]
          );
          this.dao.close();
          return response;
      }

    async getReceiptByGroupId(groupId) {
        this.connectDAO();
        const response = await this.dao.run(
            `SELECT * FROM receipts WHERE groupId =?`, [groupId]
        );

        this.dao.close();
        return response;
    }


    async update(id, information) {
        this.connectDAO();
        const { groupId, ownerId, description, receipt, type, status } = information;
        const response = await this.dao.run(
          `UPDATE receipts
          SET groupId = ?,
            ownerId = ?,
            description = ?,
            receipt = ?,
            type = ?,
            status = ? 
          WHERE id = ?`,
          [groupId, ownerId, description, receipt, type, status, id]
        );
        this.dao.close();
        return response;
      }

    async delete(id, userId) {
        this.connectDAO();
        const response = await this.dao.run(`DELETE FROM receipts WHERE id = ? AND ownerId = ?`, [id, userId]);
        this.dao.close();
        return response;
      }

    async ownerAssign(userIds, index) {
        console.log("not decided");
    }

    async personPay(id, userId, indexList) {
        var rec = await this.dao.run(`SELECT receipt FROM receipts WHERE id = ?`, [id]);
        for (i = 0; i < indexList; i++) {
            rec.items[indexList[i]].claimers.push(userId);
        }

        const response = await this.dao.run(
            `UPDATE receipts
            SET receipt = ?
            WHERE id = ?`,
            [rec, id]
        );
        this.dao.close();
        return response;
    }
}
module.exports = Receipts;