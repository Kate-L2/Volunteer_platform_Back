import express from "express";
import login from "../controllers/loginController.js";
import loginLimiter from "../middleware/loginLimiter.js";

const loginRouter = express.Router();

loginRouter.post("/", loginLimiter, login);

export default loginRouter;
