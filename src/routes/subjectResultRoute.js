import express from "express";
import subjectResultController from "../controllers/subjectResultController"
const router = express.Router();

const subjectResultRoute = (app) => {
router.post("/input-subject-result", subjectResultController.handleInputPoint);
    return app.use("/subject-result", router);
}
export default subjectResultRoute;