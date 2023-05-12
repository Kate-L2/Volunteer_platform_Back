import jwt from "jsonwebtoken";
import { DURATION_TOKEN } from "../../constants.js";

export default (user) => {
  const { _id, firstName, email } = user;

  return jwt.sign(
    {
      _id,
      firstName,
      email,
    },
    process.env.JWT_SECRET,
    { expiresIn: DURATION_TOKEN }
  );
};
