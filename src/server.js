import bodyParser from "body-parser";
import Connection from "./config/connnectDB";
import express from "express";
import AccountRoutes from "./routes/account";
import GradeRoutes from "./routes/grade";
import studentRouter from "./routes/studentRouter";
require("dotenv").config();

const PORT = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

GradeRoutes(app);
AccountRoutes(app);
studentRouter(app);
Connection();
app.listen(PORT, () => {
  console.log("backend is running in port: " + PORT);
});
