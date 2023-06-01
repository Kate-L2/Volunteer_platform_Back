import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import User from "../models/User.js";
import parseUser from "../controllers/utils/parseUser.js";

dotenv.config();

const getUserFromToken = async (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")?.[0];

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    //logic for decode
    let decode;
    try {
      decode = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      decode = null;
    }

    if (!decode) {
      req.user = null;
      return next();
    }

    // get user
    const user = await User.findOne({ _id: decode._id });
    req.user = parseUser(user);
    next();
  } catch (error) {
    req.user = null;
    return next();
  }
};

export default getUserFromToken;
