import express from "express";
import classController from "../controllers/classController";
import belongtoclassesController from "../controllers/belongToClassesController";
const router = express.Router();

const belongToClassesRoute = (app) => {
  router.post(
    "/add-student",
    belongtoclassesController.handleCreateBelongToClasses
  );
  //   router.get(
  //     "/get-student/:id",
  //     belongtoclassesController.handleFindAllStudentByClassId
  //   );
  //   router.get("/get-grade", classController.handleGetAllClassesByGrade);
  //   router.get("/", classController.handleGetAllClasses);
  return app.use("/belongToClasses", router);
};
export default belongToClassesRoute;
