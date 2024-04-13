import express from "express";
import studentController from "../controllers/studentController";
const router = express.Router();
// const studentRouter = express.Router();
/**
 *
 * @param {*} app: express app
 */
//gọi tên hàm từ controller không cần ()
const studentRouter = (app) => {
  router.get("/get-class", studentController.handleFindStudentByClassname);
  router.get("/:id", studentController.handleFindStudentById);
  router.get("/", studentController.handleFindAllStudent);
  router.put("/update-student/:id", studentController.handleUpdateStudent);
  router.put("/delete-student/:id", studentController.handleDeleteStudent);
  router.post("/create-student", studentController.handleCreateNewStudent);
  return app.use("/student", router);
};

export default studentRouter;
