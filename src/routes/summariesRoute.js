import express from "express";
import summariesController from "../controllers/summariesController";
import schoolreportController from "../controllers/schoolreportController";
const router = express.Router();

const summariesRoute = (app) => {
  router.post("/add-student/:id",schoolreportController.handleCreateSchoolreport);
  router.get("/get-student/:id",schoolreportController.handleFindAllStudentByClassId);
  router.get("/all-year/:id/:gradename", schoolreportController.handleShowSchoolreportByStudentId);
  router.get("/:id/:gradename/:term", summariesController.handleGetSummariesByTerm);
  router.delete("/delete-summaries/:studentId/:classId", schoolreportController.handleDeleteSchoolreport);
  return app.use("/summaries", router);
};
export default summariesRoute;
