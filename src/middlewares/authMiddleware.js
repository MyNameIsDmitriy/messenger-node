const jwt = require("jsonwebtoken");
const { secret } = require("../config");

const RoleDAO = require("../DAOs/roleDAO");
const roleDao = new RoleDAO();

module.exports = function (req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ messsage: "The user is not authorized" });
    }
    // const roleData = roleDao.getAllRoles();
    const decodedData = jwt.verify(token, secret);
    // decodedData.role = roleData;
    req.user = decodedData;
    next();
  } catch (e) {
    console.log(e);
    return res.status(403).json({ message: "The user is not authorized" });
  }
};
