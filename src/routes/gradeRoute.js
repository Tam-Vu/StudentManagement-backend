import express from "express";
import gradeController from "../controllers/gradeController"
const router = express.Router();

const GradeRoutes = (app) => {
router.post("/new-year", gradeController.newYearGrade);

    return app.use("/grade", router);
}
export default GradeRoutes;