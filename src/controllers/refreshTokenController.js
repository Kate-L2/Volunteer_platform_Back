import User from "../models/User.js";
import jwt from "jsonwebtoken";
import tryCatch from "./utils/tryCatch.js";

const handleRefreshToken = tryCatch(async (req, res) => {
  const cookies = req.cookies;
  
  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;

  User.findOne({ refreshToken: refreshToken }).then((user) => {
    console.log(user);
    if (!user) return res.sendStatus(403);
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || user.firstName !== decoded.firstName)
          return res.sendStatus(403);
        const accessToken = jwt.sign(
          { firstname: decoded.firstName },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30s" }
        );
        res.json({ accessToken });
      }
    );
  });
});

export default handleRefreshToken;
