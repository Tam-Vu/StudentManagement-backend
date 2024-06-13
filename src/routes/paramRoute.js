import express from "express";
import paramController from "../controllers/paramsController"
const router = express.Router();

const ParamRoute = (app) => {
    router.get("/", paramController.handleGetAllParam);
    router.put("/update-params", paramController.handleUpdateParamController);
    return app.use("/params", router);
}
export default ParamRoute;