const mysql = require("mysql2/promise");
const configConnection = require("../config-connection");

class PublicationDAO {
  connection = null;
  async connect() {
    this.connection = await mysql.createConnection(configConnection);
  }

  // userId isn't neccesary
  async getPublication(userId, publicationId) {
    try {
      const [results] = await this.connection.query(
        "SELECT * FROM Publications WHERE userId=? AND publicationId=?",
        [userId, publicationId]
      );

      return results[0];
    } catch (err) {
      return err;
    }
  }

  async getAllPublications(userId, tokenId) {
    try {
      if (Number(tokenId) === Number(userId)) {
        const [results] = await this.connection.query(
          "SELECT * FROM Publications WHERE userId=?",
          [userId]
        );

        return results;
      } else {
        const [results] = await this.connection.query(
          "SELECT * FROM Publications WHERE userId=? AND isDraft=0",
          [userId]
        );

        return results;
      }
    } catch (err) {
      return err;
    }
  }

  async createPublication(userData, tokenId) {
    try {
      console.log(tokenId);

      const {
        userId: userId,
        isDraft: isDraft,
        content: content,
        currentDateTime: currentDateTime,
      } = userData;

      const [results] = await this.connection.query(
        "INSERT INTO Publications (userId, isDraft, content, publishedAt) VALUES (?,?,?,?)",
        [userId, isDraft, content, currentDateTime]
      );

      // console.log("from createPubl: " + userId + " " + tokenId);

      return this.getAllPublications(userId, tokenId);
    } catch (err) {
      return err;
    }
  }

  async editPublication(userData) {
    try {
      const {
        userId: userId,
        publicationId: publicationId,
        isDraft: isDraft,
        content: content,
        currentDateTime: currentDateTime,
      } = userData;

      const [results] = await this.connection.query(
        "UPDATE Publications SET isDraft=?, content=?, publishedAt=? WHERE userId=? AND publicationId=?",
        [isDraft, content, currentDateTime, userId, publicationId]
      );

      return this.getPublication(userId, publicationId);
    } catch (err) {
      return err;
    }
  }

  async deletePublication(postData, tokenId) {
    try {
      const { userId: userId, publicationId: publicationId } = postData;

      if (userId === tokenId) {
        const deletedPublication = this.getPublication(userId, publicationId);
        const [results] = await this.connection.query(
          "DELETE FROM Publications WHERE userId=? AND publicationId=?",
          [userId, publicationId]
        );

        return deletedPublication;
      } else return { message: "You don't have permission" };
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}

module.exports = PublicationDAO;
