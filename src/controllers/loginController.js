import User from "../models/User.js";
import bcrypt from "bcrypt";
import tryCatch from "./utils/tryCatch.js";
import generateJwt from "./utils/generateJwt.js";
import parseUser from "./utils/parseUser.js";

const maxAge = 1000 * 60 * 60 * 24;

const login = tryCatch(async (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email })
    .then((user) => {
      if (!user.email) {
        res.status(404).send({
          message: "User doesn`t exist",
        });
      }

      bcrypt.compare(password, user.password).then((passwordCheck) => {
        if (!passwordCheck) {
          return res.status(400).send({
            message: "Passwords does not match",
          });
        }
<<<<<<< HEAD
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
=======
        const userCopy = parseUser(user);
        const token = generateJwt(userCopy);

>>>>>>> 6476cea0153302853961c545168f291b6be834bc
        res.status(200).send({
          message: "Login Successful",
          result: { ...userCopy, token },
        });
      });
    })
    .catch((e) => {
      res.status(400).send({
        message: "You input invalid credentials",
        e,
      });
    });
});

export default login;
