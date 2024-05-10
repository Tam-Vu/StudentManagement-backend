import tuitionsController from '../controllers/tuitionsController'
import express from "express";
const router = express.Router();

const tuitionsRoute = (app) => {
    router.post("/add-tuitions", tuitionsController.handleCreateTuitionsByClass);
    return app.use("/tuitions", router);
}
export default tuitionsRoute;