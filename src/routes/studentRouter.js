import express from "express";
import studentController from "../controllers/studentController";
import belongtoclassesController from "../controllers/belongToClassesController";
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
    belongtoclassesController.handleFindAllClassByStudentId
  );
  router.get("/:id", studentController.handleFindStudentById);
  router.get("/", belongtoclassesController.handleFindAllStudent);
  router.put(
    "/update-student/:id/:btcId",
    studentController.handleUpdateStudent
  );
  router.put("/delete-student/:id", studentController.handleDeleteStudent);
  router.post("/create-student", studentController.handleCreateNewStudent);
  return app.use("/student", router);
};

export default studentRouter;
