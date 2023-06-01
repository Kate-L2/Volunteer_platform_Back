import express from "express";
import verifyJWT from "../middleware/verifyJWT.js";
import verifyRole from "../middleware/verifyRole.js";
import getUserFromToken from "../middleware/getUserFromToken.js";
import { ROLES } from "../constants.js";
import createVacancyController from "../controllers/vacancies/createVacancyController.js";
import deleteVacancyController from "../controllers/vacancies/deleteVacancyController.js";
import editVacancyController from "../controllers/vacancies/editVacancyController.js";
import vacanciesController from "../controllers/vacancies/vacanciesController.js";
import allVacanciesController from "../controllers/vacancies/allVacanciesController.js";
import vacancyByIdController from "../controllers/vacancies/vacancyByIdController.js";

const vacancyRouter = express.Router();

// public
vacancyRouter.use(getUserFromToken);
vacancyRouter.get("/vacancy/:id", vacancyByIdController);
vacancyRouter.get("/all-vacancies", allVacanciesController);

// private
vacancyRouter.use(verifyJWT);
vacancyRouter.use(verifyRole(ROLES.organization));
vacancyRouter.get("/vacancies", vacanciesController);
vacancyRouter.post("/vacancy", createVacancyController);
vacancyRouter.delete("/vacancy", deleteVacancyController);
vacancyRouter.patch("/vacancy", editVacancyController);

export default vacancyRouter;
