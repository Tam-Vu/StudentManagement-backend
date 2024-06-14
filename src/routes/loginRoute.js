import express from "express";
import accountController from "../controllers/accountController";
const router = express.Router();
const LoginRoute = (app) => {
    router.post("/login", accountController.handleLogin);
    router.post("/logout", accountController.handleLogout);

    return app.use("/", router);
}
export default LoginRoute;