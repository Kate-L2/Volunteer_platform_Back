import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import User from "../models/User.js";
import parseUser from "../controllers/utils/parseUser.js";

dotenv.config();

const verifyJWT = async (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")?.[0];

  if (!token) {
    req.user = null;
    next();
    return;
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decode);
    const user = await User.findOne({ _id: decode._id });
    req.user = parseUser(user);
    next();
  } catch (error) {
    req.user = null;
    next();
  }
};

export default verifyJWT;
