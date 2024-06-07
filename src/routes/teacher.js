import express from "express";
import teacherController from "../controllers/teacherController";
const router = express.Router();
const multer = require('multer');
const upload = multer();
// const studentRouter = express.Router();
/**
 *
 * @param {*} app: express app
 */
//gọi tên hàm từ controller không cần ()
const teacherRouter = (app) => {
  router.get("/:id", teacherController.handleFindTeacherById);
  router.get("/", teacherController.handleFindAllTeacher);
  router.put("/update-teacher/:id", teacherController.handleUpdateTeacher);
  router.put("/delete-teacher/:id", teacherController.handleDeleteTeacher);
  router.post("/create-teacher", upload.single("image"), teacherController.handleCreateNewTeacher);
  router.post("/class-without-subject-teacher", teacherController.handleFindClassNonSubjectClass);
  router.get("/subject/:subjectId", teacherController.handleFindAllteacherBySubjectId)
  return app.use("/teacher", router);
};

export default teacherRouter;
