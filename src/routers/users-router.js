const { body, validationResult } = require("express-validator");
const express = require("express");
const usersRouter = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

// TODO разные представления для пользователя в зависимости от ролей

module.exports = (usersService) => {
  const nameValidation = body("name")
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage("Name must be shorter than 31 characters but longer than two");

  const passwordValidation = body("password")
    .trim()
    .custom((value) => {
      if (value.length < 8) {
        throw new Error("password must contain at least 8 characters");
      }

      if (!value.match(/\d/g)) {
        throw new Error("The password must contain at least one digit");
      }

      if (!value.match(/[A-Z]/g)) {
        throw new Error(
          "The password must contain at least one uppercase letter"
        );
      }

      if (!value.match(/[!@#\$%\^\&*\)\(+=._-]/g)) {
        throw new Error(
          "The password must contain at least one special character"
        );
      }

      return true;
    });

  usersRouter.get("/", async (req, res) => {
    try {
      res.send(await usersService.getAllUsers()); 
    } catch (e) {
      res.status(e.statusCode).json({ messsage: e.message });
    }
  });

  usersRouter.get(`/:id`, authMiddleware, async (req, res, next) => {
    try {
      res.send(await usersService.getUserById(Number(req.params["id"]))); 
    } catch (e) {
      res.status(e.statusCode).json({ messsage: e.message });
    }
  });

  usersRouter.put(
    "/:id",
    nameValidation,
    passwordValidation,
    async (req, res) => {
      const errResult = validationResult(req);

      if (!errResult.isEmpty()) {
        res.send({ errors: errResult.array() });
      } else {
        try {
          res.send(
            await usersService.updateUser(Number(req.params["id"]), req.body) 
          );
        } catch (e) {
          res.status(e.statusCode).json({ messsage: e.message });
        }
      }
    }
  );

  usersRouter.delete("/:id", async (req, res) => {
    try {
      res.send(await usersService.deleteUser(Number(req.params["id"]))); 
    } catch (e) {
      res.status(e.statusCode).json({ messsage: e.message });
    }
  });

  return usersRouter;
};
