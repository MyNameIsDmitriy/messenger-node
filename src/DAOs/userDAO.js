const mysql = require("mysql2/promise");
const configConnection = require("../config-connection");

class UserDAO {
  connection = null;
  async connect() {
    this.connection = await mysql.createConnection(configConnection);
  }

  async getAll() {
    try {
      const [results, fields] = await this.connection.query(
        "SELECT * FROM Users"
      );
      return results;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async get(id) {
    try {
      const [results, fields] = await this.connection.query(
        "SELECT * FROM Users WHERE userId=?",
        [id]
      );

      return results[0];
    } catch (err) {
      return err;
    }
  }

  async registration(userData) {
    try {
      const password = userData.password;
      const userName = userData.name;

      const [results] = await this.connection.query(
        `INSERT INTO Users (name, password) VALUES (?,?)`,
        [userName, password]
      );
      const user = await this.get(results.insertId);

      return user;
    } catch (err) {
      return err;
    }
  }

  async login(userName) {
    try {
      const [results] = await this.connection.query(
        `SELECT * FROM Users WHERE name=?`,
        [userName]
      );

      const user = results[0];

      return user;
    } catch (err) {
      return err;
    }
  }

  async update(id, userData) {
    try {
      const [results, fields] = await this.connection.query(
        "UPDATE Users SET name = ?, password=? WHERE userId = ?",
        [userData.name, userData.password, id]
      );

      return this.get(id);
    } catch (err) {
      return err;
    }
  }

  async delete(id) {
    const user = this.get(id);
    try {
      const [results, fields] = await this.connection.query(
        "DELETE FROM Users WHERE userId = ?",
        [id]
      );

      return user;
    } catch (err) {
      return err;
    }
  }
}

module.exports = UserDAO;
