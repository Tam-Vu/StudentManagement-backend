import express from "express";
import classController from "../controllers/classController";
const router = express.Router();

const ClassRoute = (app) => {
  router.post("/create-class", classController.handleCreateNewClass);
  router.get("/get-grade", classController.handleGetAllClassesByGrade);
  router.get("/", classController.handleGetAllClasses);
  return app.use("/class", router);
};
export default ClassRoute;
