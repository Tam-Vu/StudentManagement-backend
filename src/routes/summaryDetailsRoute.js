import express from "express";
const router = express.Router();
import summaryDetailsController from "../controllers/summaryDetailsController";

const summaryDetailsRoute = (app) => {
    router.post("/create-new-detail-summary", summaryDetailsController.handleCreateSummaryDetails);
    router.post("/", summaryDetailsController.handleFindAllSummaryDetails);
    router.put("/update-details-summary", summaryDetailsController.handleUpdateSummaryDetails);
    router.delete('/delete-details-summary', summaryDetailsController.handleDeleteSummaryDetails);
    return app.use("/detail-summary", router);
}
export default summaryDetailsRoute;
