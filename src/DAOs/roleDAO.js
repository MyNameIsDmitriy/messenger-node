const mysql = require("mysql2/promise");
const configConnection = require("../config-connection");

class RoleDAO {
  connection = null;
  async connect() {
    this.connection = await mysql.createConnection(configConnection);
  }

  async getAllUserRoles(userId) {
    try {
      const [results] = await this.connection.query(
        "SELECT Roles.roleId, Roles.name FROM UserRoles LEFT JOIN Roles ON UserRoles.roleId = Roles.roleId WHERE userId = ?",
        [userId]
      );
      return results;
    } catch (err) {
      return err;
    }
  }

  async assignUserRole(userId, roleId) {
    try {
      const [results, fields] = await this.connection.query(
        "INSERT INTO UserRoles (userId, roleId) VALUES (?,?)",
        [userId, roleId]
      );
      return this.getAllUserRoles(userId);
    } catch (err) {
      return err;
    }
  }

  async removeUserRole(userId, roleId) {
    try {
      const [results, fields] = await this.connection.query(
        "DELETE FROM UserRoles WHERE userId=? AND roleId=?",
        [userId, roleId]
      );
      return this.getAllUserRoles(userId);
    } catch (err) {
      return err;
    }
  }

  // async getAllRoles() {
  //   try {
  //     const [results] = await this.connection.query("SELECT * FROM Roles");
  //     return results;
  //   } catch (err) {
  //     return err;
  //   }
  // }

  // async getRole(roleId) {
  //   try {
  //     console.log(roleId);
  //     const [results, fields] = await this.connection.query(
  //       "SELECT * FROM Roles WHERE roleId = ?",
  //       [roleId]
  //     );
  //     return results;
  //   } catch (err) {
  //     return err;
  //   }
  // }

  // async createRole(roleData) {
  //   try {
  //     const [results, fields] = await this.connection.query(
  //       "INSERT INTO Roles (name) VALUES (?)",
  //       [roleData]
  //     );
  //     return this.getRole(results.insertId);
  //   } catch (err) {
  //     return err;
  //   }
  // }
}

module.exports = RoleDAO;
