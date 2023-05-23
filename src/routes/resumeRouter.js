import express from "express";
import verifyJWT from "../middleware/verifyJWT.js";
import resumeController from "../controllers/resume/resumeController.js";
import createResumeController from "../controllers/resume/createResumeController.js";
import deleteResumeController from "../controllers/resume/deleteResumeController.js";

const resumeRouter = express.Router();

resumeRouter.use(verifyJWT);
resumeRouter.get("/resume", resumeController);
resumeRouter.post("/resume", createResumeController);
resumeRouter.delete("/resume", deleteResumeController);

export default resumeRouter;
