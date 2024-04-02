const express = require("express");

const authRouter = require("./src/routers/auth-router.js");
const roleRouter = require("./src/routers/role-router.js");
const usersRouter = require("./src/routers/users-router.js");
const publicationRouter = require("./src/routers/publication-router.js");

const UserDAO = require("./src/DAOs/userDAO.js");
const RoleDAO = require("./src/DAOs/roleDAO.js");
const PublicationDAO = require("./src/DAOs/publicationDAO.js");

const UsersService = require("./src/services/users-service.js");
const RolesService = require("./src/services/roles-service.js");
const PublicationsService = require("./src/services/publications-service.js");

const errorHadler = require("./src/middlewares/error.js");

const port = process.env.PORT || 3000;

const initServer = async () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  });

  // init DAO
  const userDao = new UserDAO();
  const roleDao = new RoleDAO();
  const publicationDao = new PublicationDAO();

  // init services
  const usersService = new UsersService(userDao);
  const rolesService = new RolesService(roleDao);
  const publicationsService = new PublicationsService(publicationDao);

  await userDao.connect();
  await roleDao.connect();
  await publicationDao.connect();

  // create routers
  app.use("/users", usersRouter(usersService));
  app.use("/roles", roleRouter(rolesService));
  app.use("/auth", authRouter(usersService));
  app.use("/publications", publicationRouter(publicationsService));

  app.use(errorHadler);
  return app;
};

// start app
initServer().then((server) => {
  server.listen(port);
});
