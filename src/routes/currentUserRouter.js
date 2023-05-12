import express from "express";
import currentUser from "../controllers/currentUserController.js";
import verifyJWT from "../middleware/verifyJWT.js";

const currentUserRouter = express.Router();

currentUserRouter.use(verifyJWT);
currentUserRouter.get("/", currentUser);

export default currentUserRouter;
