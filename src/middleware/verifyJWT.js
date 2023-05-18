import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import User from "../models/User.js";
import parseUser from "../controllers/utils/parseUser.js";

dotenv.config();

const verifyJWT = async (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")?.[0];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Не авторизований користувач",
    });
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
      return res.status(401).json({
        success: false,
        message:
          "Не авторизований користувач. Будь ласка увійдіть для доступу до ресурсів.",
      });
    }

    // get user
    const user = await User.findOne({ _id: decode._id });
    req.user = parseUser(user);
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Не авторизований користувач",
    });
  }
};

export default verifyJWT;
