import express from "express";
import assignmentsController from "../controllers/assignmentsController"
const router = express.Router();

const AssignmentRoute = (app) => {
router.post("/create-assignment", assignmentsController.handleCreateAssignments);
router.get("/all-assigment/:year", assignmentsController.handleGetAllAssignments);
router.delete("/delete", assignmentsController.handleDeleteTeacher);
    return app.use("/assignment", router);
}
export default AssignmentRoute;