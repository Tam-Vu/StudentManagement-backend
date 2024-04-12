import express from "express";
import teacherController from "../controllers/teacherController";
const router = express.Router();
// const studentRouter = express.Router();
/**
 *
 * @param {*} app: express app
 */
//gọi tên hàm từ controller không cần ()
const teacherRouter = (app) => {
  router.get("/:id", teacherController.handleFindStudentById);
  router.get("/", teacherController.handleFindAllStudent);
  router.put("/update-teacher/:id", teacherController.handleUpdateStudent);
  router.put("/delete-teacher/:id", teacherController.handleDeleteTeacher);
  router.post("/create-teacher", teacherController.handleCreateNewStudent);
  return app.use("/teacher", router);
};

export default teacherRouter;
