import express from "express";
import subjectController from "../controllers/subjectController";
const router = express.Router();

const subjectRoute = (app) => {
    router.post("/add-subject", subjectController.handleCreateSubject);
    router.get("/", subjectController.handleFindAllSubjects);
    router.get("/:id", subjectController.handleDetailSubject);
    router.put("/update/:id", subjectController.handleUpdateSubject);
    router.put("/delete/:id", subjectController.handleDeleteSubject);
    return app.use("/subjects", router);
}
export default subjectRoute;

