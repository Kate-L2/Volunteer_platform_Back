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
import multer from "multer";

const vacancyRouter = express.Router();
const upload = multer();

// public
vacancyRouter.use(getUserFromToken);
vacancyRouter.get("/vacancy/:id", vacancyByIdController);
vacancyRouter.get("/all-vacancies", allVacanciesController);

// private
vacancyRouter.use(verifyJWT);
vacancyRouter.use(verifyRole(ROLES.organization));
vacancyRouter.get("/vacancies", vacanciesController);
vacancyRouter.post("/vacancy", upload.single("img"), createVacancyController);
vacancyRouter.delete("/vacancy", deleteVacancyController);
vacancyRouter.patch("/vacancy", upload.single("img"), editVacancyController);

export default vacancyRouter;
