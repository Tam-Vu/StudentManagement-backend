import express from "express";
const router = express.Router();
import summaryDetailsController from "../controllers/summaryDetailsController";

const summaryDetailsRoute = (app) => {
    router.post("/create-new-detail-summary", summaryDetailsController.handleCreateSummaryDetails);
    router.get("/students", summaryDetailsController.handleGetAllStudentThisYear);
    router.get("/all-fringes", summaryDetailsController.handleGetAllFringes);
    router.get("/:id", summaryDetailsController.handleFindAllSummaryDetails);
    router.delete('/delete-details-summary/:id', summaryDetailsController.handleDeleteSummaryDetails);
    return app.use("/detail-summary", router);
}
export default summaryDetailsRoute;
