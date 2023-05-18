import express from "express";
import categories from "../controllers/categoriesController.js";

const categoriesRouter = express.Router();

categoriesRouter.get("/", categories);

export default categoriesRouter;
