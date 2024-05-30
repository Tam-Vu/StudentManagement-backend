import express from "express";
import statisticsController from '../controllers/statisticsController'
const router = express.Router();
/**
 *
 * @param {*} app: express app
 */
//gọi tên hàm từ controller không cần ()
const StatisticsRoute = (app) => {
  router.get("/best-students/:year", statisticsController.handleGetBestStudentsByYear);
  router.get("/count-excellent-students/:year", statisticsController.handleCountExcellentStudentsByYear);

  return app.use("/statistics", router);
};

export default StatisticsRoute;