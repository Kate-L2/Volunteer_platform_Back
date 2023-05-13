import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import tryCatch from "./utils/tryCatch.js";

const maxAge = 1000 * 60 * 60 * 24;

const login = tryCatch(async (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email })
    .then((user) => {
      bcrypt.compare(password, user.password).then((passwordCheck) => {
        if (!passwordCheck) {
          return res.status(400).send({
            message: "Passwords does not match",
          });
        }
        const accessToken = jwt.sign(
          {
            userId: user._id,
            email: user.email,
            role: user.role,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30s" }
        );
        const refreshToken = jwt.sign(
          {
            userId: user._id,
            email: user.email,
            role: user.role,
          },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "1h" }
        );
        user.refreshToken = refreshToken;
        user.save();
        console.log(user);
        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
          maxAge,
        });
        res.status(200).send({
          message: "Login Successful",
          result: { accessToken },
        });
      });
      if (!user.email) {
        res.status(404).send({
          message: "User doesn`t exist",
          e,
        });
      }
    })
    .catch((e) => {
      res.status(400).send({
        message: "You input invalid credentials",
        e,
      });
    });
});

export default login;
