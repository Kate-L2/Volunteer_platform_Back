import express from "express";
import cities from "../controllers/citiesController.js";

const citiesRouter = express.Router();

citiesRouter.get("/", cities);

export default citiesRouter;
