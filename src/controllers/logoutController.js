import User from "../models/User.js";
import tryCatch from "./utils/tryCatch.js";

const maxAge = 1000 * 60 * 60 * 24;

const handleLogout = tryCatch(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const foundUser = User.findOne({ refreshToken: refreshToken });

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, maxAge });
    res.status(204); //No content to send
  }

  await User.updateOne({ refreshToken: refreshToken }, { refreshToken: "" });

  res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "None" });

  res.status(200).send({
    message: "You have logged out of your account",
  });
});

export default handleLogout;
