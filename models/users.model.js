const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("mysql_test", "root", "example", {
  host: "127.0.0.1",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

const Users = sequelize.define(
  "Users",
  {
    userId: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
      type: Sequelize.DataTypes.INTEGER,
    },
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

Users.sync({ force: true });
console.log("Таблица для модели `User` только что была создана заново!");
