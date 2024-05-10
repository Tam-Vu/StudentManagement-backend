const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  "studentmanagement",
  "root",
  "Quangtrung13112004$",
  {
    host: "localhost",
    dialect: "mysql",
  }
);

const Connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default Connection;
