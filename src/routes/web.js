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

    router.post("/account/create-account", accountController.handleCreateNewAccount);
    router.get("/account", accountController.handleFindAllUser);
    router.get("/account/:id", accountController.handleFindUserById);
    router.post("/account/update-account/:id", accountController.handleUpdateUser);
    router.post("/account/delete-account/:id", accountController.handleDeleteUser);
    return app.use("/", router);
}

export default initWebRoutes;   