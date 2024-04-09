import express from "express";
import studentController from "../controllers/studentController";
import accountController from "../controllers/accountController";
const router = express.Router();

/**
 * 
 * @param {*} app: express app 
 */
//gọi tên hàm từ controller không cần ()
const initWebRoutes = (app) => {
    router.get("/", (req, res) => {
        console.log(req.body);
    });

    router.post("/account/create-account", accountController.handleCreateNewAccount)

    return app.use("/", router);
}

export default initWebRoutes;   