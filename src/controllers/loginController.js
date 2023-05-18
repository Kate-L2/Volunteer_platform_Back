import User from "../models/User.js";
import bcrypt from "bcrypt";
import tryCatch from "./utils/tryCatch.js";
import generateJwt from "./utils/generateJwt.js";
import parseUser from "./utils/parseUser.js";


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
        const userCopy = parseUser(user);
        const token = generateJwt(userCopy);

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
