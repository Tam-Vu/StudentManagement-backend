import bodyParser from "body-parser";
import Connection from "./config/connnectDB";
import express from "express";
import AccountRoutes from "./routes/accountRoute";
import GradeRoutes from "./routes/gradeRoute";
import studentRouter from "./routes/studentRouter";
import classRoute from "./routes/classRoute";
import teacherRouter from "./routes/teacher";
import summariesRoute from "./routes/summariesRoute";
import assignmentRoute from "./routes/assignmentRoute";
import summaryDetailsRoute from "./routes/summaryDetailsRoute";
import subjectResultRoute from "./routes/subjectResultRoute";
const cors = require('cors');
require("dotenv").config();

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

GradeRoutes(app);
AccountRoutes(app);
studentRouter(app);
classRoute(app);
teacherRouter(app);
summariesRoute(app);
assignmentRoute(app);
summaryDetailsRoute(app);
subjectResultRoute(app);
Connection();
app.listen(PORT, () => {
  console.log("backend is running in port: " + PORT);
});
