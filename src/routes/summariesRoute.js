import express from "express";
import summariesController from "../controllers/summariesController";
const router = express.Router();

const summariesRoute = (app) => {
  router.post(
    "/add-student",
    summariesController.handleCreatesummaries
  );
  //   router.get(
  //     "/get-student/:id",
  //     summariesController.handleFindAllStudentByClassId
  //   );
  //   router.get("/get-grade", classController.handleGetAllClassesByGrade);
  //   router.get("/", classController.handleGetAllClasses);
  return app.use("/summaries", router);
};
export default summariesRoute;
