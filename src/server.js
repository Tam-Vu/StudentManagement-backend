import bodyParser from "body-parser";
import Connection from "./config/connnectDB";
import express from "express";
import initWebRoutes from "./routes/web.js";
require("dotenv").config();

const PORT = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

initWebRoutes(app);

Connection();
app.listen(PORT, () => {
    console.log("backend is running in port: " + PORT);
});