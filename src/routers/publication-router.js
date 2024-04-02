const express = require("express");
const publicationRouter = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

module.exports = (publicationsService) => {
  publicationRouter.get("/:id", authMiddleware, async (req, res) => {
    try {
      res.send(
        await publicationsService.getAllPublications(
          Number(req.params["id"]),
          req.user.id
        )
      );
    } catch (e) {
      res.status(e.statusCode).json({ messsage: e.message });
    }
  });

  publicationRouter.post("/", authMiddleware, async (req, res) => {
    try {
      res.send(
        await publicationsService.createPublication(req.body, req.user.id)
      );
    } catch (e) {
      res.status(e.statusCode).json({ messsage: e.message });
    }
  });

  publicationRouter.put("/", async (req, res) => {
    try {
      res.send(await publicationsService.editPublication(req.body));
    } catch (e) {
      res.status(e.statusCode).json({ messsage: e.message });
    }
  });

  publicationRouter.delete("/", authMiddleware, async (req, res) => {
    try {
      res.send(
        await publicationsService.deletePublication(req.body, req.user.id)
      );
    } catch (e) {
      res.status(e.statusCode).json({ messsage: e.message });
    }
  });

  return publicationRouter;
};
