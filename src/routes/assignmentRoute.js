import express from "express";
import assignmentsController from "../controllers/assignmentsController"
const router = express.Router();

const AssignmentRoute = (app) => {
router.post("/create-assignment", assignmentsController.handleCreateAssignments);
    return app.use("/assignment", router);
}
export default AssignmentRoute;