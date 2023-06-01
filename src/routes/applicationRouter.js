import express from "express";
import verifyJWT from "../middleware/verifyJWT.js";
import verifyRole from "../middleware/verifyRole.js";
import { ROLES } from "../constants.js";
import createApplicationController from "../controllers/createApplicationController.js";

const applicationRouter = express.Router();

applicationRouter.use(verifyJWT);
applicationRouter.use(verifyRole(ROLES.volunteer));
applicationRouter.post("/", createApplicationController);

export default applicationRouter;
