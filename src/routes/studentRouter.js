import express from "express";
import studentController from "../controllers/studentController";
import accountController from "../controllers/accountController";
const router = express.Router();
// const studentRouter = express.Router();
/**
 *
 * @param {*} app: express app
 */
//gọi tên hàm từ controller không cần ()
const studentRouter = (app) => {
  router.post("/create-student", studentController.handleCreateNewStudent);
  return app.use("/student", router);
};

export default studentRouter;
