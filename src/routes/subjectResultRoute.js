import express from "express";
import subjectResultController from "../controllers/subjectResultController"
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const subjectResultRoute = (app) => {
    router.post("/input-subject-result", subjectResultController.handleInputPoint);
    // router.post("/import-excel-of-score", upload.single('file'), subjectResultController.handleImportSoreByExcel)
    return app.use("/subject-result", router);
}
export default subjectResultRoute;