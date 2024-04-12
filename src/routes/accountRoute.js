import express from "express";
import accountController from "../controllers/accountController";
import studentController from "../controllers/studentController";
const router = express.Router();
/**
 * 
 * @param {*} app: express app 
 */
//gọi tên hàm từ controller không cần ()
const AccountRoutes = (app) => {
    router.post("/create-account", accountController.handleCreateNewAccount);
    router.get("/", accountController.handleFindAllUser);
    router.get("/:id", accountController.handleFindUserById);
    router.post("/update-account/:id", accountController.handleUpdateUser);
    router.post("/delete-account/:id", accountController.handleDeleteUser);
    return app.use("/account", router);
};


export default AccountRoutes;   