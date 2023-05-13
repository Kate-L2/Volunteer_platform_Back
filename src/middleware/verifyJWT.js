import jwt from "jsonwebtoken";
<<<<<<< HEAD

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    req.user = decoded.UserInfo.email;
    req.role = decoded.UserInfo.roles;
=======
import * as dotenv from "dotenv";
import User from "../models/User.js";
import parseUser from "../controllers/utils/parseUser.js";

dotenv.config();

const verifyJWT = async (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")?.[0];

  if (!token) {
    req.user = null;
>>>>>>> 6476cea0153302853961c545168f291b6be834bc
    next();
    return;
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decode._id });
    req.user = parseUser(user);
    next();
  } catch (error) {
    req.user = null;
    next();
  }
};

export default verifyJWT;
