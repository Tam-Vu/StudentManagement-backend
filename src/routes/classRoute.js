import express from "express";
import classController from "../controllers/classController";
import summariesController from "../controllers/summariesController";
const router = express.Router();

const ClassRoute = (app) => {
  router.post("/create-class", classController.handleCreateNewClass);
  router.get("/get-grade/:gradename/:year",classController.handleGetAllClassesByGrade);
  router.get("/", classController.handleGetAllClasses);
  router.get("/summaries/:id", classController.handleGetAllSummariesByClass);
  router.get("/teacher/:teacherId", classController.handleFindAllClassByTeacher);
  return app.use("/class", router);
};
export default ClassRoute;
