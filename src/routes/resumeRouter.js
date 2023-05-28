import express from "express";
import verifyJWT from "../middleware/verifyJWT.js";
import verifyRole from "../middleware/verifyRole.js";
import getUserFromToken from "../middleware/getUserFromToken.js";
import resumeController from "../controllers/resume/resumeController.js";
import resumesController from "../controllers/resume/resumesController.js";
import createResumeController from "../controllers/resume/createResumeController.js";
import deleteResumeController from "../controllers/resume/deleteResumeController.js";
import editResumeController from "../controllers/resume/editResumeController.js";
import { ROLES } from "../constants.js";
import resumeByIdController from "../controllers/resume/resumeByIdController.js";

const resumeRouter = express.Router();

// public
resumeRouter.get("/resume/:id", resumeByIdController);
resumeRouter.use(getUserFromToken);
resumeRouter.get("/resumes", resumesController);

// private
resumeRouter.use(verifyJWT);
resumeRouter.use(verifyRole(ROLES.volunteer));
resumeRouter.get("/resume", resumeController);
resumeRouter.post("/resume", createResumeController);
resumeRouter.delete("/resume", deleteResumeController);
resumeRouter.patch("/resume", editResumeController);

export default resumeRouter;
