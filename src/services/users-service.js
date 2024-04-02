const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class UsersService {
  constructor(userDao) {
    this.userDao = userDao;
  }

  getAllUsers() {
    return this.userDao.getAll();
  }

  getUserById(id) {
    return this.userDao.get(id);
  }

  updateUser(id, userData) {
    return this.userDao.update(id, userData);
  }

  deleteUser(id) {
    return this.userDao.delete(id);
  }

  registerUser(userData) {
    userData.password = bcrypt.hashSync(userData.password, 7);

    return this.userDao.registration(userData);
  }

  async loginUser(userName, password) {
    try {
      const { secret } = require("../config.js");

      const generateAccessToken = (id) => {
        const payload = { id };
        return jwt.sign(payload, secret, { expiresIn: "24h" });
      };

      const user = await this.userDao.login(userName);
      const validPassword = bcrypt.compareSync(password, user.password);
      const token = generateAccessToken(user.userId);

      return [user, validPassword, token];
    } catch (e) {
      return e;
    }
  }
}

module.exports = UsersService;
