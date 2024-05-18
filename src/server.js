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
import subjectRoute from "./routes/subjectRoute";
import tuitionsRoute from "./routes/tuitionsRoute";
import cors from "cors";
require("dotenv").config();

const PORT = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true,
  })
);

GradeRoutes(app);
AccountRoutes(app);
studentRouter(app);
classRoute(app);
teacherRouter(app);
summariesRoute(app);
assignmentRoute(app);
summaryDetailsRoute(app);
subjectResultRoute(app);
subjectRoute(app);
tuitionsRoute(app);
Connection();
app.listen(PORT, () => {
  console.log("backend is running in port: " + PORT);
});
