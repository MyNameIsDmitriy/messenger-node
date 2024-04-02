class RolesService {
  constructor(roleDao) {
    this.roleDao = roleDao;
  }

  getAllUserRoles(userId) {
    return this.roleDao.getAllUserRoles(userId);
  }

  assignUserRole(userId, roleId) {
    return this.roleDao.assignUserRole(userId, roleId);
  }

  removeUserRole(userId, roleId) {
    return this.roleDao.removeUserRole(userId, roleId);
  }
}

module.exports = RolesService;
