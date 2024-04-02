const express = require("express");
const { body, validationResult } = require("express-validator");
const authRouter = express.Router();

module.exports = (usersService) => {
  const nameValidation = body("name")
    .trim()
    .custom((value) => {
      if (value.length < 2) {
        throw new Error("The name must be at least 2 characters");
      }

      if (value.length > 30) {
        throw new Error("The name must be less than 31 characters");
      }

      if (value.match(/[!@#\$%\^\&*\)\(+=.-]/g)) {
        throw new Error("The name cannot contain special characters");
      }

      return true;
    });

  authRouter.post("/register", nameValidation, async (req, res) => {
    const errResult = validationResult(req);

    if (!errResult.isEmpty()) {
      res.send({ errors: errResult.array() });
    } else {
      try {
        res.send(await usersService.registerUser(req.body));
      } catch (e) {
        res.status(e.statusCode).json({ messsage: e.message });
      }
    }
  });

  authRouter.post("/login", async (req, res) => {
    const [user, validPassword, token] = await usersService.loginUser(
      req.body.name,
      req.body.password
    );

    // как валидировать ???
    if (user == undefined) {
      return res.status(400).json({ message: "User not found" });
    }
    if (!validPassword) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    if (validPassword) {
      res.json({ token });
    }
  });

  return authRouter;
};
