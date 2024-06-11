import express from "express";
import statisticsController from '../controllers/statisticsController'
import { READONLY } from "sqlite3";
const router = express.Router();
/**
 *
 * @param {*} app: express app
 */
const StatisticsRoute = (app) => {
  router.get("/best-students/:year", statisticsController.handleGetBestStudentsByYear);
  router.get("/count-excellent-students/:year", statisticsController.handleCountExcellentStudentsByYear);
  router.get("/compare-three-year/:year", statisticsController.handleCompareNumOfStudentIntwoYearBytitle);
  router.get("/number-of-student-by-title/:year", statisticsController.handleGetAllStudentSortByTitle);
  router.get("/top-ten-students/:year", statisticsController.handleGetTopTenBestStudent);
  router.get("/compare-gpa/:id", statisticsController.handleGetAllGpaOfOneStudent);
  router.get("/compare-gpa-student-to-class/:id/:term/:year", statisticsController.handleCompareGpaStudentToClass);
  return app.use("/statistics", router);
};

export default StatisticsRoute;