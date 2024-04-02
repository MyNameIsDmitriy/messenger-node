const express = require("express");
const roleRouter = express.Router();
const { body, validationResult } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware");

module.exports = (rolesService) => {
  roleRouter.get("/:id", async (req, res) => {
    try {
      res.send(await rolesService.getAllUserRoles(Number(req.params["id"])));
    } catch (e) {
      res.status(e.statusCode).json({ messsage: e.message });
    }
  });

  roleRouter.post("/", async (req, res) => {
    try {
      res.send(
        await rolesService.assignUserRole(
          Number(req.body.userId),
          Number(req.body.roleId)
        )
      );
    } catch (e) {
      res.status(e.statusCode).json({ messsage: e.message });
    }
  });

  roleRouter.delete("/", async (req, res) => {
    try {
      res.send(
        await rolesService.removeUserRole(
          Number(req.body.userId),
          Number(req.body.roleId)
        )
      );
    } catch (e) {
      res.status(e.statusCode).json({ messsage: e.message });
    }
  });

  // Create role
  // roleRouter.post("/", async (req, res) => {
  //   res.send(await roleDao.createRole(req.body.name));
  // });

  // Update role
  // roleRouter.put("/:id", (req, res) => {
  //   if (typeof roleDao.get(Number(req.params["id"])) != "undefined") {
  //     res.send(roleDao.update(Number(req.params["id"]), req.body));
  //   } else
  //     res.status(404).send({
  //       message: "not found",
  //       code: 404,
  //     });
  // });

  // Delete role
  // roleRouter.delete("/:id", (req, res) => {
  //   if (typeof roleDao.get(Number(req.params["id"])) != "undefined") {
  //     res.send(roleDao.delete(Number(req.params["id"])));
  //   } else
  //     res.status(404).send({
  //       message: "not found",
  //       code: 404,
  //     });
  // });

  return roleRouter;
};
