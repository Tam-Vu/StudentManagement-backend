import tuitionsController from '../controllers/tuitionsController'
import express from "express";
const router = express.Router();

const tuitionsRoute = (app) => {
    router.post("/add-tuitions", tuitionsController.handleCreateTuitionsByClass);
    // router.get("/class", tuitionsController.handleFindAllTuitionsByClass);
    router.get("/my-tuitions", tuitionsController.handleGetAllTuitionsByStudentId);
    router.put("/pay/:tuitionId", tuitionsController.handlePayTuition);
    router.get("/in-year/:year", tuitionsController.handleFindAllTuitionOfStudentInYear);
    return app.use("/tuitions", router);
}
export default tuitionsRoute;