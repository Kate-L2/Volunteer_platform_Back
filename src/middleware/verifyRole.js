import * as dotenv from "dotenv";

dotenv.config();

const verifyRole = (role) => async (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({
      success: false,
      message: "Недостатньо прав для ресурсу",
    });
  }
  next();
};

export default verifyRole;
