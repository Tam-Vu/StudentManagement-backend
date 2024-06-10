import express from "express";
import studentController from "../controllers/studentController";
import summariesController from "../controllers/summariesController";
import schoolreportController from "../controllers/schoolreportController";
import { checkUserJwt } from "../middleware/jwtService";
const router = express.Router();
const multer = require("multer");
const upload = multer();
// const studentRouter = express.Router();
/**
 *
 * @param {*} app: express app
 */
//gọi tên hàm từ controller không cần ()
const studentRouter = (app) => {
  router.get(
    "/get-class/:id",
    schoolreportController.handleFindAllClassByStudentId
  );
  router.get("/:id", studentController.handleFindStudentById);
  router.get("/", studentController.handleFindAllStudent);
  router.put("/update-student/:id/:btcId",studentController.handleUpdateStudent);
  router.put("/delete-student/:id", studentController.handleDeleteStudent);
  router.post("/create-student",upload.single("image"),studentController.handleCreateNewStudent);
  // router.get("/student-without-class/:year", studentController.handleFindNonClassStudent);
  router.get("/student-without-class/:id",studentController.handleFindAllNonClassStudentByClassId);
  router.get("/student-in-year/:year", studentController.handleFindAllStudentInYear);
  return app.use("/student", router);
};

export default studentRouter;
