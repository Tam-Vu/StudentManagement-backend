import express from "express";
import accountController from "../controllers/accountController";
const router = express.Router();
const LoginRoute = (app) => {
    router.post("/login", accountController.handleLogin);
    return app.use("/", router);
}
export default LoginRoute;