import express from "express";
import classController from "../controllers/classController";
import belongtoclassesController from "../controllers/belongToClassesController";
const router = express.Router();

const ClassRoute = (app) => {
  router.post("/create-class", classController.handleCreateNewClass);
  router.get(
    "/get-student/:id",
    belongtoclassesController.handleFindAllStudentByClassId
  );
  router.get(
    "/get-grade/:gradename/:year",
    classController.handleGetAllClassesByGrade
  );
  router.get("/", classController.handleGetAllClasses);
  return app.use("/class", router);
};
export default ClassRoute;
