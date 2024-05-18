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
import tuitionsRoute from "./routes/tuitionsRoute"
import loginRoute from "./routes/loginRoute"
import cookieParser from "cookie-parser"; 
import {checkUserJwt} from "./middleware/jwtService"
import cors from "cors";
// import jwtAction from '../middleware/jwtService';
require("dotenv").config();

const PORT = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// const checkUserLogin = (req, res, next) => {
//   const nonSecurePath = ['/login'];
//   if (nonSecurePath.includes(req.path)) return next();
//   if(user) {
//     next();
//   }
// }
app.all('*', checkUserJwt);
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
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
loginRoute(app);
Connection();
app.use((req, res) => {
  return res.send("404 not found");
})
app.listen(PORT, () => {
  console.log("backend is running in port: " + PORT);
});
