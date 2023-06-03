import express from "express";
import verifyJWT from "../middleware/verifyJWT.js";
import verifyRole from "../middleware/verifyRole.js";
import { ROLES } from "../constants.js";
import createApplicationController from "../controllers/application/createApplicationController.js";
import applicationByIdController from "../controllers/application/applicationByIdController.js";

const applicationRouter = express.Router();
applicationRouter.get("/:id", applicationByIdController);

applicationRouter.use(verifyJWT);
applicationRouter.use(verifyRole(ROLES.volunteer));
applicationRouter.post("/", createApplicationController);

export default applicationRouter;
