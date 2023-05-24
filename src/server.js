import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import dbConnect from "./config/db.js";
// import cookieParser from "cookie-parser";
import loginRouter from "./routes/loginRouter.js";
import registerRouter from "./routes/registerRouter.js";
import currentUserRouter from "./routes/currentUserRouter.js";
// import verifyJWT from "./middleware/verifyJWT.js";
import { logger } from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import myResumeRouter from "./routes/myResumeRouter.js";
import categoriesRouter from "./routes/categoriesRouter.js";
import citiesRouter from "./routes/citiesRouter.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(logger);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/current-user", currentUserRouter);
app.use("/categories", categoriesRouter);
app.use("/cities", citiesRouter);

app.use("/my-resume", myResumeRouter);

// app.use(verifyJWT);
app.use(errorHandler);

app.listen(8080, () => console.log("Server Started"));

dbConnect();
