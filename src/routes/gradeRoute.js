import express from "express";
import gradeController from "../controllers/gradeController";
const router = express.Router();

const GradeRoutes = (app) => {
  router.post("/new-year", gradeController.newYearGrade);
  router.get("/find/:year", gradeController.findGradeByYear);
  router.get("/get-year", gradeController.findAllYear);
  router.put("/change-term", gradeController.handleChangeTerm);
  return app.use("/grade", router);
};
export default GradeRoutes;
