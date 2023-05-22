import express from "express";
import verifyJWT from "../middleware/verifyJWT.js";
import resumeController from "../controllers/resume/resumeController.js";
import createResumeController from "../controllers/resume/createResumeController.js";

const resumeRouter = express.Router();

resumeRouter.use(verifyJWT);
resumeRouter.get("/resume", resumeController);
resumeRouter.post("/resume", createResumeController);

export default resumeRouter;
