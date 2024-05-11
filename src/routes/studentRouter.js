import express from "express";
import studentController from "../controllers/studentController";
import summariesController from "../controllers/summariesController";
const router = express.Router();
// const studentRouter = express.Router();
/**
 *
 * @param {*} app: express app
 */
//gọi tên hàm từ controller không cần ()
const studentRouter = (app) => {
  router.get(
    "/get-class/:id",
    summariesController.handleFindAllClassByStudentId
  );
  router.get("/:id", studentController.handleFindStudentById);
  router.get("/", summariesController.handleFindAllStudent);
  router.put(
    "/update-student/:id/:btcId",
    studentController.handleUpdateStudent
  );
  router.put("/delete-student/:id", studentController.handleDeleteStudent);
  router.post("/create-student", studentController.handleCreateNewStudent);
  router.post("/student-without-class/:year", studentController.handleFindNonClassStudent);
  router.get("/student-without-class/:id", studentController.handleFindAllNonClassStudentByClassId)
  return app.use("/student", router);
};

export default studentRouter;
